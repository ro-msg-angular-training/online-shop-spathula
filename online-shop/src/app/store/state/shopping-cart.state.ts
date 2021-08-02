import { CartItem } from "src/app/products/shared/cart-item.model";

export interface ShoppingCartState {
    items: CartItem[];
}

export const initialShoppingCartState: ShoppingCartState = {
    items: []
}