import styled from "styled-components";
import { useContext, useEffect, useReducer, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import PageWrapper from "./PageWrapper";
import { ProductsContext } from "./ShopPage/ProductsContext";
import { OrderContext } from "./Order/OrderContext";
import Dropdown from "./ShopPage/Dropdown";

const initialState = {
  itemStatus: "loading", //idle, fetch-failed
  companyStatus: "loading",
  company: null,
  item: null,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "item-loaded-from-server": {
      return {
        ...state,
        itemStatus: "idle",
        item: action.item,
      };
    }
    case "error-fetching-item-from-server": {
      return {
        ...state,
        itemStatus: "fetch-failed",
        error: action.error,
      };
    }
    case "company-loaded-from-server": {
      return {
        ...state,
        companyStatus: "idle",
        company: action.company,
      };
    }
    case "error-fetching-company-from-server": {
      return {
        ...state,
        companyStatus: "fetch-failed",
        error: action.error,
      };
    }
  }
};

//item detail page
const ItemDetails = () => {
  //array of selectedItems that is stored in session storage
  //has shape [{_id, name, price, quantity}]
  const { selectedItems, setSelectedItems, setDisplayModal } =
    useContext(OrderContext);

  //state to keep track of quantity selected for purchase
  const [quantity, setQuantity] = useState(0);

  //state and loading of item details
  const [state, dispatch] = useReducer(reducer, initialState);

  const { id } = useParams();

  const history = useHistory();

  const dropdownArray = [];

  useEffect(() => {
    fetch(`/get-item/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("fetch item data", data, data.data);
        dispatch({
          type: "item-loaded-from-server",
          item: data.data,
        });
        //FETCH BY COMPANY ID TO GET COMPANY NAME AND LINK
        fetch(`/get-company/${data.data.companyId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("fetch campany data", data, data.name);
            dispatch({
              type: "company-loaded-from-server",
              company: data.data,
            });
          })
          .catch((error) => {
            dispatch({
              type: "error-fetching-company-from-server",
              error: error,
            });
          });
      })
      .catch((error) => {
        dispatch({
          type: "error-fetching-item-from-server",
          error: error,
        });
      });
  }, []);

  if (state.itemStatus === "idle") {
    console.log("state.item.numInStock", state.item.numInStock);
    for (let i = 0; i < state.item.numInStock; i++) {
      dropdownArray[i] = i + 1;
    }
  }

  //click function for the BUY button
  const handleClick = () => {
    const priceNum = Number(state.item.price.slice(1));

    //if item is already in cart, then add new quantity

    const currentItem = {
      _id: state.item._id,
      name: state.item.name,
      price: state.item.price,
      quantity: quantity,
      itemTotal: (priceNum * quantity).toFixed(2),
    };
    setSelectedItems([...selectedItems, currentItem]);

    //display modal
    setDisplayModal(true);
    //history.push to shop page
    history.push("/shop");
  };

  // will be replace with the loading component
  if (state.itemStatus === "loading" || state.companyStatus === "loading")
    return <div>....LOADING.....</div>;

  return (
    <PageWrapper>
      <BackLink>
        <NavLink to="/shop">BACK TO SHOP</NavLink>
      </BackLink>

      {state.itemStatus === "idle" && state.companyStatus === "idle" && (
        <ProductCard>
          <ImgDiv>
            <img src={state.item.imageSrc} width="350px" />
          </ImgDiv>
          <InfoDiv>
            <ProductName>{state.item.name}</ProductName>
            <Company>
              Sold by:{" "}
              <StyledATag href={state.company.url} target="_blank">
                {state.company.name}
              </StyledATag>
            </Company>
            <Price>{state.item.price}</Price>
            <Description>
              Wear it on your{" "}
              <span>{state.item.body_location.toLowerCase()}</span>!
            </Description>

            <Dropdown
              array={dropdownArray}
              label="Quantity"
              stateSetter={setQuantity}
            />
            <InStock>
              {state.item.numInStock > 0 ? "In Stock" : "Out of Stock"}
            </InStock>
            <BuyButton
              onClick={handleClick}
              disabled={state.item.numInStock === 0 || quantity < 1}
            >
              BUY
            </BuyButton>
          </InfoDiv>
        </ProductCard>
      )}
    </PageWrapper>
  );
};

const BackLink = styled.div`
  text-align: left;
  text-decoration: none;
  font-family: var(--font-heading);
  margin-left: 150px;
  width: 100%;
`;
const ProductCard = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 50px;
  width: 75vw;
`;

const ImgDiv = styled.div`
  margin: 0 auto;
`;

const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;

  div * {
    margin: 10px 0;
  }
`;

const ProductName = styled.h2`
  margin: 10px 0;
`;

const Company = styled.h3`
  margin: 10px 0;
`;

const StyledATag = styled.a`
  color: var(--color-main);
`;

const Price = styled.h4`
  margin: 10px 0;
`;

const Description = styled.p`
  margin: 10px 0;
  span {
    font-style: italic;
  }
`;

const InStock = styled.p`
  margin: 10px 0;
`;

const BuyButton = styled.button`
  margin: 10px 0;
  padding: 15px;
  width: 200px;
  font-size: 25px;
  font-family: var(--font-heading);
  border-radius: 5px;
  background-color: ${(props) => (props.disabled ? "#d3d3d3" : "#50479A")};
`;

export default ItemDetails;
