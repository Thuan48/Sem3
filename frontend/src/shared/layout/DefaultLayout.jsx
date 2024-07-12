import { Outlet } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect } from "react";

import styled from "styled-components";

const Container = styled.div`
  background-color: #7491dd;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const OutletContainer = styled.div``;

export default function DefaultLayout() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins"],
      },
    });
  }, []);

  return (
    <Container>
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </Container>
  );
}
