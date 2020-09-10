import React from 'react';
import { Book } from '../../../../services/book-search/types';
import { renderWithWishList } from '../../../../tests/renderWithWishList';
import { WishListBooks } from './WishListBooks';

test('renders list of wishlisted books', () => {
  const testBook: Book = {
    id: 'test-id',
    kind: 'books#volume',
    etag: 'test-tag',
    selfLink: 'test-link',
    volumeInfo: {
      title: 'Book title',
    },
  };

  const { getByText } = renderWithWishList(
    <WishListBooks opened={true} onClose={jest.fn()} />,
    {
      list: [
        testBook,
        { ...testBook, id: 'test-id-2', volumeInfo: { title: 'Test title' } },
      ],
    }
  );

  expect(getByText(/Your Wishlist/i)).toBeInTheDocument();
  expect(getByText(/Book title/i)).toBeInTheDocument();
  expect(getByText(/Test title/i)).toBeInTheDocument();
});

test('doesn\'t render when closed', () => {
  const testBook: Book = {
    id: 'test-id',
    kind: 'books#volume',
    etag: 'test-tag',
    selfLink: 'test-link',
    volumeInfo: {
      title: 'Book title',
    },
  };

  const { queryByText } = renderWithWishList(
    <WishListBooks opened={false} onClose={jest.fn()} />,
    {
      list: [
        testBook,
        { ...testBook, id: 'test-id-2', volumeInfo: { title: 'Test title' } },
      ],
    }
  );

  expect(queryByText(/Your Wishlist/i)).not.toBeInTheDocument();
  expect(queryByText(/Book title/i)).not.toBeInTheDocument();
  expect(queryByText(/Test title/i)).not.toBeInTheDocument();
});
