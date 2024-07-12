import styled from "styled-components";
import { UserRequest } from "@/shared/api/tokenApi";
import { CiSettings } from "react-icons/ci";
import Avatar from "react-avatar";
import { useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { useEffect } from "react";
import { useRef } from "react";
import InformationPopUp from "./components/InformationPopUp";

const Container = styled.div`
  height: 100vh;
  background-color: #7491dd;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 0;
`;

const CiSettingsStyled = styled(CiSettings)`
  width: 3rem;
  height: 3rem;
  color: white;
  cursor: pointer;
`;

const StyledAvatar = styled(Avatar)`
  font-size: 10px;
  cursor: pointer;
  outline-offset: 2px;
  outline: 1px solid white;
`;

const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 5px 0;
`;

const CollapseSetting = styled.div`
  background-color: white;
  position: absolute;
  bottom: 0;
  transform: translate(5px, -80px);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  > button {
    width: 10rem;
    padding: 5px 10px;
    background-color: white;
    border: none;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    &:hover {
      background-color: #e2e3e7;
    }
  }

  > button:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  > button:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
`;

const StyledIoLogOutOutline = styled(IoLogOutOutline)`
  display: inline;
`;

export default function InformationBar() {
  const userRequest = UserRequest();
  const collapseRef = useRef();
  const [showSetting, setShowSetting] = useState(false);
  const [showInformation, setShowInformation] = useState(false);

  useEffect(() => {
    document.body.addEventListener("mousedown", (ev) => {
      const collapsedButton = document.querySelector(".collapsed-button");
      if (
        collapseRef.current &&
        !collapseRef.current.contains(ev.target) &&
        !collapsedButton.contains(ev.target)
      ) {
        setShowSetting(false);
      }
    });
  }, []);

  const onLogOut = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    sessionStorage.removeItem("ACCESS_TOKEN");
    userRequest.refetch();
  };

  const onClickShowInformation = () => {
    setShowSetting(false);
    setShowInformation(true);
  };

  return (
    <Container>
      <ItemContainer>
        <StyledAvatar
          src={import.meta.env.VITE_API_IMAGE_PATH + userRequest.data.data.image}
          name={userRequest.data.data.email}
          size="50"
          round="50px"
        />
      </ItemContainer>
      <ItemContainer className="collapsed-button">
        <CiSettingsStyled onClick={() => setShowSetting((prev) => !prev)} />
      </ItemContainer>
      {showSetting && (
        <CollapseSetting ref={collapseRef}>
          <button onClick={onClickShowInformation}>
            <CiSettings /> Information
          </button>
          <button onClick={onLogOut}>
            <StyledIoLogOutOutline /> Log Out
          </button>
        </CollapseSetting>
      )}
      {showInformation && <InformationPopUp action={() => setShowInformation(false)} />}
    </Container>
  );
}
