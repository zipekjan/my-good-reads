import React, { createContext, useState, useContext, useMemo } from "react";
import { Book } from "../services/book-search.service";

export type WishListContext = {
	list: Book[],
	hasBook: (book: Book) => void,
	addBook: (book: Book) => void,
	removeBook: (book: Book) => void
}

type Props = {
	children: React.ReactNode
}

export const WishListContext = createContext<WishListContext | null>(null)

export const WishListProvider = ({ children }: Props) => {
  const [list, setList] = useState([] as Book[])

  const context = useMemo(() => ({
    list,
    addBook: (book) => {
      setList([ ...list, book ])
    },
    removeBook: (book) => {
      setList(list.filter(item => item.id !== book.id))
    },
    hasBook: (book) => list.find(item => item.id === book.id) !== undefined,
  } as WishListContext), [list])

  return (
    <WishListContext.Provider value={context}>
      {children}
    </WishListContext.Provider>
  )
}

export const useWishList = () => useContext(WishListContext)!