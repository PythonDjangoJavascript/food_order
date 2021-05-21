import { useReducer } from "react";

import CartContext from "./cart-context";

//it will be  the intial value of the state
const defaultCartState = {
    items: [],
    totalAmount: 0
};

//this function will be called automaticly once the dispatch action changed
// we will have access the previous state and the the entire action that changed
// inside action object we can access everything pvided in dispatch
function cartReducer(state, action) {

    if (action.type === "ADD_ITEM") {
        // I am using items.concat insted of push as concat as it will add a
        // new item without editin old arry. this will solve the problem of
        // refrence-value(means value will get edited without react knowing
        //  about it)
        const updatedItems = state.items.concat(action.item);
        const updatedPrice = state.totalAmount + action.item.price * action.item.amount;

        return {
            items: updatedItems,
            totalAmount: updatedPrice
        }
    }

    return defaultCartState;
};

function CartProvider(props) {

    // dispatch is used to select actions and cartReducer will be called
    // Automaticly by react once any of the dispatch action chaned.
    const [cartState, dispathcCartAction] = useReducer(cartReducer, defaultCartState);


    const addItemToCartHandler = (item) => {
        // we can use any formate for action but it is convinient to use 
        // dictionary object here.
        dispathcCartAction({
            type: "ADD_ITEM",
            item: item,
        });
    };

    const removeItemFromCartHandler = (id) => {
        dispathcCartAction({
            type: "REMOVE_ITEM",
            id: id,
        })
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;