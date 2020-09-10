import { expect } from 'chai';
import sinon from 'sinon';
import assert from 'assert';
import { getBooksByType } from './book-search';

describe('Testing BookSearch service', () => {
  const res = [
    {
      id: '1',
      name: 'Abc',
    },
  ];

  it('should call api properly', () => {
    const mockFetch = sinon.fake.resolves({
      ok: true,
      json: () => res,
    });

    // Inject mock fetch into global
    global.fetch = mockFetch;

    getBooksByType('test');

    assert(mockFetch.calledWith('https://www.googleapis.com/books/v1/volumes?q=test'));
    assert(mockFetch.calledOnce, 'Fn was called once');

    delete global.fetch;
  });

  it('should return null on fail', () => {
    const mockFetch = sinon.fake.resolves({
      ok: false,
      json: () => res,
    });

    // Inject mock fetch into global
    global.fetch = mockFetch;

    const result = getBooksByType('test');

    expect(result).to.eventually.equal(null);

    delete global.fetch;
  });
});
