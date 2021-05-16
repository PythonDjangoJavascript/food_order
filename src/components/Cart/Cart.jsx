import classes from "./Cart.module.css";
import Modal from "../UI/Modal"

function Cart(props) {
    // Cart items with dummy data
    const cartItems = (
        <ul className={classes["cart-items"]}>
            {[{
                id: "c1",
                name: "Burger",
                amount: 2,
                price: 12.99
            }].map(item => {
                return (
                    <li>
                        {item.name}
                    </li>
                )
            })}
        </ul>
    );

    return (
        <Modal onClick={props.onHideCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>35.42</span>
            </div>
            <div className={classes.actions}>
                <button className={classes["button--alt"]} onClick={props.onHideCart}>
                    Close
                </button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal >
    );
}

export default Cart