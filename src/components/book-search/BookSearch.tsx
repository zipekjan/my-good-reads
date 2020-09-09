import React, { useEffect, useState, useCallback } from "react";
import { getBooksByType } from "../../services/book-search/book-search";
import { Books } from "../../services/book-search/types";
import { useDebounce } from "../../utils/hooks";
import { BookSearchInput } from "./components/book-search-input/BookSearchInput";
import { BookSearchList } from "./components/book-search-list/BookSearchList";
import styles from './BookSearch.module.scss'

const BookSearch = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [allAvailableBooks, setAllAvailableBooks] = useState(null as Books | null);

  const debouncedSearchQuery = useDebounce(searchQuery, 500)
    
  const requestBooks = useCallback(async (query: string) => {
    if (query) {
      const allBooks = await getBooksByType(query);
      setAllAvailableBooks(allBooks);
    }
  }, [setAllAvailableBooks])

  useEffect(() => {
    async function getAllBooks() {
      await requestBooks(debouncedSearchQuery);
    }
    getAllBooks();
  }, [debouncedSearchQuery, requestBooks]);
    
  return (
    <>
      <div className={styles.container}>
        <BookSearchInput value={searchQuery} onChange={setSearchQuery} />

        {allAvailableBooks !== null && <BookSearchList items={allAvailableBooks.items} />}

        {allAvailableBooks === null && (
          <div className="empty">
            <p>
              Try searching for a topic, for example
              {" "}
              <span onClick={() => setSearchQuery("Javascript")}>
                "Javascript"
              </span>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default BookSearch;
