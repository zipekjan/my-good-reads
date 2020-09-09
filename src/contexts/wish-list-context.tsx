import React, { createContext, useState, useContext, useMemo } from "react";
import { Book } from "../services/book-search/types";

export type WishListContext = {
  /** List wishlisted books */
  list: Book[],
  /** Checks if the book is on wishlist */
  hasBook: (book: Book) => boolean,
  /** Adds a book to the wishlist */
  addBook: (book: Book) => void,
  /** Removes a book from the wishlist */
	removeBook: (book: Book) => void
}

type Props = {
	children: React.ReactNode
}

export const WishListContext = createContext<WishListContext | null>(null)

/**
 * Provides WishList context with all its features
 */
export const WishListProvider = ({ children }: Props) => {
  const [list, setList] = useState([] as Book[])

  const context = useMemo(() => {
    const addBook = (book: Book) => {
      if (!hasBook(book)) {
        setList([ ...list, book ])
      }
    }

    const removeBook = (book: Book) => {
      setList(
        list.filter(item => item.id !== book.id)
      )
    }

    const hasBook = (book: Book) =>
      list.find(item => item.id === book.id) !== undefined


    const ctx: WishListContext = {
      list,
      addBook,
      removeBook,
      hasBook
    }

    return ctx
  }, [list])

  return (
    <WishListContext.Provider value={context}>
      {children}
    </WishListContext.Provider>
  )
}

export const useWishList = () => useContext(WishListContext)!