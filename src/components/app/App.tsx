import React from 'react';
import '../../styles/App.scss';
import BookSearch from '../book-search/BookSearch';
import WishList from '../wish-list/WishList';
import { WishListProvider } from '../../contexts/wish-list-context'

function App() {
  return (
    <WishListProvider>
      <div>
        <header className="header">
          <div className="header--content">
            <h1>My Good Reads</h1>
          </div>
        </header>
        <main>
          <BookSearch />
          <WishList />
        </main>
      </div>
    </WishListProvider>
  );
}

export default App;
