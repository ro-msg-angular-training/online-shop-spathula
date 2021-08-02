import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { OrderService } from "src/app/products/shared/order.service";
import { AddProductSuccess } from "../actions/product.actions";
import { AddCartItem, PlaceOrder, PlaceOrderError, PlaceOrderSuccess, RemoveCartItem, RemoveCartItemSuccess, ShoppingCartActionTypes } from "../actions/shopping-cart.actions";
import { selectCartItems } from "../selectors/shopping-cart.selectors";
import { AppState } from "../state/app.state";
import { Location } from "@angular/common";

@Injectable()
export class ShoppingCartEffects {
    constructor(
        private _service: OrderService,
        private _actions$: Actions,
        private _store: Store<AppState>,
        private _location: Location
    ) {}

    addCartItem$ = createEffect(() => {
        return this._actions$.pipe(
            ofType<AddCartItem>(ShoppingCartActionTypes.AddCartItem),
            switchMap(action => of(new AddProductSuccess(action.payload)))
        )
    });

    removeCartItem$ = createEffect(() => {
        return this._actions$.pipe(
            ofType<RemoveCartItem>(ShoppingCartActionTypes.RemoveCartItem),
            switchMap(action => of(new RemoveCartItemSuccess(action.payload)))
        )
    });

    placeOrder$ = createEffect(() => {
        return this._actions$.pipe(
            ofType<PlaceOrder>(ShoppingCartActionTypes.PlaceOrder),
            withLatestFrom(this._store.select(selectCartItems)),
            tap(() => this._location.back()),
            switchMap(([action, items]) => this._service.placeOrder(items).pipe(
                map(() => new PlaceOrderSuccess()),
                catchError(error => of(new PlaceOrderError()))
            )),
        )
    })
}