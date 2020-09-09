import React from 'react'
import { useWishList } from '../../contexts/wish-list-context'

type Props = {}

const WishList = ({}: Props) => {
  const { list } = useWishList()

  return <div></div>
}

export default WishList