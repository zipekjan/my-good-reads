import React from 'react'
import styles from './Loader.module.scss'

type Props = {
  active: boolean
}

export const Loader = ({ active }: Props) => {
  return active ? (
    <div className={styles.container}>
      <div className={styles.loader}>
        <span role="img" aria-label="Loading">📘</span>
      </div>
    </div>
  ) : <></>;
}
