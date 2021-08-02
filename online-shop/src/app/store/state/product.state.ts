import { Product } from "src/app/products/shared/product";

export interface ProductState {
    products: Product[];
    selectedProduct?: Product;
}

export const initialProductState: ProductState = {
    products: [],
    selectedProduct: undefined
}