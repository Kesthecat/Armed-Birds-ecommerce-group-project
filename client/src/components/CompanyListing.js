import React, { useEffect, useState } from "react";
import CompanyPost from "./CompanyPost";
import styled from "styled-components";

const CompanyListing = () => {
  const [companyList, setCompanyList] = useState(null);

  useEffect(() => {
    fetch("/get-companies")
      .then((res) => {
        console.log("res", res);
        return res.json();
      })
      .then((data) => {
        // console.log("DATA", data);
        setCompanyList(data.data);
        console.log("Company List", data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }, []);

  return (
    <Wrapper>
      <PageTitle>Company List</PageTitle>
      {companyList && (
        <>
          {companyList.map((list) => {
            return (
              <CompanyPost
                key={list._1d}
                name={list.name}
                url={list.url}
                country={list.country}
              />
            );
          })}
        </>
      )}
    </Wrapper>
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
