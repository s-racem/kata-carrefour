import {Observable} from 'rxjs';
import {Product} from '../../../models/product.model';

export const checkIfItemExistsInCart = (
    itemId: number,
    cart: Observable<Product[]>
): boolean => {
    let itemExistsInCart = false;
    cart.subscribe((product) => {
        if (product.length > 0) {
            product.forEach((item) => {
                if (item.id === itemId) {
                    itemExistsInCart = true;
                }
            });
        }
    });
    return itemExistsInCart;
};
