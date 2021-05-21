import { useContext } from "react"

import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm"
import CartContext from "../../../store/cart-context"

function MealItem(props) {
    const CartCtx = useContext(CartContext);

    const price = `$${props.price.toFixed(2)}`;

    // Add user specified amount items to the chart
    const addToChartHandler = (itemAmount) => {
        CartCtx.addItem({
            id: props.id,
            name: props.name,
            price: props.price,
            amount: itemAmount
        });
    };

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm addToChart={addToChartHandler} />
            </div>
        </li>
    );
}

export default MealItem