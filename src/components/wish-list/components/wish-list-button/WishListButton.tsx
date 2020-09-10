import React from 'react';
import styles from './WishListButton.module.scss';
import { useWishList } from '../../../../contexts/wish-list-context';

type Props = {
	opened: boolean
	onOpen: () => void
}

export const WishListButton = ({ opened, onOpen }: Props) => {
  const { list } = useWishList();

  return (
    <button className={styles.button} onClick={onOpen}>
      Wishlist ({list.length})
    </button>
  );
};
