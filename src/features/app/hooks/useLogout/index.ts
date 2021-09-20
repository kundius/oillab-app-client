import { useApolloClient } from '@apollo/client'
import { useState } from 'react'
import Cookies from 'universal-cookie'

type UseLogoutReturn = [Function, {
  loading: boolean
}]

export const useLogout = (): UseLogoutReturn => {
  const client = useApolloClient()
  const [loading, setLoading] = useState(false)

  const handler = async () => {
    setLoading(true)
    const cookies = new Cookies(document.cookie)
    cookies.set('token', '', { path: '/' })
    await client.cache.reset()
    // await client.resetStore()
    setLoading(false)
  }

  return [handler, { loading }]
}
