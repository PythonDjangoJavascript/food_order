import React from 'react'

//I am providing the default attribute to get suggestions by code editor
const cartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: () => { },
    removeItem: () => { },
    resetItems: () => { }
});

export default cartContext;