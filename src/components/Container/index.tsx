import React from 'react'

import styles from './styles.module.css'

export const Container = ({ className, ...props }: React.HTMLProps<HTMLDivElement>) =>
	<div className={`${className} ${styles.container}`} {...props} />
