import React, { useEffect, useState, useContext } from "react";
import CompanyPost from "./CompanyPost";
import styled from "styled-components";
import PageWrapper from "../PageWrapper";
import { CompaniesContext } from "./CompaniesContext";

//Listing of all the brands in the shop
const CompanyListing = () => {
  
  const { state: { companiesStatus, companies } } = useContext(CompaniesContext);

  return (
    <PageWrapper>
      <PageTitle>BRANDS</PageTitle>
      <Wrapper>
      {companiesStatus === "idle" && (
        <>
          {companies.map((list) => {
            return (
              <CompanyPost
                key={list._id}
                name={list.name}
                url={list.url}
                country={list.country}
              />
            );
          })}
        </>
      )}
      </Wrapper>
    </PageWrapper>
  );
};

export default CompanyListing;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: 30px;
  column-gap: 30px;
  padding: 50px;
`;

const PageTitle = styled.h1`
  font-size: 64px;
  letter-spacing: 20px;
  font-weight: bold;
  margin: 20px;
`;
