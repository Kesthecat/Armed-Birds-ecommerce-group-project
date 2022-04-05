import React from "react";
import styled from "styled-components";

const CompanyPost = ({ name, url, country }) => {
  return (
    <Wrapper>
      <Info>
        <Name>{name}</Name>
        <div><a href={url} target="_blank">{url}</a></div>
        <Country>{country}</Country>
      </Info>
    </Wrapper>
  );
};

export default CompanyPost;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  width: 300px;
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
    font-family: var(--font-body);
  }

  * {
    margin: 5px;
  }
`;

const Country = styled.p`
    font-family: var(--font-subheading);
`;

const Name = styled.h2`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  line-height: 1.3;
`;
