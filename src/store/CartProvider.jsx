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
        const updatedTotalPrice = state.totalAmount + action.item.price * action.item.amount;

        // It will return the array index if item axist in the array
        const existingCartItemIndex = state.items.findIndex(
            // (item) => item.id === state.item.id
            (item) => item.id === action.item.id
        );
        // now lets get exiting item from the array
        // it will be null if item does not exists
        const existingItem = state.items[existingCartItemIndex];

        let updatedItem
        let updatedItems
        if (existingItem) {
            // It will just update the amount of the item
            updatedItem = {
                ...existingItem,
                amount: existingItem.amount + action.item.amount
            };

            // using spread operators here to avoid refrence-valu issue
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            // I am using items.concat insted of push as concat as it will add a
            // new item without editin old arry. this will solve the problem of
            // refrence-value(means value will get edited without react knowing
            //  about it)
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalPrice
        }
    } else if (action.type === "REMOVE_ITEM") {
        const existingItemIndex = state.items.findIndex((item => action.id === item.id));
        const existingItem = state.items[existingItemIndex];
        const updatedPrice = state.totalAmount - existingItem.price;

        let updatedItems
        if (existingItem.amount === 1) {

            // it will return an array without item with action.id id.
            updatedItems = state.items.filter(item => item.id !== action.id)
        } else {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount - 1
            }
            // again using spread op to avoaid refrence-value issue
            updatedItems = [...state.items]
            updatedItems[existingItemIndex] = updatedItem
        }
        return ({
            items: updatedItems,
            totalAmount: updatedPrice
        })
    }

    // return defaultCartState;
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