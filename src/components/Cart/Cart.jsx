import { useContext, useState } from "react";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {

    // order checkout state
    const [showCheckoutForm, setShowCheckoutForm] = useState(false)
    // Loading State
    const [isOrderSubmitting, setIsOrderSubmitting] = useState(false)
    // success of submitting data
    const [didSubmit, setDidSubmit] = useState(false)

    const cartCtx = useContext(CartContext);
    const totalAmount = cartCtx.totalAmount.toFixed(2);

    const addItemHandler = (item) => {
        cartCtx.addItem({
            ...item,
            amount: 1
        })
    };
    const removeItemHandler = (id) => {
        cartCtx.removeItem(id);
    }

    // Order Function
    const orderHandler = () => {
        setShowCheckoutForm(true)
    }

    // Post data to Firebase on form submit
    const onOrderSubmit = async (userData) => {
        setIsOrderSubmitting(true)
        const response = await fetch('https://food-order-app-2c4fc-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
            method: "POST",
            body: JSON.stringify({
                user: userData,
                orderItems: cartCtx.items
            })
        })

        if (response.ok) {
            setDidSubmit(true)
            cartCtx.resetItems()
        }
        setIsOrderSubmitting(false)
    }

    // Cart items with dummy data
    const cartItems = (
        <ul className={classes["cart-items"]}>
            {cartCtx.items.map(item => {
                return (
                    <ul>
                        <CartItem
                            key={item.id}
                            name={item.name}
                            price={item.price}
                            amount={item.amount}
                            onRemove={removeItemHandler.bind(null, item.id)}
                            onAdd={addItemHandler.bind(null, item)}
                        />
                    </ul>
                )
            })}
        </ul>
    );

    const cartActionBtns = (
        <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onHideCart}>
                Close
            </button>
            {(cartCtx.items.length > 0) && <button className={classes.button} onClick={orderHandler}>
                Order
            </button>}
        </div>
    )

    // cart comp
    const cartModelConstent = <>
        {!showCheckoutForm && cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {showCheckoutForm ? <Checkout onOrder={onOrderSubmit} onCancel={props.onHideCart} /> : cartActionBtns}
    </>

    const isSubmittingModelContent = <p>Sending order data...</p>

    const submitSuccessful = <>
        <p>Successfully placed the order</p>
        <div className={classes.actions}>
            <button className={classes.button} onClick={props.onHideCart}>
                Close
            </button>
        </div>
    </>

    return (
        <Modal onClick={props.onHideCart}>
            {!isOrderSubmitting && !didSubmit && cartModelConstent}
            {isOrderSubmitting && isSubmittingModelContent}
            {!isOrderSubmitting && didSubmit && submitSuccessful}
        </Modal >
    );
}

export default Cart