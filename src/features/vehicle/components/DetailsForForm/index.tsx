import React from 'react'

import * as schema from './schema.generated'

export interface DetailsForFormProps {
  id: string
}

export function DetailsForForm({ id }: DetailsForFormProps) {
  const query = schema.useVehicleDetailsForFormQuery({
    variables: {
      id
    }
  })

  if (query.loading) return null

  if (!query.data?.vehicle) return null

  return (
    <>
      <div className="flex gap-8 items-center">
        <div className="w-1/4 flex justify-end leading-none text-right">
          Гос. номер:
        </div>
        <div className="w-2/4">
          {query.data.vehicle.stateNumber}
        </div>
        <div className="w-1/4" />
      </div>
      <div className="flex gap-8 items-center">
        <div className="w-1/4 flex justify-end leading-none text-right">
          Модель:
        </div>
        <div className="w-2/4">
          {query.data.vehicle.model}
        </div>
        <div className="w-1/4" />
      </div>
      <div className="flex gap-8 items-center">
        <div className="w-1/4 flex justify-end leading-none text-right">
          Год выпуска:
        </div>
        <div className="w-2/4">
          {query.data.vehicle.releaseYear}
        </div>
        <div className="w-1/4" />
      </div>
      <div className="flex gap-8 items-center">
        <div className="w-1/4 flex justify-end leading-none text-right">
          Модель двигателя:
        </div>
        <div className="w-2/4">
          {query.data.vehicle.engineModel}
        </div>
        <div className="w-1/4" />
      </div>
    </>
  )
}
