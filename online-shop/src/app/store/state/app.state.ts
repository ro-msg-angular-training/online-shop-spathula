import { initialProductState, ProductState } from "./product.state";
import { initialShoppingCartState, ShoppingCartState } from "./shopping-cart.state";

export interface AppState {
    products: ProductState;
    shoppingCart: ShoppingCartState;
}

export const initialAppState: AppState = {
    products: initialProductState,
    shoppingCart: initialShoppingCartState
}

export function getInitialState(): AppState {
    return initialAppState;
}