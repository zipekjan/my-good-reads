import userEvent from '@testing-library/user-event';
import React from 'react';
import { Book } from '../../../../services/book-search/types';
import { renderWithWishList } from '../../../../tests/renderWithWishList';
import { BookSearchBook } from './BookSearchBook';

test('renders all info when present', () => {
  const testBook: Book = {
    id: 'test-id',
    kind: 'books#volume',
    etag: 'test-tag',
    selfLink: 'test-link',
    volumeInfo: {
      title: 'Book title',
      description: 'Book description',
      publisher: 'Test publisher',
      publishedDate: '2020-10-10',
      authors: ['Author 1', 'Author 2'],
      imageLinks: {
        smallThumbnail: 'small-thumb',
        thumbnail: 'big-thumb'
      }
    }
  };

  const { getByText } = renderWithWishList(<BookSearchBook item={testBook} maxDescriptionLength={1000} />);
  
  expect(getByText(/Book title/i)).toBeInTheDocument();
  expect(getByText(/Book description/i)).toBeInTheDocument();
  expect(getByText(/Test publisher/i)).toBeInTheDocument();
  expect(getByText(/Author 1/i)).toBeInTheDocument();
  expect(getByText(/Author 2/i)).toBeInTheDocument();
  expect(getByText(/Add to my Wishlist/i)).toBeInTheDocument();
  expect(getByText(/Add to my Wishlist/i)).toBeInTheDocument();
});

test('renders partial info', () => {
  const testBook: Book = {
    id: 'test-id',
    kind: 'books#volume',
    etag: 'test-tag',
    selfLink: 'test-link',
    volumeInfo: {
      title: 'Book title'
    }
  };

  const { getByText } = renderWithWishList(<BookSearchBook item={testBook} maxDescriptionLength={1000} />);
  
  expect(getByText(/Book title/i)).toBeInTheDocument();
  expect(getByText(/Add to my Wishlist/i)).toBeInTheDocument();
});

test('disables button when already on wishlist', () => {
  const testBook: Book = {
    id: 'test-id',
    kind: 'books#volume',
    etag: 'test-tag',
    selfLink: 'test-link',
    volumeInfo: {
      title: 'Book title'
    }
  };

  const { getByText, queryByText } = renderWithWishList(
    <BookSearchBook item={testBook} maxDescriptionLength={1000} />,
    {
      hasBook: (book) => book.id === testBook.id
    }
  );

  expect(queryByText(/Add to my Wishlist/i)).not.toBeInTheDocument();
  expect(getByText(/In your Wishlist/i)).toBeInTheDocument();
});


test('adds book to wishlist when clicked', () => {
  const testBook: Book = {
    id: 'test-id',
    kind: 'books#volume',
    etag: 'test-tag',
    selfLink: 'test-link',
    volumeInfo: {
      title: 'Book title'
    }
  };

  const addBook = jest.fn();

  const { getByText } = renderWithWishList(
    <BookSearchBook item={testBook} maxDescriptionLength={1000} />,
    { addBook }
  );
  
  const button = getByText(/Add to my Wishlist/i);
  expect(button).toBeInTheDocument();

  userEvent.click(button);

  expect(addBook).toBeCalledTimes(1);
  expect(addBook).toBeCalledWith(testBook);
});
