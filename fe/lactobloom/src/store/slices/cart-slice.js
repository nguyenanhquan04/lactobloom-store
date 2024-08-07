import { v4 as uuidv4 } from 'uuid';
import cogoToast from 'cogo-toast';
const { createSlice } = require('@reduxjs/toolkit');

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: []
    },
    reducers: {
        addToCart(state, action) {
            const product = action.payload;
            if(!product.variation){
                const cartItem = state.cartItems.find(item => item.productId === product.productId);
                if(!cartItem){
                    state.cartItems.push({
                        ...product,
                        quantity: product.quantity ? product.quantity : 1,
                        cartItemId: uuidv4()
                    });
                } else {
                    state.cartItems = state.cartItems.map(item => {
                        if(item.cartItemId === cartItem.cartItemId){
                            return {
                                ...item,
                                quantity: product.quantity ? item.quantity + product.quantity : item.quantity + 1
                            }
                        }
                        return item;
                    })
                }

            } else {
                const cartItem = state.cartItems.find(
                    item =>
                        item.productId === product.productId 
                        (product.cartItemId ? product.cartItemId === item.cartItemId : true)
                );
                if(!cartItem){
                    state.cartItems.push({
                        ...product,
                        quantity: product.quantity ? product.quantity : 1,
                        cartItemId: uuidv4()
                    });
                } else if (cartItem !== undefined) {
                    state.cartItems = [
                        ...state.cartItems,
                        {
                            ...product,
                            quantity: product.quantity ? product.quantity : 1,
                            cartItemId: uuidv4()
                        }
                    ]
                } else {
                    state.cartItems = state.cartItems.map(item => {
                        if(item.cartItemId === cartItem.cartItemId){
                            return {
                                ...item,
                                quantity: product.quantity ? item.quantity + product.quantity : item.quantity + 1,
                            }
                        }
                        return item;
                    });
                }
            }

            cogoToast.success("Đã thêm sản phẩm vào giỏ hàng", {position: "bottom-left"});
        },
        deleteFromCart(state, action) {
            state.cartItems = state.cartItems.filter(item => item.cartItemId !== action.payload);
            cogoToast.error("Đã xóa khỏi giỏ hàng", {position: "bottom-left"});
        },
        decreaseQuantity(state, action){
            const product = action.payload;
            if (product.quantity === 1) {
                state.cartItems = state.cartItems.filter(item => item.cartItemId !== product.cartItemId);
                cogoToast.error("Đã xóa khỏi giỏ hàng", {position: "bottom-left"});
            } else {
                state.cartItems = state.cartItems.map(item =>
                    item.cartItemId === product.cartItemId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
                cogoToast.warn("Đã bớt số lượng sản phẩm khỏi giỏ hàng", {position: "bottom-left"});
            }
        },
        deleteAllFromCart(state){
            state.cartItems = []
        }
    },
});

export const { addToCart, deleteFromCart, decreaseQuantity, deleteAllFromCart } = cartSlice.actions;
export default cartSlice.reducer;
