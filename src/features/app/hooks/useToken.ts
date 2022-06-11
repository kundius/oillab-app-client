import Cookies from 'universal-cookie'

export const useToken = (): string => {
  const cookies = new Cookies(typeof document !== 'undefined' ? document.cookie : '')
  const token = cookies.get('token') || ''
  return token
}
