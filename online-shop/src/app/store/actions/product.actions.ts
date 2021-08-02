import { Action } from "@ngrx/store";
import { Product } from "src/app/products/shared/product";

export enum ProductActionTypes {
    GetProducts = '[Product] Get Products',
    GetProductsSuccess = '[Product] Get Products Success',
    GetProduct = '[Product] Get Product',
    GetProductSuccess = '[Product] Get Product Success',
    AddProduct = '[Product] Add Product',
    AddProductSuccess = '[Product] Add Product Success',
    EditProduct = '[Product] Edit Product',
    EditProductSuccess = '[Product] Edit Product Success',
    DeleteProduct = '[Product] Delete Product',
    DeleteProductSuccess = '[Product] Delete Product Success',
}

export class GetProducts implements Action {
    public readonly type = ProductActionTypes.GetProducts;
}

export class GetProductsSuccess implements Action {
    public readonly type = ProductActionTypes.GetProductsSuccess;
    constructor(public payload: Product[]) { }
}

export class GetProduct implements Action {
    public readonly type = ProductActionTypes.GetProduct;
    constructor(public payload: number) { }
}

export class GetProductSuccess implements Action {
    public readonly type = ProductActionTypes.GetProductSuccess;
    constructor(public payload: Product) { }
}

export class AddProduct implements Action {
    public readonly type = ProductActionTypes.AddProduct;
    constructor(public payload: Product) { }
}

export class AddProductSuccess implements Action {
    public readonly type = ProductActionTypes.AddProductSuccess;
    constructor(public payload: Product) { }
}

export class EditProduct implements Action {
    public readonly type = ProductActionTypes.EditProduct;
    constructor(public payload: Product) { }
}

export class EditProductSuccess implements Action {
    public readonly type = ProductActionTypes.EditProductSuccess;
    constructor(public payload: Product) { }
}

export class DeleteProduct implements Action {
    public readonly type = ProductActionTypes.DeleteProduct;
    constructor(public payload: number) { }
}

export class DeleteProductSuccess implements Action {
    public readonly type = ProductActionTypes.DeleteProductSuccess;
    constructor(public payload: number) { }
}

export type ProductActions = GetProducts | GetProductsSuccess | GetProduct | GetProductSuccess | AddProduct | AddProductSuccess | EditProduct | EditProductSuccess | DeleteProduct | DeleteProductSuccess;