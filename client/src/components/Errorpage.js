import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import "./Errorpage.css";

//404 Error Page
const Errorpage = () => {
  return (
    <Container>
      <div class="center">
        <div class="error">
          <div class="number">4</div>
          <div class="illustration">
            <div class="circle"></div>
            <div class="clip">
              <div class="paper">
                <div class="face">
                  <div class="eyes">
                    <div class="eye eye-left"></div>
                    <div class="eye eye-right"></div>
                  </div>
                  <div class="rosyCheeks rosyCheeks-left"></div>
                  <div class="rosyCheeks rosyCheeks-right"></div>
                  <div class="mouth"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="number">4</div>
        </div>

        <div class="text">Oops. The page you're looking for doesn't exist.</div>
        <NavLink to="/" class="button">
          Back Home
        </NavLink>
      </div>
    </Container>
  );
};

export default Errorpage;

const Container = styled.div`
  padding-top: 40px;
  margin: 0;
  font-size: 62.5%;
  font-family: "Lato", sans-serif;
  font-size: 1.5rem;
  color: #293b49;

  .button {
    border-radius: 5px;
    font-family: var(--font-heading);
  }
`;

const Center = styled.div`
`;

const Error = styled.div`
`;

const Number = styled.div`
`;

const Illustartion = styled.div`
`;

const Circle = styled.div`
`;

const Clip = styled.div`
`;

const Paper = styled.div`
`;

const Face = styled.div`
`;

const Eyes = styled.div`
`;

const Eyeleft = styled.div`
`;

const Eyeright = styled.div`
`;
