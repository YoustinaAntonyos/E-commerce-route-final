import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartResponse } from "../types/cart.type";


export type CartValuesTypes = {
    status: string,
    message: string,
    numOfCartItems: number,
    cartId: null| string,
    data: {
        products: CartItem[],
        totalCartPrice: number
    },
}


export const cartInitialValues : CartValuesTypes = {

    status: "",
    message: "",
    numOfCartItems: 0,
    cartId: null,
    data: {
        products: [],
        totalCartPrice: 0
    },
}



const cartSlice = createSlice({
    name: 'cart',

    initialState: cartInitialValues,

    reducers: {
        setCartInfo:(state, action:PayloadAction<CartValuesTypes>)=>{
            state.status = action.payload.status
            state.numOfCartItems = action.payload.numOfCartItems
            state.data = action.payload.data
            state.message = action.payload.message
            state.cartId = action.payload.cartId
        }
    }
})

export const cartReducer = cartSlice.reducer
export const cartActions = cartSlice.actions