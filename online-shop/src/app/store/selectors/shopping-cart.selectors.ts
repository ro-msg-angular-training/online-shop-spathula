import { createSelector } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { ShoppingCartState } from "../state/shopping-cart.state";

const selectShoppingCart = (state: AppState) => state.shoppingCart;

export const selectCartItems = createSelector(
    selectShoppingCart,
    (state: ShoppingCartState) => state.items
)