import React, { useState, useEffect } from 'react'
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Intent,
  FormGroup,
  InputGroup,
  Card,
  Elevation,
  RadioGroup,
  Radio
} from '@blueprintjs/core'
import { 
  ReportListPageItemFragment, 
  useReportListPageReportByFormNumberQuery, 
  useReportListPageReportByStateNumberQuery 
} from './schema.generated'

interface ConsolidateModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (input: { reportIds?: number[] }) => void
  report: ReportListPageItemFragment
}

interface ReportItem {
  id: string
  type: 'stateNumber' | 'formNumber'
  value: string
  reportId: number // Добавляем ID найденного отчета
}

export const ConsolidateModal: React.FC<ConsolidateModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  report
}) => {
  const [reports, setReports] = useState<ReportItem[]>([])
  const [newReportValue, setNewReportValue] = useState('')
  const [newReportType, setNewReportType] = useState<
    'stateNumber' | 'formNumber'
  >('stateNumber')
  const [error, setError] = useState<string>('')

  // Сбрасываем состояние при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      setReports([])
      setNewReportValue('')
      setNewReportType('stateNumber')
      setError('')
    }
  }, [isOpen])

  // Запрос для проверки существования отчета по номеру бланка
  const {
    data: formData,
    loading: formLoading,
    refetch: refetchForm
  } = useReportListPageReportByFormNumberQuery({
    skip: !newReportValue || newReportType !== 'formNumber'
  })

  // Запрос для проверки существования отчета по государственному номеру
  const {
    data: stateData,
    loading: stateLoading,
    refetch: refetchState
  } = useReportListPageReportByStateNumberQuery({
    skip: !newReportValue || newReportType !== 'stateNumber'
  })

  const handleAddReport = async () => {
    if (!newReportValue.trim()) {
      setError('Введите значение')
      return
    }

    if (reports.length >= 5) {
      setError('Можно добавить не более 5 отчетов')
      return
    }

    // Проверяем, что такого значения еще нет в списке
    if (reports.some((r) => r.value.toLowerCase() === newReportValue.trim().toLowerCase())) {
      setError('Этот отчет уже добавлен')
      return
    }

    // Проверяем существование отчета в базе данных
    let reportData: ReportListPageItemFragment | null = null
    
    if (newReportType === 'formNumber') {
      const result = await refetchForm({ formNumber: newReportValue.trim() })
      reportData = result.data?.reportByFormNumber || null
    } else if (newReportType === 'stateNumber') {
      const result = await refetchState({ stateNumber: newReportValue.trim() })
      reportData = result.data?.reportByStateNumber || null
    }

    if (!reportData) {
      setError(`Отчет с ${newReportType === 'formNumber' ? 'номером бланка' : 'государственным номером'} "${newReportValue.trim()}" не найден`)
      return
    }

    // Проверяем, что это не тот же самый отчет, что и основной
    if (reportData.id === report.id) {
      setError('Нельзя добавить основной отчет в список для объединения')
      return
    }

    const newReport: ReportItem = {
      id: Date.now().toString(), // уникальный ID для элемента
      type: newReportType,
      value: newReportValue.trim(),
      reportId: reportData.id // Сохраняем ID найденного отчета
    }

    setReports([...reports, newReport])
    setNewReportValue('') // очищаем поле ввода
    setError('') // очищаем ошибку
  }

  const handleRemoveReport = (id: string) => {
    setReports(reports.filter((r) => r.id !== id))
  }

  const handleSubmit = () => {
    // Извлекаем ID отчетов для передачи бэкенду
    const reportIds = reports.map((r) => r.reportId)

    onSubmit({
      reportIds: reportIds.length > 0 ? reportIds : undefined
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddReport()
    }
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={`Объединить отчет №${report.formNumber || report.id}`}
      canOutsideClickClose={true}
      style={{ width: '600px' }}
    >
      <DialogBody>
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
            />
            <Button
              icon="plus"
              minimal
              onClick={handleAddReport}
              disabled={!newReportValue.trim() || reports.length >= 5}
              style={{ marginLeft: '8px' }}
            />
          </div>
          
          {error && (
            <div style={{ marginTop: '8px', color: '#DB3737' }}>
              {error}
            </div>
          )}
        </FormGroup>

        <FormGroup
          label="Отчеты для объединения"
          helperText={`Выбрано: ${reports.length}/5`}
        >
          <div className="flex gap-1.5 flex-col">
            {reports.length > 0 ? (
              reports.map((reportItem) => (
                <div
                  key={reportItem.id}
                  className="flex gap-2 justify-between items-center p-2 bg-white border"
                >
                  <span>
                    {reportItem.value}{' '}
                    <em className="text-gray-400">
                      (
                      {reportItem.type === 'stateNumber'
                        ? 'гос. номер'
                        : 'номер бланка'}
                      ) - ID: {reportItem.reportId}
                    </em>
                  </span>
                  <Button
                    icon="cross"
                    minimal
                    small
                    onClick={() => handleRemoveReport(reportItem.id)}
                  />
                </div>
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
          <Button key="cancel" onClick={onClose}>
            Отмена
          </Button>,
          <Button
            key="submit"
            intent={Intent.PRIMARY}
            onClick={handleSubmit}
            disabled={reports.length === 0}
          >
            Объединить
          </Button>
        ]}
      />
    </Dialog>
  )
}