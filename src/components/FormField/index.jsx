import React from 'react'

export const FormField = ({ label, children }) => (
  <div className="flex gap-8 items-center">
    <div className="w-1/4 flex justify-end leading-none text-right">{label}</div>
    <div className="w-2/4 flex justify-start">{children}</div>
  </div>
)
