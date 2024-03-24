import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems:[]}

const addDecimals = (num)=>{
    return (Math.round(num * 100 )/100).toFixed()
}
const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const item = action.payload
            
            const existItem = state.cartItems.find((x)=> x._id === item._id)

            if(existItem){
                state.cartItems = state.cartItems.map((x)=>x._id === existItem._id ? item : x)
            }else{
                state.cartItems = [...state.cartItems,item]
            }

            //calculate items price 
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc,item)=> acc + item.price * item.qty , 0))
            // : The reduce() method in JavaScript is used to reduce an array to a single value. It iterates over each element of the array and accumulates a result, which can be anything from a single value to a complex data structure.(acc,item)=> acc + item.price * item.qty: This is the callback function provided to reduce(). It takes two parameters: acc (short for accumulator) and item. For each item in cartItems, it calculates the total price by multiplying the price of each item (item.price) by its quantity (item.qty) and adds it to the accumulator (acc). This way, it accumulates the total price of all items in the cart. 0: This is the initial value for the accumulator. In this case, it starts from 0.

            //calculate shipping price (if order>$100 then free other wise $10 shipping price)
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)

            // calculate tax price (15%tax)
            state.taxprice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))

            // calculate total price
            state.totalPrice = (
                Number(state.itemsPrice)+Number(state.shippingPrice)+Number(state.taxprice)
            )

            localStorage.setItem('cart',JSON.stringify(state))
        }
    }
})

export  const {addToCart} = cartSlice.actions

export default cartSlice.reducer
