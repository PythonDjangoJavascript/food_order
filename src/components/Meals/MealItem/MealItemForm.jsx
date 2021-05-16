import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input"

function MealItemForm() {
    return (
        <form className={classes.form}>
            <Input
                label="Amount"
                input={{
                    id: "amount",
                    type: "number",
                    min: 1,
                    max: 5,
                    defaultValue: 1
                }}
            />
            <button>+ add</button>
        </form>
    );
};

export default MealItemForm