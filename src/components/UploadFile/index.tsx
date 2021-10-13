import React, { useState } from 'react'
import { Button, ButtonGroup, FileInput, Intent } from '@blueprintjs/core'

import { uploadFile } from '@app/utils/uploadFile'
import { AppToaster } from '@components/AppToaster'

export interface UploadFileValue {
  id: number
  name: string
  url: string
}

export interface UploadFileProps {
  disabled?: boolean
  value?: UploadFileValue | null
  onChange?: (value: UploadFileValue | null) => void
}

export const UploadFile = ({
  disabled = false,
  value,
  onChange
}: UploadFileProps) => {
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return

    setLoading(true)

    const uploadResponse = await uploadFile(e.target.files[0])

    setLoading(false)

    if (uploadResponse.success) {
      onChange?.(uploadResponse.file)
    } else {
      AppToaster.show({
        message: 'Не удалось загрузить файл',
        intent: Intent.DANGER
      })
    }
  }

  const handleRemove = () => {
    onChange?.(null)
  }

  return (
    <ButtonGroup>
      {value ? (
        <div className="flex gap-4 items-center">
          <a href={value.url} target="_blank">
            {value.name}
          </a>
          <Button icon="cross" onClick={handleRemove} />
        </div>
      ) : (
        <FileInput
          disabled={disabled || loading}
          text="Выбрать файл"
          buttonText="Обзор"
          onInputChange={handleChange}
        />
      )}
    </ButtonGroup>
  )
}
