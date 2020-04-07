import React from "react";
import { Helmet } from "react-helmet";
import App from "./App";
import styled from "styled-components";
import { Navigation } from "./components";
import { withAuthentication } from "./contexts/Session";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Main = styled.main`
  flex-grow: 9;
`;

const Layout = () => {
  const title = "HouseM8s";
  return (
    <Container>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Navigation />
      <Main>
        <App />
      </Main>
    </Container>
  );
};

export default withAuthentication(Layout);
