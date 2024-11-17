import { useApolloClient } from '@apollo/client'
import { Wall } from '@app/components/Wall'
import * as types from '@app/types'
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  InputGroup,
  Intent,
  Position,
  Spinner,
  Switch,
  Tooltip
} from '@blueprintjs/core'
import { showToast } from '@components/AppToaster'
import { FormField } from '@components/FormField'
import { MainTemplate } from '@features/app/components/MainTemplate'
import { Controller, useForm } from 'react-hook-form'
import { useCallback, useState } from 'react'
import {
  Select as UserSelect,
  SelectValue as UserSelectValue
} from '@app/features/users/components/Select'
import {
  Select as ReportSelect,
  SelectValue as ReportSelectValue
} from '@app/features/report/components/Select'
import * as schema from './schema.generated'

export interface IndexPageProps {}

interface Recipient {
  email: string
  name?: string
  id?: number
}

interface Report {
  formNumber: string
  id?: number
  extended: boolean
  available: ('standard' | 'extended')[]
}

export function IndexPage({}: IndexPageProps) {
  const [loadReportByFormNumber] =
    schema.useMailingIndexPageReportByFormNumberQueryLazyQuery()

  const [loadReportById] = schema.useMailingIndexPageReportQueryLazyQuery()
  const [loadUserById] = schema.useMailingIndexPageUserQueryLazyQuery()

  const [reports, setReports] = useState<Report[]>([])
  const [addFormNumberDialog, setAddFormNumberDialog] = useState(false)
  const [addFormNumberInput, setAddFormNumberInput] = useState('')
  const handleAddFormNumberOpen = useCallback(
    () => setAddFormNumberDialog(true),
    []
  )
  const handleAddFormNumberClose = useCallback(
    () => setAddFormNumberDialog(false),
    []
  )
  const handleAddFormNumberCreate = async () => {
    const query = await loadReportByFormNumber({
      variables: {
        formNumber: addFormNumberInput
      }
    })
    const reportByFormNumber = query.data?.reportByFormNumber
    const formNumber = reportByFormNumber?.formNumber
    if (!reportByFormNumber || !formNumber) {
      await showToast({
        message: `Отчет с номером ${addFormNumberInput} не найден`,
        intent: Intent.DANGER
      })
      setAddFormNumberInput('')
      handleAddFormNumberClose()
      return
    }
    const available: Report['available'] = []
    if (reportByFormNumber?.expressLaboratoryResult) {
      available.push('standard')
    }
    if (reportByFormNumber?.laboratoryResult) {
      available.push('extended')
    }
    if (available.length === 0) {
      await showToast({
        message: `Отчет с номером ${addFormNumberInput} не содержит результатов`,
        intent: Intent.DANGER
      })
      setAddFormNumberInput('')
      handleAddFormNumberClose()
      return
    }
    setReports((prev) => [
      ...prev,
      {
        formNumber,
        extended: available[0] === 'extended',
        available
      }
    ])
    setAddFormNumberInput('')
    handleAddFormNumberClose()
  }
  const handleAddReportCreate = async ({ value }: ReportSelectValue) => {
    const query = await loadReportById({
      variables: {
        id: value
      }
    })
    const reportById = query.data?.report
    const formNumber = reportById?.formNumber
    if (!reportById || !formNumber) {
      await showToast({
        message: 'Отчет с таким номером не найден',
        intent: Intent.DANGER
      })
      return
    }
    const available: Report['available'] = []
    if (reportById?.expressLaboratoryResult) {
      available.push('standard')
    }
    if (reportById?.laboratoryResult) {
      available.push('extended')
    }
    if (available.length === 0) {
      await showToast({
        message: 'Отчет с таким номером не содержит результатов',
        intent: Intent.DANGER
      })
      return
    }
    setReports((prev) => [
      ...prev,
      {
        formNumber,
        id: value,
        extended: available[0] === 'extended',
        available
      }
    ])
  }
  const handleChangeExtendedReport = (extended: boolean, i: number) => {
    setReports((prev) =>
      prev.map((report, k) => (k === i ? { ...report, extended } : report))
    )
  }
  const handleRemoveReport = (i: number) => {
    setReports((prev) => prev.filter((_, k) => k !== i))
  }

  const [recipients, setRecipients] = useState<Recipient[]>([])
  const [addEmailDialog, setAddEmailDialog] = useState(false)
  const [addEmailInput, setAddEmailInput] = useState('')
  const handleAddEmailOpen = useCallback(() => setAddEmailDialog(true), [])
  const handleAddEmailClose = useCallback(() => setAddEmailDialog(false), [])
  const handleAddEmailCreate = () => {
    setRecipients((prev) => [...prev, { email: addEmailInput }])
    setAddEmailInput('')
    handleAddEmailClose()
  }
  const handleAddUserCreate = async ({ value }: UserSelectValue) => {
    const query = await loadUserById({
      variables: {
        id: value
      }
    })
    const user = query.data?.user
    if (!user) {
      await showToast({
        message: 'Пользователь не найден',
        intent: Intent.DANGER
      })
      return
    }
    setRecipients((prev) => [
      ...prev,
      { id: value, email: user.email, name: user.name }
    ])
  }
  const handleRemoveRecipient = (i: number) => {
    setRecipients((prev) => prev.filter((_, k) => k !== i))
  }

  const [reportSend, reportSendState] =
    schema.useMailingIndexPageReportSendMutation()

  const onSubmit = async () => {
    if (recipients.length === 0) {
      await showToast({
        message: 'Укажите хотя бы одного получателя',
        intent: Intent.DANGER
      })
      return
    }

    if (reports.length === 0) {
      await showToast({
        message: 'Укажите хотя бы один отчет',
        intent: Intent.DANGER
      })
      return
    }

    const response = await reportSend({
      variables: {
        input: {
          recipients: recipients.map(({ name, ...recipient }) => recipient),
          reports: reports.map(({ available, ...report }) => report)
        }
      }
    })

    if (response.data?.reportSend.success) {
      await showToast({
        message: 'Отчеты отправлены',
        intent: Intent.SUCCESS
      })
      setRecipients([])
      setReports([])
    }

    if (response.data?.reportSend.error) {
      await showToast({
        message: response.data.reportSend.error.message,
        intent: Intent.DANGER
      })
    }
  }

  return (
    <MainTemplate
      title={`Отправка писем`}
      headline={[
        {
          href: '/',
          title: 'Отчеты'
        },
        {
          title: 'Отправка писем'
        }
      ]}
      extra={
        <Button
          intent={Intent.PRIMARY}
          type="button"
          onClick={onSubmit}
          loading={reportSendState.loading}
        >
          Отправить
        </Button>
      }
    >
      <Wall>
        <div className="flex justify-between gap-12">
          <div className="flex flex-col gap-4 w-5/12">
            <div className="text-base font-bold">Получатели</div>
            {recipients.length > 0 && (
              <div className="divide-y">
                {recipients.map((recipient, i) => (
                  <div className="flex gap-2 py-2 items-center" key={i}>
                    <div className="grow">
                      {recipient.email}
                      {recipient.name && (
                        <i className="ml-2">({recipient.name})</i>
                      )}
                    </div>
                    <Button
                      onClick={() => handleRemoveRecipient(i)}
                      icon="cross"
                      minimal
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-4">
              <Dialog
                isOpen={addEmailDialog}
                onClose={handleAddEmailClose}
                title="Добавить e-mail"
                icon="envelope"
              >
                <DialogBody useOverflowScrollContainer={false}>
                  <InputGroup
                    onChange={(e) => setAddEmailInput(e.target.value)}
                    value={addEmailInput}
                    placeholder="Введите e-mail"
                  />
                </DialogBody>
                <DialogFooter
                  minimal={true}
                  actions={[
                    <Button onClick={handleAddEmailClose} key="cancel">
                      Отмена
                    </Button>,
                    <Button
                      intent="primary"
                      onClick={handleAddEmailCreate}
                      key="submit"
                    >
                      Добавить
                    </Button>
                  ]}
                  className="mt-0"
                />
              </Dialog>
              <Button onClick={handleAddEmailOpen} icon="envelope">
                Добавить e-mail
              </Button>
              <UserSelect
                onChange={handleAddUserCreate}
                title="Добавить пользователя"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-5/12">
            <div className="text-base font-bold">Отчеты</div>
            {reports.length > 0 && (
              <div className="divide-y">
                {reports.map((report, i) => (
                  <div className="flex gap-4 items-center py-2" key={i}>
                    <div className="grow">{report.formNumber}</div>
                    <Switch
                      checked={report.extended}
                      onChange={(e) =>
                        handleChangeExtendedReport(e.target.checked, i)
                      }
                      disabled={report.available.length === 1}
                      innerLabel="Стандартный"
                      innerLabelChecked="Расширенный"
                      alignIndicator="right"
                      className="mb-0 ml-0"
                    />
                    <Button
                      onClick={() => handleRemoveReport(i)}
                      icon="cross"
                      minimal
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-4">
              <Dialog
                isOpen={addFormNumberDialog}
                onClose={handleAddFormNumberClose}
                title="Добавить номер бланка"
                icon="array-numeric"
              >
                <DialogBody useOverflowScrollContainer={false}>
                  <InputGroup
                    onChange={(e) => setAddFormNumberInput(e.target.value)}
                    value={addFormNumberInput}
                    placeholder="Добавить номер бланка"
                  />
                </DialogBody>
                <DialogFooter
                  minimal={true}
                  actions={[
                    <Button onClick={handleAddFormNumberClose} key="cancel">
                      Отмена
                    </Button>,
                    <Button
                      intent="primary"
                      onClick={handleAddFormNumberCreate}
                      key="submit"
                    >
                      Добавить
                    </Button>
                  ]}
                  className="mt-0"
                />
              </Dialog>
              <Button onClick={handleAddFormNumberOpen} icon="array-numeric">
                Добавить номер бланка
              </Button>
              <ReportSelect
                onChange={handleAddReportCreate}
                title="Добавить отчет"
              />
            </div>
          </div>
        </div>
      </Wall>
    </MainTemplate>
  )
}
