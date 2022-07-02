import React from 'react'

import * as schema from './schema.generated'

export interface DetailsProps {
  id: number
  render: (data: schema.LubricantDetailsFragment) => React.ReactElement
}

export function Details({ id, render }: DetailsProps) {
  const query = schema.useLubricantDetailsQuery({
    variables: {
      id
    }
  })

  if (query.loading) return null

  if (!query.data?.lubricant) return null

  return render(query.data.lubricant)
}
