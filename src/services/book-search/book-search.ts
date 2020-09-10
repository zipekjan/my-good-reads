import fetchUrl from '../utils/fetchUrl/fetchUrl';
import { Books } from './types';

/**
 * Fetches list of books that correspond to user query
 * Returns null if the search fails
 */
export async function findBooks(query: string) {
  try {
    return await fetchUrl<Books>(
      `https://www.googleapis.com/books/v1/volumes?q=${query}`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      }
    );
  } catch (exception) {
    return null;
  }
}
