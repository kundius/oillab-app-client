import { useCallback, useEffect, useState } from 'react'
import { Button, Checkbox, Intent } from '@blueprintjs/core'
import Cookies from 'universal-cookie'

import getRuntimeConfig from '@app/utils/getRuntimeConfig'
import { Wall } from '@app/components/Wall'
import { showToast } from '@components/AppToaster'
import { MainTemplate } from '@features/app/components/MainTemplate'

const { publicRuntimeConfig } = getRuntimeConfig()

export interface IndexPageProps {}

interface RecoveryItem {
  id: number
  name: string
  path: string
  reason: string
  usage: string
}

interface RecoveryError {
  id: number
  path: string
  message: string
}

interface RecoveryStatus {
  status: 'idle' | 'running' | 'stopping' | 'done' | 'stopped'
  dryRun: boolean
  startedAt: string | null
  finishedAt: string | null
  total: number
  checked: number
  present: number
  missing: number
  restored: number
  unrecoverable: RecoveryItem[]
  errors: RecoveryError[]
}

const statusLabels: Record<RecoveryStatus['status'], string> = {
  idle: 'Не запускалось',
  running: 'Выполняется',
  stopping: 'Остановка',
  done: 'Завершено',
  stopped: 'Остановлено'
}

const request = async (
  path: string,
  method: 'GET' | 'POST' = 'GET'
): Promise<RecoveryStatus> => {
  const cookies = new Cookies(document.cookie)
  const token = cookies.get('token')
  const response = await fetch(`${publicRuntimeConfig.API_URL}/recovery/${path}`, {
    method,
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  })
  const json = await response.json()
  if (!response.ok) {
    throw new Error(json.message || 'Ошибка запроса')
  }
  return json
}

export function IndexPage({}: IndexPageProps) {
  const [data, setData] = useState<RecoveryStatus | null>(null)
  const [dryRun, setDryRun] = useState(true)
  const [pending, setPending] = useState(false)

  const load = useCallback(async () => {
    try {
      setData(await request('status'))
    } catch (error: any) {
      await showToast({ message: error.message, intent: Intent.DANGER })
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const isActive = data?.status === 'running' || data?.status === 'stopping'

  useEffect(() => {
    if (!isActive) return
    const timer = setInterval(load, 2000)
    return () => clearInterval(timer)
  }, [isActive, load])

  const handleStart = async () => {
    setPending(true)
    try {
      setData(await request(`start?dryRun=${dryRun}`, 'POST'))
    } catch (error: any) {
      await showToast({ message: error.message, intent: Intent.DANGER })
    } finally {
      setPending(false)
    }
  }

  const handleStop = async () => {
    setPending(true)
    try {
      setData(await request('stop', 'POST'))
    } catch (error: any) {
      await showToast({ message: error.message, intent: Intent.DANGER })
    } finally {
      setPending(false)
    }
  }

  return (
    <MainTemplate
      title="Восстановление файлов"
      headline={[
        {
          href: '/',
          title: 'Отчеты'
        },
        {
          title: 'Восстановление файлов'
        }
      ]}
      extra={
        <div className="flex items-center gap-4">
          <Checkbox
            checked={dryRun}
            disabled={isActive}
            onChange={(e) => setDryRun(e.currentTarget.checked)}
            className="mb-0"
          >
            Только проверка
          </Checkbox>
          {isActive ? (
            <Button
              intent={Intent.DANGER}
              onClick={handleStop}
              loading={pending}
              disabled={data?.status === 'stopping'}
            >
              Остановить
            </Button>
          ) : (
            <Button
              intent={Intent.PRIMARY}
              onClick={handleStart}
              loading={pending}
            >
              Запустить
            </Button>
          )}
        </div>
      }
    >
      <Wall>
        {data && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              <div>Статус: <b>{statusLabels[data.status]}</b></div>
              <div>Режим: <b>{data.dryRun ? 'проверка' : 'восстановление'}</b></div>
              <div>Всего используемых файлов: <b>{data.total}</b></div>
              <div>Проверено: <b>{data.checked}</b></div>
              <div>В S3 на месте: <b>{data.present}</b></div>
              <div>Отсутствует: <b>{data.missing}</b></div>
              <div>Восстановлено: <b>{data.restored}</b></div>
              <div>Ошибок: <b>{data.errors.length}</b></div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-base font-bold">
                Невосстановимые файлы ({data.unrecoverable.length})
              </div>
              {data.unrecoverable.length === 0 ? (
                <div className="opacity-70">Нет</div>
              ) : (
                <div className="divide-y">
                  {data.unrecoverable.map((item) => (
                    <div className="py-2" key={item.id}>
                      <div>{item.name}</div>
                      <div className="text-sm opacity-70">
                        {item.path} — {item.reason}
                      </div>
                      <div className="text-sm">{item.usage}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {data.errors.length > 0 && (
              <div className="flex flex-col gap-2">
                <div className="text-base font-bold">
                  Ошибки ({data.errors.length})
                </div>
                <div className="divide-y">
                  {data.errors.map((error, i) => (
                    <div className="py-2" key={i}>
                      <div>{error.path || `файл #${error.id}`}</div>
                      <div className="text-sm opacity-70">{error.message}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Wall>
    </MainTemplate>
  )
}
