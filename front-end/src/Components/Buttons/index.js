import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import Aftercart from './Aftercart';
import Beforecart from './Beforecart';


const CartButons=({item})=> {
   

    const { cartList } = useSelector((state) => state.cart)
    const cartCout=useMemo(()=>{
       return cartList?.find((product)=> product?._id === item?._id)?.count
    },[cartList])
    console.log(cartCout,'/////////');
  return (
       <>
        { cartCout > 0 ? (<Aftercart itemId={item._id}  cartCout={cartCout} /> ):( <Beforecart item={item} />) }
       </>
  )
}

export default CartButons;
