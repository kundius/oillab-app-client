import getRuntimeConfig from '@app/utils/getRuntimeConfig'
import Cookies from 'universal-cookie'

const { publicRuntimeConfig } = getRuntimeConfig()

export type UploadedFileResponse = {
  success: true,
  file: {
    id: number
    url: string
    name: string
  }
} | {
  success: false
}

export const uploadFile = async (file: File) => {
  const cookies = new Cookies(document.cookie)
  const token = cookies.get('token')
  const fd = new FormData()
  fd.append('file', file)
  const uploadResponse = await fetch(`${publicRuntimeConfig.API_URL}/file/uploadFile`, {
    method: 'POST',
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    },
    body: fd
  })
  const uploadJson: UploadedFileResponse = await uploadResponse.json()
  return uploadJson
}
