import classes from "./Cart.module.css";

function Cart() {
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
        <div>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>35.42</span>
            </div>
            <div className={classes.action}>
                <button className={classes["button--alt"]}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </div >
    );
}

export default Cart