import { useReducer } from "react"


// Default inputState for useReducer
const defaultInputState = {
    value: '',
    isTouched: false
}

// fucntion for inputUseReducer to implement actions
const inputStateReducer = (currState, action) => {

    if (action.type === "INPUT") {
        return { value: action.value, isTouched: currState.isTouched }
    }
    if (action.type === "BLUR") {
        return { value: currState.value, isTouched: true }
    }
    if (action.type === "RESET") {
        return { value: '', isTouched: false }
    }

    return defaultInputState
}


const useInput = (validateInput) => {

    // using useReducer as we have trhee different state to manage
    const [inputState, dispatch] = useReducer(
        inputStateReducer,
        defaultInputState
    )

    // Validation
    const inputIsValid = validateInput(inputState.value)
    const hasError = !inputIsValid && inputState.isTouched

    // these 3 func will be called from input component
    const valueChangeHandler = (event) => {
        dispatch({
            type: "INPUT",
            value: event.target.value
        })
    }
    const inputBlurHandler = () => {
        dispatch({ type: "BLUR" })
    }
    const inputResetHandler = () => {
        dispatch({ type: "RESET" })
    }

    return ({
        value: inputState.value,
        isValid: inputIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        inputResetHandler
    })
}

export default useInput