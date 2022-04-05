import { createContext, useReducer, useState } from "react";
import usePersistedState from "../usePersistedState.hook";

//Context keeping track of order related states to be used by other components
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
};

const reducer = (state, action) => {
  switch (action.type) {
    case "begin-order-process": {
      return {
        ...state,
        status: "items-selected",
        error: null,
      };
    }
    case "cancel-order-process": {
      return {
        ...initialState,
      };
    }
    case "order-processing": {
      return {
        ...state,
        status: "awaiting-response",
      };
    }
    case "order-failure": {
      return {
        ...state,
        status: "error",
        error: action.error,
      };
    }
    case "order-success": {
      return {
        ...state,
        status: "purchased",
      };
    }
    case "after-purchase-reset": {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
};

export const OrderContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //keep track of items in cart during the current session before purchase
  //stored in session storage
  //has shape [{_id, name, price, quantity, subtotal, imageSrc}]
  const [selectedItems, setSelectedItems] = usePersistedState(
    [],
    "current-cart"
  );

  //state to indicate whether to display CartModal or not
  const [displayModal, setDisplayModal] = useState(false);

  //keep lastOrderId in session storage to fetch for the Confirmation page
  const [lastOrderId, setLastOrderId] = usePersistedState(
    null,
    "last-order-id"
  );

  const beginOrderProcess = () => {
    dispatch({
      type: "begin-order-process",
    });
  };

  const cancelOrderProcess = () => {
    dispatch({
      type: "cancel-order-process",
    });
  };

  const orderRequested = () => {
    dispatch({
      type: "order-processing",
    });
  };

  const orderFailure = (errorMessage) => {
    dispatch({
      type: "order-failure",
      error: errorMessage,
    });
  };

  const orderSuccess = () => {
    dispatch({
      type: "order-success",
    });
    //empty the cart
    setSelectedItems([]);
  };

  const afterPurchaseReset = () => {
    dispatch({
      type: "after-purchase-reset",
    });
  };

  return (
    <OrderContext.Provider
      value={{
        state,
        actions: {
          beginOrderProcess,
          cancelOrderProcess,
          orderRequested,
          orderFailure,
          orderSuccess,
          afterPurchaseReset,
        },
        selectedItems,
        setSelectedItems,
        displayModal,
        setDisplayModal,
        lastOrderId,
        setLastOrderId,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
