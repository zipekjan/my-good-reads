import React from 'react';
import BookSearch from '../book-search/BookSearch';
import WishList from '../wish-list/WishList';
import { WishListProvider } from '../../contexts/wish-list-context'
import styles from './App.module.scss'

function App() {
  return (
    <WishListProvider>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.content}>
            <h1>My Good Reads</h1>
            <WishList />
          </div>
        </header>
        <main className={styles.main}>
          <div className={styles.content}>
            <BookSearch />
          </div>
        </main>
      </div>
    </WishListProvider>
  );
}

export default App;
