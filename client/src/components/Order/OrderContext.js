import { createContext, useReducer, useState } from "react";
import usePersistedState from "../usePersistedState.hook";

export const OrderContext = createContext();

//possible statuses
// - `idle`
// - `items-selected`
// - `awaiting-response`
// - `error`
// - `purchased`

const initialState = {
    status: "idle", 
    error: null, 
    itemsToPurchase: [], //array of item ids, names, quantities and prices
    //has shape [{_id, name, price, quantity}]
}

const reducer = (state, action) => {
    switch (action.type) {
        case ("begin-order-process"): {
            return {
                ...state, 
                status: "items-selected", 
                error: null, 
                itemsToPurchase: action.selectedItems, 
            };
        }
        case ("cancel-order-process"): { //for CANCEL BUTTON on checkout page
            return {
                ...initialState
            }
        }
        case ("order-processing"): { //can use for spinner on the checkout button etc
            return {
                ...state,
                status: "awaiting-response",
            }
            
        }
        case ("order-failure"): {
            return {
                ...state,
                status: "error",
                error: action.message, 
            }
        }
        case ("order-success"): { 
            return {
                ...initialState,
                status: "purchased",
                itemsToPurchase: action.selectedItems, 
            }
        }
        case ("after-order-reset"): {
            return {
                ...initialState,
            }
        }
        default: {
            return state;
        }
    }
}


export const OrderContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    //keep track of user's selected item ids, names, quantity and prices in the current session before purchase
    //stored in session storage
    //has shape [{_id, name, price, quantity}]
    const [selectedItems, setSelectedItems] = usePersistedState([], "current-cart");

    //state to indicate whether to display Cart Modal or not
    const [displayModal, setDisplayModal] = useState(false);

    const beginOrderProcess = () => {
        dispatch({
            type: "begin-order-process", 
            selectedItems: selectedItems, 
        });
    };

    const cancelOrderProcess = () => {
        setSelectedItems([]);
        dispatch({
            type: "cancel-order-process", 
        })
    };

    const orderRequested = () => {
        dispatch({
            type: "order-processing",
        })
    };

    const orderFailure = (errorMessage) => {
        dispatch({
            type: "order-failure",
            error: errorMessage,
        })
    }

    const orderSuccess = () => {
        //empty the cart
        setSelectedItems([]);

        dispatch({
            type: "order-success",
            selectedItems: []
        })
    }

    const afterPurchaseReset = () => {
        dispatch({
            type: "after-purchase-reset",
        })
    }

    return (
        <OrderContext.Provider
            value={{
                state, 
                actions: { beginOrderProcess,
                    cancelOrderProcess,
                    orderRequested,
                    orderFailure,
                    orderSuccess,
                    afterPurchaseReset,
                },
                selectedItems, setSelectedItems,
                displayModal, setDisplayModal
            }}
            >{children}
        </OrderContext.Provider>
    )
}