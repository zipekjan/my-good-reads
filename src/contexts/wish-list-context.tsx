import React, { createContext, useState, useContext, useMemo } from 'react';
import { Book } from '../services/book-search/types';

/**
 * Context for managing user wishlist
 */
export type WishListContextType = {
	/** List wishlisted books */
	list: Book[]
	/** Checks if the book is on wishlist */
	hasBook: (book: Book) => boolean
	/** Adds a book to the wishlist */
	addBook: (book: Book) => void
	/** Removes a book from the wishlist */
	removeBook: (book: Book) => void
}

type Props = {
	children: React.ReactNode
}

// Actual react context
export const WishListContext = createContext<WishListContextType | null>(null);

/**
 * Provides WishList context with all its features
 */
export const WishListProvider = ({ children }: Props) => {
  // List of wishlisted books
  const [list, setList] = useState([] as Book[]);

  // Only rebuild context when needed
  const context = useMemo(() => {
    const addBook = (book: Book) => {
      if (!hasBook(book)) {
        setList([...list, book]);
      }
    };

    const removeBook = (book: Book) => {
      setList(list.filter(item => item.id !== book.id));
    };

    const hasBook = (book: Book) =>
      list.find(item => item.id === book.id) !== undefined;

    const ctx: WishListContextType = {
      list,
      addBook,
      removeBook,
      hasBook
    };

    return ctx;
  }, [list]);

  return (
    <WishListContext.Provider value={context}>
      {children}
    </WishListContext.Provider>
  );
};

/**
 * Provides wishlist context values
 */
export const useWishList = () => useContext(WishListContext)!;
