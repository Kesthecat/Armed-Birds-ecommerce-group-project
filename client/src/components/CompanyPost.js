import React from "react";
import styled from "styled-components";

const CompanyPost = ({ name, url, country }) => {
  return (
    <Wrapper>
      <Info>
        <Name>{name}</Name>
        <a href={url}>{url}</a>
        {/* <Website>{url}</Website> */}
        <Country>{country}</Country>
      </Info>
    </Wrapper>
  );
};

export default CompanyPost;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  width: 300px;
  /* height: 400px; */
  background-color: var(--color-background);
  border-radius: 5px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--color-main);

  a {
    text-decoration: none;
  }
`;

const Website = styled.div``;

const Country = styled.div``;

const Name = styled.div`
  font-weight: bold;
  text-align: center;
  margin: 20px 0 0 0;
  line-height: 1.3;
`;
