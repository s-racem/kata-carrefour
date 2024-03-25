import {createReducer, on} from '@ngrx/store';
import {CartProduct} from '../models/cart-product.model';
import * as CartActions from './cart.actions';

export interface CartState {
    cart: CartProduct[];
}

export const initialState: CartState = {
    cart: [],
};

export const cartReducer = createReducer(
    initialState,

    on(CartActions.addToCart, (state, {product}) => ({
        ...state,
        cart: [...state.cart, {...product, quantity: 1}],
    })),

    on(CartActions.addQuantity, (state, {id}) => ({
        ...state,
        cart: state.cart.map((item) =>
            item.id === id ? {...item, quantity: item.quantity + 1} : item
        ),
    })),

    on(CartActions.reduceQuantity, (state, {id}) => ({
        ...state,
        cart: state.cart.map((item) =>
            item.id === id ? {...item, quantity: item.quantity - 1} : item
        ),
    })),

    on(CartActions.removeFromCart, (state, {id}) => ({
        ...state,
        cart: state.cart.filter((item) => item.id !== id),
    })),



    on(CartActions.emptyCart, (state) => ({
        ...state,
        cart: [],
    }))
);
