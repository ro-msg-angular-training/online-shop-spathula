import { Action } from "@ngrx/store";
import { Product } from "src/app/products/shared/product";

export enum ShoppingCartActionTypes {
    AddCartItem = '[ShoppingCart] Add Cart Item',
    AddCartItemSuccess = '[ShoppingCart] Add Cart Item Success',
    RemoveCartItem = '[ShoppingCart] Remove Cart Item',
    RemoveCartItemSuccess = '[ShoppingCart] Remove Cart Item Success',
    PlaceOrder = '[ShoppingCart] Place Order',
    PlaceOrderSuccess = '[ShoppingCart] Place Order Success',
    PlaceOrderError = '[ShoppingCart] Place Order Error',
}

export class AddCartItem implements Action {
    public readonly type = ShoppingCartActionTypes.AddCartItem;
    constructor(public payload: Product) {}
}

export class AddCartItemSuccess implements Action {
    public readonly type = ShoppingCartActionTypes.AddCartItemSuccess;
    constructor(public payload: Product) {}
}

export class RemoveCartItem implements Action {
    public readonly type = ShoppingCartActionTypes.RemoveCartItem;
    constructor(public payload: number) {}
}

export class RemoveCartItemSuccess implements Action {
    public readonly type = ShoppingCartActionTypes.RemoveCartItemSuccess;
    constructor(public payload: number) {}
}

export class PlaceOrder implements Action {
    public readonly type = ShoppingCartActionTypes.PlaceOrder;
}

export class PlaceOrderSuccess implements Action {
    public readonly type = ShoppingCartActionTypes.PlaceOrderSuccess;
}

export class PlaceOrderError implements Action {
    public readonly type = ShoppingCartActionTypes.PlaceOrderError;
}

export type ShoppingCartActions = AddCartItem | AddCartItemSuccess | RemoveCartItem | RemoveCartItemSuccess | PlaceOrder | PlaceOrderSuccess | PlaceOrderError;