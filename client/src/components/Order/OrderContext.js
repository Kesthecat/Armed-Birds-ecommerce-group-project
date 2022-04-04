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
  // itemsPurchased: [], //array of item ids, names, quantities and prices
  //has shape [{_id, name, price, quantity}]
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
      //for CANCEL BUTTON on checkout page
      return {
        ...initialState,
      };
    }
    case "order-processing": {
      return {
        ...state,
        status: "awaiting-response",
        // itemsPurchased: [...action.itemsPurchased],
      };
    }
    case "order-failure": {
      return {
        ...state,
        status: "error",
        // itemsPurchased: [],
        error: action.error,
      };
    }
    case "order-success": {
      return {
        ...state,
        status: "purchased",
        // itemsPurchased: action.selectedItems,
      };
    }
    case "after-purchase-reset": {
      return {
        // ...initialState,
        ...state,
        status: "idle",
        error: null,
      };
    }
    default: {
      return state;
    }
  }
};

export const OrderContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //keep track of user's selected item ids, names, quantity and prices in the current session before purchase
  //stored in session storage
  //has shape [{_id, name, price, quantity, subtotal, imageSrc}]
  const [selectedItems, setSelectedItems] = usePersistedState(
    [],
    "current-cart"
  );

  //state to indicate whether to display Cart Modal or not
  const [displayModal, setDisplayModal] = useState(false);

  //keep lastOrderId in session storage to fetch for the confirmation page
  const [lastOrderId, setLastOrderId] = usePersistedState(
    null,
    "last-order-id"
  );

  // const [itemsPurchased, setItemsPurchased] = usePersistedState(
  //   [],
  //   "items-purchased"
  // );

  // const [itemsPurchased, setItemsPurchased] = useState([]);

  const beginOrderProcess = () => {
    dispatch({
      type: "begin-order-process",
      // selectedItems: selectedItems,
    });
  };

  const cancelOrderProcess = () => {
    // setSelectedItems([]);
    dispatch({
      type: "cancel-order-process",
    });
  };

  const orderRequested = () => {
    // const newArr = [...selectedItems];
    // setItemsPurchased([...selectedItems]);
    dispatch({
      type: "order-processing",
      // itemsPurchased: newArr,
    });
  };

  const orderFailure = (errorMessage) => {
    // setItemsPurchased([]);
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
