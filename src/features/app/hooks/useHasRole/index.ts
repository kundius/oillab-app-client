import * as schema from './schema.generated'
import * as types from '@app/types'

export const useHasRole = (role: types.UserRole): boolean => {
  const query = schema.useAppUseCurrentRoleQuery()
  return query.data?.currentUser?.role === role
}
