import React, { useState, useEffect, useMemo } from 'react'
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Intent,
  FormGroup,
  InputGroup,
  RadioGroup,
  Radio
} from '@blueprintjs/core'
import { showToast } from '@components/AppToaster'
import { LinkedReportCard } from './LinkedReportCard'
import {
  ReportListPageItemFragment,
  useReportListPageReportConsolidateMutation,
  useConsolidateModalResultsByFormNumberQuery,
  useConsolidateModalResultsByFormNumberLazyQuery,
  ConsolidateModalResultItemFragment,
  useReportListPageReportsByFormNumberLazyQuery,
  useReportListPageReportsByStateNumberLazyQuery
} from './schema.generated'

interface ConsolidateModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  report: ReportListPageItemFragment
}

interface ReportItem {
  id: string
  type: 'stateNumber' | 'formNumber'
  value: string
  reportId: number
  results: ConsolidateModalResultItemFragment[]
  selectedResultId: number
}

export const ConsolidateModal: React.FC<ConsolidateModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  report
}) => {
  const [selectedMainResult, setSelectedMainResult] =
    useState<ConsolidateModalResultItemFragment | null>(null)
  const [relatedReports, setRelatedReports] = useState<ReportItem[]>([])
  const [newReportValue, setNewReportValue] = useState('')
  const [newReportType, setNewReportType] = useState<
    'stateNumber' | 'formNumber'
  >('stateNumber')
  const [error, setError] = useState<string>('')

  const [consolidateReport, { loading }] =
    useReportListPageReportConsolidateMutation()

  const { data: resultsData } = useConsolidateModalResultsByFormNumberQuery({
    variables: { formNumber: report.formNumber! },
    skip: !isOpen || !report.formNumber
  })

  const [fetchLinkedResults] = useConsolidateModalResultsByFormNumberLazyQuery()
  const [fetchByFormNumber] = useReportListPageReportsByFormNumberLazyQuery()
  const [fetchByStateNumber] = useReportListPageReportsByStateNumberLazyQuery()

  const results = resultsData?.resultsByFormNumber ?? []

  useEffect(() => {
    if (isOpen) {
      setSelectedMainResult(null)
      setRelatedReports([])
      setNewReportValue('')
      setNewReportType('stateNumber')
      setError('')
    }
  }, [isOpen])

  // Автовыбор первого результата при загрузке
  useEffect(() => {
    if (results.length > 0 && !selectedMainResult) {
      setSelectedMainResult(results[0])
    }
  }, [results, selectedMainResult])

  const handleAddReport = async () => {
    if (!selectedMainResult) {
      setError('Сначала выберите результат')
      return
    }

    if (!newReportValue.trim()) {
      setError('Введите значение')
      return
    }

    if (relatedReports.length >= 4) {
      setError('Можно добавить не более 4 отчетов')
      return
    }

    if (
      relatedReports.some(
        (r) => r.value.toLowerCase() === newReportValue.trim().toLowerCase()
      )
    ) {
      setError('Этот отчет уже добавлен')
      return
    }

    let reportsData: ReportListPageItemFragment[] = []

    if (newReportType === 'formNumber') {
      const result = await fetchByFormNumber({
        variables: { formNumber: newReportValue.trim() }
      })
      reportsData = result.data?.reportsByFormNumber ?? []
    } else if (newReportType === 'stateNumber') {
      const result = await fetchByStateNumber({
        variables: { stateNumber: newReportValue.trim() }
      })
      reportsData = result.data?.reportsByStateNumber ?? []
    }

    if (reportsData.length === 0) {
      setError(
        `Отчет с ${newReportType === 'formNumber' ? 'номером бланка' : 'государственным номером'} "${newReportValue.trim()}" не найден`
      )
      return
    }

    if (reportsData.length > 1) {
      setError(
        `Найдено несколько отчетов с таким ${newReportType === 'formNumber' ? 'номером бланка' : 'государственным номером'}. Уточните поиск.`
      )
      return
    }

    const reportData = reportsData[0]

    if (reportData.id === report.id) {
      setError('Нельзя добавить основной отчет в список для объединения')
      return
    }

    if (relatedReports.some((r) => r.reportId === reportData.id)) {
      setError('Этот отчет уже добавлен')
      return
    }

    const reportFormNumber = reportData.formNumber
    if (!reportFormNumber) {
      setError('У выбранного отчета нет номера бланка')
      return
    }

    const resultQuery = await fetchLinkedResults({
      variables: { formNumber: reportFormNumber }
    })
    const linkedResults = resultQuery.data?.resultsByFormNumber ?? []
    const matchingResults = linkedResults.filter(
      (r) => r.oilType.standard === selectedMainResult.oilType.standard
    )

    if (matchingResults.length === 0) {
      setError(
        `Отчет "${newReportValue.trim()}" не имеет результата типа "${selectedMainResult.oilType.standard ? 'стандартный' : 'расширенный'}"`
      )
      return
    }

    const newReport: ReportItem = {
      id: Date.now().toString(),
      type: newReportType,
      value: newReportValue.trim(),
      reportId: reportData.id,
      results: matchingResults,
      selectedResultId: matchingResults[0].id
    }

    setRelatedReports([...relatedReports, newReport])
    setNewReportValue('')
    setError('')
  }

  const handleRemoveReport = (id: string) => {
    setRelatedReports(relatedReports.filter((r) => r.id !== id))
  }

  const handleResultChange = (reportId: string, resultId: number) => {
    setRelatedReports(
      relatedReports.map((r) =>
        r.id === reportId ? { ...r, selectedResultId: resultId } : r
      )
    )
  }

  const handleSubmit = async () => {
    if (!selectedMainResult) return

    const items = relatedReports.map((r) => ({
      reportId: r.reportId,
      resultId: r.selectedResultId
    }))

    try {
      const result = await consolidateReport({
        variables: {
          input: {
            mainReportId: report.id,
            mainResultId: selectedMainResult.id,
            items: items.length > 0 ? items : undefined
          }
        }
      })

      if (result.data?.reportConsolidate.success) {
        onClose()
        onSuccess?.()
        showToast({
          message: 'Отчеты успешно объединены',
          intent: Intent.SUCCESS
        })
      } else {
        showToast({
          message:
            result.data?.reportConsolidate.error?.message ||
            'Ошибка при объединении отчетов',
          intent: Intent.DANGER
        })
      }
    } catch {
      showToast({
        message: 'Ошибка при объединении отчетов',
        intent: Intent.DANGER
      })
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddReport()
    }
  }

  const dialogProps = useMemo(() => {
    return {
      isOpen,
      onClose,
      title: `Объединить отчет №${report.id}`,
      canOutsideClickClose: true,
      style: { width: '600px' }
    }
  }, [isOpen, onClose, report])

  if (!report.formNumber) {
    return (
      <Dialog {...dialogProps}>
        <DialogBody>
          <div className="text-base text-center text-gray-400 p-4">
            У отчета не указан номер бланка
          </div>
        </DialogBody>
        <DialogFooter
          actions={[
            <Button key="cancel" onClick={onClose}>
              Закрыть
            </Button>
          ]}
        />
      </Dialog>
    )
  }

  if (results.length === 0) {
    return (
      <Dialog {...dialogProps}>
        <DialogBody>
          <div className="text-base text-center text-gray-400 p-4">
            У основного отчета нет результатов
          </div>
        </DialogBody>
        <DialogFooter
          actions={[
            <Button key="cancel" onClick={onClose}>
              Закрыть
            </Button>
          ]}
        />
      </Dialog>
    )
  }

  const hasLinkedReports = relatedReports.length > 0

  return (
    <Dialog {...dialogProps}>
      <DialogBody>
        <FormGroup
          label="Результат для объединения"
          helperText={
            hasLinkedReports
              ? 'Нельзя изменить после добавления связанных отчетов'
              : 'Выберите результат'
          }
        >
          <RadioGroup
            selectedValue={selectedMainResult?.id?.toString() ?? undefined}
            onChange={(e) => {
              if (hasLinkedReports) return
              const result = results.find(
                (r) => r.id.toString() === e.currentTarget.value
              )
              if (result) setSelectedMainResult(result)
            }}
            inline={true}
            disabled={hasLinkedReports}
          >
            {results.map((r) => (
              <Radio
                key={r.id}
                label={`№${r.formNumber} — ${r.oilType.name}`}
                value={r.id.toString()}
              />
            ))}
          </RadioGroup>
        </FormGroup>

        <FormGroup
          label="Добавить отчет"
          helperText="Выберите тип и введите значение"
        >
          <RadioGroup
            selectedValue={newReportType}
            onChange={(e) =>
              setNewReportType(
                e.currentTarget.value as 'stateNumber' | 'formNumber'
              )
            }
            inline={true}
            disabled={!selectedMainResult || relatedReports.length >= 4}
          >
            <Radio label="Гос. номер" value="stateNumber" />
            <Radio label="Номер бланка" value="formNumber" />
          </RadioGroup>

          <div style={{ display: 'flex' }}>
            <InputGroup
              value={newReportValue}
              onChange={(e) => setNewReportValue(e.target.value)}
              placeholder="Введите значение..."
              onKeyDown={handleKeyPress}
              fill
              disabled={!selectedMainResult || relatedReports.length >= 4}
            />
            <Button
              icon="plus"
              minimal
              onClick={handleAddReport}
              disabled={
                !newReportValue.trim() ||
                relatedReports.length >= 4 ||
                !selectedMainResult
              }
              style={{ marginLeft: '8px' }}
            />
          </div>

          {error && (
            <div style={{ marginTop: '8px', color: '#DB3737' }}>{error}</div>
          )}
        </FormGroup>

        <FormGroup
          label="Отчеты для объединения"
          helperText={`Выбрано: ${relatedReports.length}/4`}
        >
          <div className="flex gap-1.5 flex-col">
            {relatedReports.length > 0 ? (
              relatedReports.map((reportItem) => (
                <LinkedReportCard
                  key={reportItem.id}
                  report={reportItem}
                  onResultChange={handleResultChange}
                  onRemove={handleRemoveReport}
                />
              ))
            ) : (
              <div className="text-base text-center text-gray-400 p-2">
                Список пуст
              </div>
            )}
          </div>
        </FormGroup>
      </DialogBody>
      <DialogFooter
        actions={[
          <Button key="cancel" onClick={onClose} disabled={loading}>
            Отмена
          </Button>,
          <Button
            key="submit"
            intent={Intent.PRIMARY}
            onClick={handleSubmit}
            disabled={relatedReports.length === 0 || loading}
            loading={loading}
          >
            Объединить
          </Button>
        ]}
      />
    </Dialog>
  )
}
