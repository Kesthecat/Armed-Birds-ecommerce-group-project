import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Errorpage from "./Errorpage";
import PageWrapper from "./PageWrapper";
import ProductPreview from "./ShopPage/ProductPreview";

// LandingPage (home) page
const LandingPage = () => {
  //this should be in the database but for MVP, it's just a simple array here for now
  const testimonies = [
    { _id: 1, customer: "Big Bird", message: "I love my product!" },
    { _id: 2, customer: "Pingu", message: "Noot noot!" },
    { _id: 3, customer: "Riley", message: "Wonderful website!" },
    {
      _id: 4,
      customer: "Dipti",
      message:
        "I love how the filter works, it makes my shopping experience soo easy!",
    },
    {
      _id: 5,
      customer: "Jase",
      message: "The team behind this company is just the best!",
    },
  ];

  //making an array containing 3 feature items that are randomly chosen from the items in database
  const [featureItemsStatus, setFeatureItemsStatus] = useState("loading"); //idle, fetch-erro
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
        // console.log("fetch items list", data.data);
        setFeatureItems(data.data);
        setFeatureItemsStatus("idle");
      })
      .catch((error) => {
        setFeatureItemsStatus("fetch-error");
      });
  }, []);

  //   console.log("feature items", featureItems);

  if (featureItemsStatus === "loading") return <div>Loading</div>;
  if (featureItemsStatus === "fetch-error") return <Errorpage />;

  return (
    <PageWrapper>
      <IntroBanner>
        <TextWrapper>
          <h1>Armed Birds</h1>
          <h2>Birds of a feather, serving birds with difference since 2022.</h2>
          <h3>
            As not all birds have grown arms yet, we also carry products that
            can be worn in other parts of the body.
          </h3>
          <h3>Simply use the filter to shop by body parts.</h3>
        </TextWrapper>
      </IntroBanner>
      <Featuring>
        {featureItems.map((item) => {
          return (
            <NavLink to={`/shop/${item._id}`} key={item._id}>
              <ProductPreview
                imageSrc={item.imageSrc}
                name={item.name}
                price={item.price}
              />
            </NavLink>
          );
        })}
      </Featuring>
      <Testimonies>
        <h2>Here are what some happy Birds have to say: </h2>
        <TestimoniesWrapper>
          {testimonies.map((testimony) => {
            return (
              <TestimonyWrapper>
                <Customer>{testimony.customer} :</Customer>
                <Message>{testimony.message}</Message>
              </TestimonyWrapper>
            );
          })}
        </TestimoniesWrapper>
      </Testimonies>
    </PageWrapper>
  );
};

const IntroBanner = styled.div`
  background-image: url(../banner.jpg);
  width: 100vw;
  height: 425px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TextWrapper = styled.div`
  /* wonder how to made the background color only lower opacity */
  background-color: var(--color-secondary);
  width: 75vw;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 20px;
  border-radius: 5px;
`;
const Featuring = styled.div`
  width: 75vw;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: 40px;
  column-gap: 40px;
  padding: 50px 0;
`;
const Testimonies = styled.div``;
const TestimoniesWrapper = styled.div`
  width: 75vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: 25px;
  padding: 50px 0;
`;
const TestimonyWrapper = styled.div`
  max-height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 15px;
  width: 70vw;
  /* background-color: var(--color-secondary);
  border-radius: 5px; */
  border-top: 2px solid var(--color-secondary);
`;
const Customer = styled.p`
  font-size: 30px;
  font-weight: bold;
  padding-bottom: 10px;
`;
const Message = styled.p`
  font-size: 30px;
`;

export default LandingPage;
