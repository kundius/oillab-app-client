import React from 'react'

export const FormFieldSet = ({ title, children }) => (
  <div>
    <div className="font-bold text-lg mb-4">{title}</div>
    <div className="space-y-4">{children}</div>
  </div>
)
