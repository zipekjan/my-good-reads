import React, { useMemo } from 'react'
import { Book } from '../../../../services/book-search/types'
import styles from './BookSearchBook.module.scss'
import { useWishList } from '../../../../contexts/wish-list-context'

type Props = {
  item: Book
  maxDescriptionLength?: number
}

export const BookSearchBook = ({ item, maxDescriptionLength = 400 }: Props) => {
  const { addBook, hasBook } = useWishList()

  const { volumeInfo: info } = item

  const hasAuthors = info.authors && info.authors.length > 0

  const desc = useMemo(() => {
    const desc = info.description
    if (desc.length > maxDescriptionLength) {
      return desc.substr(0, maxDescriptionLength - 3) + '...'
    }
    return desc
  }, [info.description, maxDescriptionLength])

  const handleWishlist = () => {
    addBook(item)
  }

  return <div className={styles.container}>
    <div className={styles.cover}>
      <img src={info.imageLinks.thumbnail} alt="Book cover" />
    </div>
    <div className={styles.info}>
      <div className={styles.title}>
        {info.title}
      </div>
      <div className={styles.details}>
        {hasAuthors && <div className={styles.authors}>{"Written by "}{info.authors.join(', ')}</div>}
        {info.publisher && <div className={styles.publisher}>{hasAuthors ? "and published by " : "Published by "}{info.publisher}{" at "}{info.publishedDate}</div>}
      </div>
      <div className={styles.description}>
        {desc}
      </div>
      <div className={styles.wishlist}>
        <button disabled={hasBook(item)} type="button" onClick={handleWishlist}>Add to wishlist</button>
      </div>
    </div>
  </div>
}
