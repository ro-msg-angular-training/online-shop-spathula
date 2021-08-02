import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { ProductService } from "src/app/products/shared/product.service";
import { AddProduct, AddProductSuccess, GetProduct, GetProducts, GetProductsSuccess, GetProductSuccess, ProductActionTypes, EditProduct, EditProductSuccess, DeleteProduct, DeleteProductSuccess } from "../actions/product.actions";
import { AppState } from "../state/app.state";
import { Location } from "@angular/common";

@Injectable()
export class ProductEffects {
    constructor(
        private _service: ProductService,
        private _actions$: Actions,
        private _store: Store<AppState>,
        private _location: Location
    ) { }

    getProduct$ = createEffect(() => {
        return this._actions$.pipe(
            ofType<GetProduct>(ProductActionTypes.GetProduct),
            map(action => action.payload),
            switchMap(id => this._service.getProduct(id).pipe(map(product => new GetProductSuccess(product))))
        )
    });

    getProducts$ = createEffect(() => {
        return this._actions$.pipe(
            ofType<GetProducts>(ProductActionTypes.GetProducts),
            switchMap(() => this._service.getProducts().pipe(map(products => new GetProductsSuccess(products))))
        )
    });

    addProduct$ = createEffect(() => {
        return this._actions$.pipe(
            ofType<AddProduct>(ProductActionTypes.AddProduct),
            map(action => action.payload),
            switchMap(product => this._service.addProduct(product)),
            tap(() => this._location.back()),
            switchMap(product => of(new AddProductSuccess(product)))
        )
    });

    editProduct$ = createEffect(() => {
        return this._actions$.pipe(
            ofType<EditProduct>(ProductActionTypes.EditProduct),
            map(action => action.payload),
            switchMap(product => this._service.editProduct(product).pipe(map(() => product))),
            tap(() => this._location.back()),
            switchMap(product => of(new EditProductSuccess(product)))
        )
    });

    deleteProduct$ = createEffect(() => {
        return this._actions$.pipe(
            ofType<DeleteProduct>(ProductActionTypes.DeleteProduct),
            map(action => action.payload),
            switchMap(id => this._service.deleteProduct(id).pipe(map(() => id))),
            tap(() => this._location.back()),
            switchMap(id => of(new DeleteProductSuccess(id)))
        )
    });
}