import React, { useEffect, useState, useCallback } from "react";
import { getBooksByType } from "../../services/book-search/book-search";
import { Books } from "../../services/book-search/types";

const BookSearch = () => {
  const [bookType, updateBookType] = useState("");
  const [bookTypeToSearch, updateBookTypeToSearch] = useState("");
  const [allAvailableBooks, setAllAvailableBooks] = useState(null as Books | null);
    
  const requestBooks = useCallback(async (query: string) => {
    if (query) {
      const allBooks = await getBooksByType(query);
      setAllAvailableBooks(allBooks);
    }
  }, [setAllAvailableBooks])

  useEffect(() => {
    async function getAllBooks() {
      await requestBooks(bookTypeToSearch);
    }
    getAllBooks();
  }, [bookTypeToSearch, requestBooks]);
    
  return (
    <>
      <div className="book--container">
        <div className="search-params">
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateBookTypeToSearch(bookType)
              }}
            >
              <input
                className="full-width"
                autoFocus
                name="gsearch"
                type="search"
                value={bookType}
                placeholder="Search for books to add to your reading list and press Enter"
                onChange={e => updateBookType(e.target.value)}
              />
            </form>
            {!bookType && (
              <div className="empty">
                <p>
                  Try searching for a topic, for example
                  <span onClick={() => {
                    updateBookType("Javascript");
                  }}>
                    {" "}
                    "Javascript"
                  </span>
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
      {<pre>{JSON.stringify(allAvailableBooks, null, 4)}</pre>}
    </>
  );
};

export default BookSearch;
