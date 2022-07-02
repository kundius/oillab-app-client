import React from 'react'

import * as schema from './schema.generated'

export interface DetailsProps {
  id: number
  render: (data: schema.UsersDetailsFragment) => React.ReactElement
}

export function Details({ id, render }: DetailsProps) {
  const query = schema.useUsersDetailsQuery({
    variables: {
      id
    }
  })

  if (query.loading) return null

  if (!query.data?.user) return null

  return render(query.data.user)
}
