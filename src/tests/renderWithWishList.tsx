import React from 'react';
import {
  WishListContextType,
  WishListContext
} from '../contexts/wish-list-context';
import { render } from '@testing-library/react';

export const renderWithWishList = (
  component: React.ReactNode,
  ctx: Partial<WishListContextType> = {}
) => {
  const context = {
    list: [],
    addBook: () => null,
    hasBook: () => false,
    removeBook: () => null,
    ...ctx
  };

  return render(
    <WishListContext.Provider value={context}>
      {component}
    </WishListContext.Provider>
  );
};
