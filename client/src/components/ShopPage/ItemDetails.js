import styled from "styled-components";
import { useContext, useEffect, useReducer, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import PageWrapper from "../PageWrapper";
import { OrderContext } from "../Order/OrderContext";
import Dropdown from "./Dropdown";
import ItemLoader from "./ItemLoader";

//track loading of item details from state

const initialState = {
  itemStatus: "loading", //other statuses: idle, fetch-failed
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

//Item detail page
const ItemDetails = () => {
  //array of selectedItems that is stored in session storage
  //has shape [{_id, name, price, quantity}]
  const { selectedItems, setSelectedItems, setDisplayModal } =
    useContext(OrderContext);

  //state to keep track of quantity selected for purchase
  const [quantity, setQuantity] = useState(0);

  //track state and loading of Item details
  const [state, dispatch] = useReducer(reducer, initialState);

  const [toRender, setToRender] = useState("false");

  const { id } = useParams();

  const history = useHistory();

  const dropdownArray = [];

  //fetch item by id
  useEffect(() => {
    fetch(`/get-item/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 200) {
          history.push("/erropage");
          return;
        }
        dispatch({
          type: "item-loaded-from-server",
          item: data.data,
        });

        //fetch by company id to get name and link
        fetch(`/get-company/${data.data.companyId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            dispatch({
              type: "company-loaded-from-server",
              company: data.data,
            });
            setToRender(true);
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

  //set options for the quantity dropdown
  if (state.itemStatus === "idle") {
    for (let i = 0; i < state.item.numInStock; i++) {
      dropdownArray[i] = i + 1;
    }
  }

  //click function for the BUY button
  const handleClick = () => {
    const priceNum = Number(state.item.price.slice(1));

    //if item is already in cart, then update the quantity instead of adding the same item again
    let index = null;
    const itemInCart = selectedItems.find((item, i) => {
      if (item._id === state.item._id) {
        index = i;
        return item;
      }
    });

    if (itemInCart) {
      itemInCart.quantity = Number(itemInCart.quantity) + Number(quantity);

      let newArr = [...selectedItems];
      newArr[index] = itemInCart;

      setSelectedItems([...newArr]);
    }

    //else if the item is new, add the item object to the cart
    else {
      const currentItem = {
        _id: state.item._id,
        imageSrc: state.item.imageSrc,
        name: state.item.name,
        price: state.item.price,
        quantity: quantity,
        itemTotal: (priceNum * quantity).toFixed(2),
      };
      setSelectedItems([...selectedItems, currentItem]);
    }

    //display the Cart Modal everytime an item is added to the cart
    setDisplayModal(true);

    //redirect to shop page after an item is added to the cart
    history.push("/shop");
  };

  //Loading component while fetches are being done
  if (state.itemStatus === "loading" || state.companyStatus === "loading")
    return <ItemLoader />;

  if (toRender)
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
  padding: 15px;
  border: 3px solid var(--color-secondary);
  border-radius: 5px;
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
  font-weight: 100;
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
