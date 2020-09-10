import React, { useState } from 'react'
import { WishListBooks } from './components/wish-list-books/WishListBooks'
import { WishListButton } from './components/wish-list-button/WishListButton'

const WishList = () => {
  const [opened, setOpened] = useState(false)

  return <>
    <WishListButton opened={opened} onOpen={() => setOpened(true)} />
    <WishListBooks opened={opened} onClose={() => setOpened(false)} />
  </>
}

export default WishList