import { createContext } from "react";
import { useEffect } from "react/cjs/react.production.min";

//load products data in context to use in all the Shop / Product Page components
export const ProductsContext = createContext(null);

const initialState = {
    status: "loading", //idle, fetch-failed
    products: null,
    error: null 
}

const reducer = (state, action) => {
    switch (action.type) {
        case ("products-loaded-from-server") : {
            return {
                ...state, 
                status: "idle",
                products: action.products,
            }
        }
        case ("error-fetching-products-from-server") : {
            return {
                ...state,
                status: "fetch-failed",
                error: action.error
            }

        }
    }
}

export const ProductsContextProvider = ({children}) => {

    const [ state, dispatch ] = useReducer(reducer, initialState);

    useEffect(() => {
        //fetch
        fetch("/", { //ENDPOINT
            method: "GET", 
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => res.json())
        .then((data) => {
            dispatch ({
                type: "products-loaded-from-server", 
                products: data.data //verify what is being sent by server
            })
        })
        .catch((error) => {
            dispatch ({
                type: "error-fetching-products-from-server",
                error: error
            })
        })
    }, [])

    return <ProductsContext.Provider values={{ state: { status, products }}}>
        {children}
        </ProductsContext.Provider>
}

//wrap around App

