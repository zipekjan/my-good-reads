import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { WishListButton } from './WishListButton';
import { WishListContextType, WishListContext } from '../../../../contexts/wish-list-context';
import { Book } from '../../../../services/book-search/types';


const renderWithContext = (component: React.ReactNode, ctx: Partial<WishListContextType> = {}) => {
  const context = {
    list: [],
    addBook: () => null,
    hasBook: () => false,
    removeBook: () => null,    
    ...ctx,
  };

  return render(
    <WishListContext.Provider value={context}>{component}</WishListContext.Provider>
  );
};

test('renders the button with proper book count', () => {
  const { getByText } = renderWithContext(
    <WishListButton opened={false} onOpen={jest.fn()} />,
    { list: [{} as Book, {} as Book] }
  );

  // Find the button with proper book count
  expect(getByText('Wishlist (2)')).toBeInTheDocument();
});

test('reacts to user clicks', () => {
  const onOpen = jest.fn();

  const { getByText } = renderWithContext(
    <WishListButton opened={false} onOpen={onOpen} />
  );

  // Load button and click it
  const input = getByText(/Wishlist/i);
  expect(input).toBeInTheDocument();
  userEvent.click(input);

  // Open event should be called
  expect(onOpen).toBeCalled();
});
