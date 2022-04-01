import { createContext } from "react";
import { useEffect, useReducer } from "react";

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
  
        fetch("/get-items", { 
            method: "GET", 
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => res.json())
        .then((data) => {

            console.log("fetch products data", data, data.data)

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

    return <ProductsContext.Provider value={{ state }}>
        {children}
        </ProductsContext.Provider>
}
