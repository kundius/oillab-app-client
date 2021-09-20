import React from 'react'

import styles from './styles.module.css'

export const Wall = ({
  className,
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return <div className={`${className} ${styles.wall}`} {...props} />
}
