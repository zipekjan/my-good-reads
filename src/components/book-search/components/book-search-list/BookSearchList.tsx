import React from 'react';
import { Book } from '../../../../services/book-search/types';
import { BookSearchBook } from '../book-search-book/BookSearchBook';
import styles from './BookSearchList.module.scss';

type Props = {
	items: Book[]
}

export const BookSearchList = ({ items }: Props) => (
  <div className={styles.container}>
    {items.map(item => <BookSearchBook key={item.id} item={item} />)}
  </div>
);
