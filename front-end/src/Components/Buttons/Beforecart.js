import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/Cart'

const Beforecart = ({item}) => {
    const dispatch = useDispatch()
  return (
   <div>
    <button onClick={()=>dispatch(addToCart(item))}>add to cart</button>
   </div>
  )
}

export default Beforecart