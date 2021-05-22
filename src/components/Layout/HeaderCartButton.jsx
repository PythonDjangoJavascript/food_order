import { useContext, useEffect, useState } from "react";

import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from "../../store/cart-context"


function HeaderCartButton(props) {

    const cartCtx = useContext(CartContext)
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    // Destructures items from cart context
    const { items } = cartCtx;
    // const numberOfCartItem = cartCtx.items.reduce((curNumber, item) => {
    //     return curNumber + item.amount;
    // }, 0);
    const numberOfCartItem = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    const cartBtnStyleClass = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
            return
        }
        setBtnIsHighlighted(true)
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false)
        }, 300)

        // this return function will called every time before this useEffect
        // run, so we can do our cleanup jobs here
        return (() => {
            // need to clear this because user can change item before 300ms
            // besides its best prectice to crear this timer every time before
            // the useEffect runs again.
            clearTimeout(timer);
        })
    }, [items]) // this arrey is the dependency for useEffect to run again
    return (
        <button className={cartBtnStyleClass} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItem}</span>
        </button>
    )
}

export default HeaderCartButton;