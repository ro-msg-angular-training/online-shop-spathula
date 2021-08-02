import { initialProductState, ProductState } from "../state/product.state";
import { ProductActions, ProductActionTypes } from "../actions/product.actions";

export const productReducers = (
    state = initialProductState,
    action: ProductActions
): ProductState => {
    switch(action.type) {
        case ProductActionTypes.GetProductsSuccess: {
            return {
                ...state,
                products: action.payload
            };
        }

        case ProductActionTypes.GetProductSuccess: {
            return {
                ...state,
                selectedProduct: action.payload
            };
        }

        case ProductActionTypes.AddProductSuccess: {
            return {
                ...state,
                products: state.products.concat(action.payload)
            }
        }

        case ProductActionTypes.EditProductSuccess: {
            return {
                ...state,
                products: state.products.map(product =>
                    product.id == action.payload.id ? action.payload : product)
            }
        }

        case ProductActionTypes.DeleteProductSuccess: {
            return {
                ...state,
                products: state.products.filter(product => product.id != action.payload)
            }
        }

        default:
            return state;
    }
}