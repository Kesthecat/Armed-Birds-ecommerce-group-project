import { createContext } from "react";
import { useEffect, useReducer, useState } from "react";

//load products data in context to use in all the Shop / Product Page components
export const ProductsContext = createContext(null);

const initialState = {
    status: "loading", //other statuses: idle, fetch-failed
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

    //keep track of product loading state
    const [ state, dispatch ] = useReducer(reducer, initialState);
    
    //state to keep track of filters and subfilters selected for the ProductListing component
    const [filter, setFilter] = useState(null);
    const [subfilter, setSubfilter] = useState(null);
    
    //fetch all products from server
    useEffect(() => {
  
        fetch("/get-items", { 
            method: "GET", 
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => res.json())
        .then((data) => {
            dispatch ({
                type: "products-loaded-from-server", 
                products: data.data
            })
        })
        .catch((error) => {
            dispatch ({
                type: "error-fetching-products-from-server",
                error: error
            })
        })
    }, [])

    return <ProductsContext.Provider value={{ state, filter, setFilter, subfilter, setSubfilter }}>
        {children}
        </ProductsContext.Provider>
}
