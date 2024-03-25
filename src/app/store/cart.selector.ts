import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CartState} from "./cart.state";

const selectFeatureCart = createFeatureSelector<CartState>('cart');

export const selectCart = createSelector(
    selectFeatureCart,
    (state: CartState) => state.cart
)
// Create a selector to calculate the total price
export const selectTotalPrice = createSelector(
    selectCart,
    (cart) => {
        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.quantity;
        });

        return total;
    }
);
// Create a selector to calculate the total quantity
export const selectTotalQuantity = createSelector(
    selectCart,
    (cart) => {
        let totalQuantity = 0;

        cart.forEach((item) => {
            totalQuantity += item.quantity;
        });

        return totalQuantity;
    }
);
