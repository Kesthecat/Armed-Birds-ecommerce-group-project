import { createContext } from "react";
import { useEffect, useReducer, useState } from "react";

//load companies data in context to use in all the Shop / Product Page components
export const CompaniesContext = createContext(null);

const initialState = {
    companiesStatus: "loading", //other statuses: idle, fetch-failed
    companies: null,
    error: null 
}

const reducer = (state, action) => {
    switch (action.type) {
        case ("companies-loaded-from-server") : {
            return {
                ...state, 
                companiesStatus: "idle",
                companies: action.companies,
            }
        }
        case ("error-fetching-companies-from-server") : {
            return {
                ...state,
                companiesStatus: "fetch-failed",
                error: action.error
            }

        }
    }
}

export const CompaniesContextProvider = ({children}) => {

    const [ state, dispatch ] = useReducer(reducer, initialState);
    
    useEffect(() => {
        fetch("/get-companies", { 
            method: "GET", 
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => res.json())
        .then((data) => {
            dispatch ({
                type: "companies-loaded-from-server", 
                companies: data.data 
            })
        })
        .catch((error) => {
            dispatch ({
                type: "error-fetching-companies-from-server",
                error: error
            })
        })
    }, [])

    return <CompaniesContext.Provider value={{ state }}>
        {children}
        </CompaniesContext.Provider>
}
