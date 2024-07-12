import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { UserRequest } from "../api/tokenApi";
import WaitingPopUp from "../components/PopUp/WaitingPopUp";
import { Navigate } from "react-router-dom";
import WebFont from "webfontloader";
import styled from "styled-components";
import InformationBar from "@/features/InformationBar/Index";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 22fr;
`;

export default function UserLayout() {
  const userRequest = UserRequest();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins"],
      },
    });
  }, []);

  if (userRequest.isLoading) {
    return <WaitingPopUp />;
  }

  if (userRequest.isError) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <Container>
      <InformationBar />
      <Outlet />
    </Container>
  );
}
