import React from 'react';
import styles from './WishListBook.module.scss';
import { Book } from '../../../../../../services/book-search/types';
import { useWishList } from '../../../../../../contexts/wish-list-context';

type Props = {
  item: Book
}

export const WishListBook = ({ item }: Props) => {
  const { removeBook } = useWishList();

  return <div className={styles.book}>
    <div className={styles.name} title={item.volumeInfo.title}>{item.volumeInfo.title}</div>
    <button className={styles.remove} onClick={() => removeBook(item)}>&times;</button>
  </div>;
};
