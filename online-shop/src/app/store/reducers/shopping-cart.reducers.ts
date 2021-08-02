import { CartItem } from "src/app/products/shared/cart-item.model";
import { ShoppingCartActions, ShoppingCartActionTypes } from "../actions/shopping-cart.actions";
import { initialShoppingCartState, ShoppingCartState } from "../state/shopping-cart.state";

export const shoppingCartReducers = (
    state = initialShoppingCartState,
    action: ShoppingCartActions
): ShoppingCartState => {
    switch(action.type) {
        case ShoppingCartActionTypes.AddCartItemSuccess: {
            let item = state.items.find(item => item.productId === action.payload.id);

            if(item === undefined) return {
                    ...state,
                    items: state.items.concat(new CartItem(action.payload.id, action.payload.name, action.payload.price, action.payload.category, 1))
            } 
            else return {
                ...state,
                items: state.items.map(item => item.productId === action.payload.id ? { ...item, quantity: item.quantity++ } : item)
            }
        }

        case ShoppingCartActionTypes.RemoveCartItemSuccess: {
            const items = state.items.map(item => item.productId === action.payload ? { ...item, quantity: item.quantity-- } : item)

            return {
                ...state,
                items: items.filter(item => item.quantity > 0)
            }
        }

        case ShoppingCartActionTypes.PlaceOrderSuccess: {
            return {
                ...state,
                items: []
            }
        }

        default:
            return state;
    }
}