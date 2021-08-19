import classes from "./Checkout.module.css"
import useInput from "../hooks/use-input"


// Validaton fucntions for inputs
const isNotEmpty = (value) => value.trim() !== ''
const lenIsFour = (value) => value.trim().length === 4

const Checkout = props => {

    // using CustomHook for individual Input
    const {
        value: nameInput,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        inputResetHandler: nameResetHandler
    } = useInput(isNotEmpty)
    const {
        value: streetInput,
        isValid: streetIsValid,
        hasError: streetHasError,
        valueChangeHandler: streetChangeHandler,
        inputBlurHandler: streetBlurHandler,
        inputResetHandler: streetResetHandler
    } = useInput(isNotEmpty)
    const {
        value: postCodeInput,
        isValid: postCodeIsValid,
        hasError: postCodeHasError,
        valueChangeHandler: postCodeChangeHandler,
        inputBlurHandler: postCodeBlurHandler,
        inputResetHandler: postCodeResetHandler
    } = useInput(lenIsFour)
    const {
        value: cityInput,
        isValid: cityIsValid,
        hasError: cityHasError,
        valueChangeHandler: cityChangeHandler,
        inputBlurHandler: cityBlurHandler,
        inputResetHandler: cityResetHandler
    } = useInput(isNotEmpty)


    // Form Submit Handler
    const orderSubmitHandler = event => {
        event.preventDefault()

        // validate form
        let formIsValid = (
            nameIsValid &&
            streetIsValid &&
            postCodeIsValid &&
            cityIsValid
        )

        console.log(formIsValid)

        if (!formIsValid) {
            nameBlurHandler()
            streetBlurHandler()
            postCodeBlurHandler()
            cityBlurHandler()
            return
        }

        console.log(nameInput)

        // nor reset all value
        nameResetHandler()
        streetResetHandler()
        postCodeResetHandler()
        cityResetHandler()
    }

    // all style classe for inputs
    const nameInputClass = `${classes.control} ${nameHasError ? classes.invalid : ''}`
    const streetInputClass = `${classes.control} ${streetHasError ? classes.invalid : ''}`
    const postalInputClass = `${classes.control} ${postCodeHasError ? classes.invalid : ''}`
    const cityInputClass = `${classes.control} ${cityHasError ? classes.invalid : ''}`


    return <form onSubmit={orderSubmitHandler} className={classes.form}>
        <div className={nameInputClass}>
            <label htmlFor="name">Your Name</label>
            <input
                type="text"
                id="name"
                value={nameInput}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
            />
            {nameHasError && <p>Please Enter a valid Name</p>}
        </div>
        <div className={streetInputClass}>
            <label htmlFor="street">Street</label>
            <input
                type="text"
                id="street"
                value={streetInput}
                onChange={streetChangeHandler}
                onBlur={streetBlurHandler}
            />
            {streetHasError && <p>Please Enter a valid Street</p>}
        </div>
        <div className={postalInputClass}>
            <label htmlFor="postal">Postal Code</label>
            <input
                type="text"
                id="postal"
                value={postCodeInput}
                onChange={postCodeChangeHandler}
                onBlur={postCodeBlurHandler}
            />
            {postCodeHasError && <p>Please Enter 4 digit postal code</p>}
        </div>
        <div className={cityInputClass}>
            <label htmlFor="city">City</label>
            <input
                type="text"
                id="city"
                value={cityInput}
                onChange={cityChangeHandler}
                onBlur={cityBlurHandler}
            />
            {cityResetHandler && <p>Please Enter a valid City</p>}
        </div>
        <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>Cancel</button>
            <button className={classes.submit}>Confirm</button>
        </div>
    </form>
}

export default Checkout