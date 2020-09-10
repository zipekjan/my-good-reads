import React from 'react';
import { render } from '@testing-library/react';
import { BookSearchBook } from './BookSearchBook';
import { Book } from '../../../../services/book-search/types';
import { WishListProvider } from '../../../../contexts/wish-list-context';

const renderWithContext = (component: React.ReactNode) =>
  render(
    <WishListProvider>{component}</WishListProvider>
  );

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

  const { getByText } = renderWithContext(<BookSearchBook item={testBook} maxDescriptionLength={1000} />);
  
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

  const { getByText } = renderWithContext(<BookSearchBook item={testBook} maxDescriptionLength={1000} />);
  
  expect(getByText(/Book title/i)).toBeInTheDocument();
  expect(getByText(/Add to my Wishlist/i)).toBeInTheDocument();
});
