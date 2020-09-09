import React from 'react';
import '../../styles/App.scss';
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
          </div>
        </header>
        <main className={styles.main}>
          <BookSearch />
          <WishList />
        </main>
      </div>
    </WishListProvider>
  );
}

export default App;
