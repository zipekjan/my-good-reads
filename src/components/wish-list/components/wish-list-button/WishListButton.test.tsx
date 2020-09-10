import userEvent from '@testing-library/user-event';
import React from 'react';
import { Book } from '../../../../services/book-search/types';
import { renderWithWishList } from '../../../../tests/renderWithWishList';
import { WishListButton } from './WishListButton';

test('renders the button with proper book count', () => {
  const { getByText } = renderWithWishList(
    <WishListButton opened={false} onOpen={jest.fn()} />,
    { list: [{} as Book, {} as Book] }
  );

  // Find the button with proper book count
  expect(getByText('Wishlist (2)')).toBeInTheDocument();
});

test('reacts to user clicks', () => {
  const onOpen = jest.fn();

  const { getByText } = renderWithWishList(
    <WishListButton opened={false} onOpen={onOpen} />
  );

  // Load button and click it
  const input = getByText(/Wishlist/i);
  expect(input).toBeInTheDocument();
  userEvent.click(input);

  // Open event should be called
  expect(onOpen).toBeCalled();
});
