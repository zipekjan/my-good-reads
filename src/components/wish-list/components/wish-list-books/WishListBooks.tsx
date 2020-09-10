import React from 'react';
import { useWishList } from '../../../../contexts/wish-list-context';
import { WishListBook } from './components/wish-list-book/WishListBook';
import styles from './WishListBooks.module.scss';

type Props = {
	opened: boolean
	onClose: () => void
}

export const WishListBooks = ({ opened, onClose }: Props) => {
  const { list } = useWishList();

  return opened ? (
    <div className={styles.container} onClick={onClose}>
      <div className={styles.content} onClick={e => e.stopPropagation()}>
        <div className={styles.title}>
          <h2>Your Wishlist</h2>
          <button className={styles.close} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.list}>
          {list.map(i => (
            <WishListBook item={i} key={i.id} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
