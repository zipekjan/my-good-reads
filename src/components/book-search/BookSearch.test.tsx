import React from 'react';
import { render } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import BookSearch from './BookSearch';
import { WishListProvider } from '../../contexts/wish-list-context';
import { Books } from '../../services/book-search/types';

const renderWithContext = (component: React.ReactNode) =>
  render(
    <WishListProvider>{component}</WishListProvider>
  );

test('properly renders with empty element', () => {
  const { getByText } = renderWithContext(<BookSearch />);

  expect(getByText(/Try searching for a topic, for example/i)).toBeInTheDocument();
});

test('properly reacts to user input', async () => {
  const res: Books = {
    kind: 'books#volumes',
    totalItems: 1,
    items: [
      {
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
      }
    ]
  };

  const mockFetch = jest.fn(() => Promise.resolve({
    ok: true,
    json: () => res,
  }));

  // Inject mock fetch into global
  global.fetch = mockFetch;
  
  const { getByPlaceholderText, getByText } = renderWithContext(<BookSearch />);

  // Find input
  const input = getByPlaceholderText(/Search for books to add to your reading list and press Enter/i);
  expect(input).toBeInTheDocument();

  // Type in something
  userEvent.type(input, 'JavaScript');

  // Wait until component performs the search
  await waitFor(() => expect(mockFetch).toBeCalledTimes(1));
  expect(mockFetch)
    .toBeCalledWith(
      'https://www.googleapis.com/books/v1/volumes?q=JavaScript',
      {'headers': {'content-type': 'application/json'}, 'method': 'GET'}
    );

  // Test if there's book in the list
  await waitFor(() => expect(getByText(/Book title/i)).toBeInTheDocument());
});
