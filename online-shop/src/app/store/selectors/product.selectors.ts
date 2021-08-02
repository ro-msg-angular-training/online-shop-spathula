import { createSelector } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { ProductState } from "../state/product.state";

const selectProducts = (state: AppState) => state.products;

export const selectProductList = createSelector(
    selectProducts,
    (state: ProductState) => state.products
);

export const selectSelectedProduct = createSelector(
    selectProducts,
    (state: ProductState) => state.selectedProduct
);