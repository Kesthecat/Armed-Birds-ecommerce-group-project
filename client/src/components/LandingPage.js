import { useState } from "react";
import { useEffect, useReducer } from "react";
import { MdPendingActions } from "react-icons/md";
import styled from "styled-components";

// LandingPage (home) page
const LandingPage = () => {
  //itemsList loading status
  const [itemsListStatus, setItemsListStatus] = useState("loading"); //idle and error

  //making an array containing 3 feature items that are randomly chosen from the items in database
  const [featureItemsStatus, setFeatureItemsStatus] = useState("loading"); //idle

  const [featureItems, setFeatureItems] = useState([]);

  useEffect(() => {
    fetch("/get-featured-items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("fetch items list", data.data);
        setFeatureItems(data.data);
        setFeatureItemsStatus("idle");
      })
      .catch((error) => {
        setItemsListStatus(error);
      });
  }, []);

  console.log("feature items", featureItems);

  if (featureItemsStatus === "loading") return <div>Loading</div>;

  return (
    <>
      <Intro>
        <h1>Armed Birds</h1>
        <h2>Birds of a feather, serving birds with difference since 2022.</h2>
        <h3>
          As not all birds have grown arms yet, we also carry products that can
          be worn in other parts of the body.
        </h3>
        <h3>Simply use the filter to shop by body parts.</h3>
      </Intro>
    </>
  );
};

const Intro = styled.div``;
export default LandingPage;
