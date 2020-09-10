import React, { useEffect, useState, useCallback, useRef } from "react";
import { getBooksByType } from "../../services/book-search/book-search";
import { Books } from "../../services/book-search/types";
import { useDebounce } from "../../utils/hooks";
import { BookSearchInput } from "./components/book-search-input/BookSearchInput";
import { BookSearchList } from "./components/book-search-list/BookSearchList";
import styles from './BookSearch.module.scss'
import { Loader } from "../loader/Loader";

const BookSearch = () => {
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [foundBooks, setFoundBooks] = useState(null as Books | null);
  
  // Keep track of last request id to prevent multiple requests overlapping
  const lastRequest = useRef<number>(0)

  // Only updates the value after 500ms of inactivity
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const requestBooks = useCallback(async (query: string) => {
    if (query) {
      // Save current request ID
      const request = ++lastRequest.current
      const allBooks = await getBooksByType(query);
      
      // Only save results if we're the most recent request
      if (request === lastRequest.current) {
        setFoundBooks(allBooks);
        setLoading(false);
      }
    }
  }, [setFoundBooks])

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
    }
  }, [searchQuery])

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

        <div className={styles.list}>
          <Loader active={loading} />

          {foundBooks !== null && <BookSearchList items={foundBooks.items} />}

          {foundBooks === null && (
            <div className={styles.empty}>
              <p>
                Try searching for a topic, for example
                {" "}
                <button className="link-button" onClick={() => setSearchQuery("Javascript")}>
                  "Javascript"
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookSearch;
