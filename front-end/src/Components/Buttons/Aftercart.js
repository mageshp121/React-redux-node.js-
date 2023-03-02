import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { decrement,increment } from '../../redux/Cart'


const Aftercart = ({cartCout,itemId}) => {
    const dispatch = useDispatch()
  return (
 
       <div>
      <button onClick={()=>dispatch(decrement(itemId))}>-</button>
      <div>{cartCout}</div>
      <button onClick={()=>dispatch(increment(itemId))}>+</button>
    </div>
   
  )
}

export default Aftercart
