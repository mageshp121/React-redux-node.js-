import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
    cartList: [],
    cartCount: 0,
}
const cartSlice = createSlice({
    name: "cart",
    initialState: INITIAL_STATE,
    reducers: {
        addToCart: (state, action) => {
            // state.cartCount = 1
            // console.log(action,'////////action produtc details');
            const itemExiat = state.cartList.find((product) => product._id === action.payload._id)
            if (itemExiat) {
                state.cartList.forEach((item) => {
                    if (item?._id === action.payload._id) {
                        item.count = 1
                    }
                })
            } else {
                state.cartList.push({
                    ...action.payload,
                    count: 1
                })
            }
        },
        increment: (state, action) => {
            console.log(action, '///increment action');
            const productId = action.payload;
            state.cartList.forEach((item) => {
                if (item?._id === productId) {
                    item.count++;
                }
            })
        },
        decrement: (state, action) => {
            const productId = action.payload;
            state.cartList.forEach((item) => {
                if (item?._id === productId) {
                    item.count--;
                }
            })

        },
    },
})

export const { increment, decrement, addToCart } = cartSlice.actions;
export default cartSlice.reducer;