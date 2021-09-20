import React from 'react'

import { MainTemplate } from '@features/app/components/MainTemplate'

export function Page () {
  return (
    <MainTemplate
      title="Главная"
      headline={[{
        title: 'Главная'
      }]}
    >
      Привет!
    </MainTemplate>
  )
}
