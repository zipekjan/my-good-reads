import React from 'react';
import userEvent from '@testing-library/user-event';
import { Book } from '../../../../../../services/book-search/types';
import { renderWithWishList } from '../../../../../../tests/renderWithWishList';
import { WishListBook } from './WishListBook';

test('renders wishlisted book title and has proper remove button', () => {
  const testBook: Book = {
    id: 'test-id',
    kind: 'books#volume',
    etag: 'test-tag',
    selfLink: 'test-link',
    volumeInfo: {
      title: 'Book title'
    }
  };

  const removeBook = jest.fn();

  const { getByText, getByTitle } = renderWithWishList(
    <WishListBook item={testBook} />,
    {
      removeBook
    }
  );

  expect(getByText(/Book title/i)).toBeInTheDocument();

  const remove = getByTitle('Remove book from Wishlist');
  expect(remove).toBeInTheDocument();

  userEvent.click(remove);

  expect(removeBook).toBeCalledWith(testBook);
});
