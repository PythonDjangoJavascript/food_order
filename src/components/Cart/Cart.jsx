import { useContext, useState } from "react";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {

    // order checkout state
    const [showCheckoutForm, setShowCheckoutForm] = useState(false)

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

    return (
        <Modal onClick={props.onHideCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {showCheckoutForm ? <Checkout onCancel={props.onHideCart} /> : cartActionBtns}
        </Modal >
    );
}

export default Cart