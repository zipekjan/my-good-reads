import { render } from '@testing-library/react';
import React from 'react';
import { BookSearchInput } from './BookSearchInput';

test('renders search input with proper placeholder', () => {
  const { getByPlaceholderText } = render(
    <BookSearchInput value="" onChange={() => null} />
  );
  expect(
    getByPlaceholderText(
      /Search for books to add to your reading list and press Enter/i
    )
  ).toBeInTheDocument();
});

test('renders search input with proper value', () => {
  const { getByDisplayValue } = render(
    <BookSearchInput value="Test search" onChange={() => null} />
  );
  expect(getByDisplayValue(/Test search/i)).toBeInTheDocument();
});
