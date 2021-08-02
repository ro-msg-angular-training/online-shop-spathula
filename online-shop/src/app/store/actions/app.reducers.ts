import { ActionReducerMap } from "@ngrx/store";
import { productReducers } from "../reducers/product.reducers";
import { shoppingCartReducers } from "../reducers/shopping-cart.reducers";
import { AppState } from "../state/app.state";

export const appReducers: ActionReducerMap<AppState, any> = {
    products: productReducers,
    shoppingCart: shoppingCartReducers
}