import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import "./Errorpage.css";

const Errorpage = () => {
  return (
    <Container>
      {/* <h1>Ooops... 404</h1> */}
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
  /* height: 100%; */
  margin: 0;
  font-size: 62.5%;
  font-family: "Lato", sans-serif;
  font-size: 1.5rem;
  color: #293b49;
`;

const Center = styled.div`
  /* height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column; */
`;

const Error = styled.div`
  /* display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center; */
`;

const Number = styled.div`
  /* font-weight: 900;
  font-size: 15rem;
  line-height: 1; */
`;

const Illustartion = styled.div`
  /* position: relative;
  width: 12.2rem;
  margin: 0 2.1rem; */
`;

const Circle = styled.div`
  /* position: absolute;
  bottom: 0;
  left: 0;
  width: 12.2rem;
  height: 11.4rem;
  border-radius: 50%;
  background-color: #293b49; */
`;

const Clip = styled.div`
  /* position: absolute;
  bottom: 0.3rem;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  width: 12.5rem;
  height: 13rem;
  border-radius: 0 0 50% 50%; */
`;

const Paper = styled.div`
  /* position: absolute;
  bottom: -0.3rem;
  left: 50%;
  transform: translateX(-50%);
  width: 9.2rem;
  height: 12.4rem;
  border: 0.3rem solid #293b49;
  background-color: white;
  border-radius: 0.8rem;

  ::before {
    content: "";
    position: absolute;
    top: -0.7rem;
    right: -0.7rem;
    width: 1.4rem;
    height: 1rem;
    background-color: white;
    border-bottom: 0.3rem solid #293b49;
    transform: rotate(45deg);
  } */
`;

const Face = styled.div`
  /* position: relative;
  margin-top: 2.3rem; */
`;

const Eyes = styled.div`
  /* position: absolute;
  top: 0;
  left: 2.4rem;
  width: 4.6rem;
  height: 0.8rem; */
`;

const Eyeleft = styled.div`
  /* left: 0; */
`;

const Eyeright = styled.div`
  /* right: 0; */
`;
