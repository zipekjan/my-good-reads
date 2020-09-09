import React from 'react'
import styles from './BookSearchInput.module.scss'

type Props = {
	value: string
	onChange: (value: string) => void
}

export const BookSearchInput = ({ value, onChange }: Props) => (
  <div className={styles.container}>
    <input
      className={styles.input}
      autoFocus
      name="gsearch"
      type="search"
      value={value}
      placeholder="Search for books to add to your reading list and press Enter"
      onChange={e => onChange(e.target.value)}
    /></div>
)
