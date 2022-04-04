import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <h3>Welcoming birds of all shape.</h3>
      <h3>
        Contact:{" "}
        <Styleda href="mailto: armedbirds@birds.com">
          armedbirds@birds.com
        </Styleda>{" "}
      </h3>
      <h3>©️ 2022</h3>
    </Container>
  );
};

const Container = styled.div`
  height: 80px;
  /* width: 99vw; */
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: var(--color-main);
  padding: 0 100px;
  color: white;
`;

const Styleda = styled.a`
  color: var(--color-secondary);
`;

export default Footer;
