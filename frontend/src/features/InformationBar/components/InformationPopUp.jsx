import React from "react";
import PopUp from "@/shared/components/PopUp/PopUp";
import styled, { keyframes, css } from "styled-components";
import XButton from "@/shared/components/Button/XButton";
import Avatar from "react-avatar";
import { UserRequest } from "@/shared/api/tokenApi";
import { CiEdit } from "react-icons/ci";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useRef } from "react";
import { useEffect } from "react";
import { UploadImageRequest } from "../api/infoApi";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import "../assets/motion_css.css";

const StyledPopUp = styled(PopUp)`
  padding: 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 1rem;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  > div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 10px solid rgba(0, 0, 0, 0.1);

  > div:nth-of-type(1) {
    height: 13rem;
    position: relative;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  > div:nth-of-type(2) {
    display: flex;
    align-items: center;
    padding: 0 1rem;
    gap: 10px;
    transform: translateY(-25%);
    > h5 {
      font-size: 17px;
      font-weight: 300;
    }
  }
`;
const InfoContainer = styled.div`
  padding: 15px 1rem;
  display: flex;
  flex-direction: column;
  gap: 15px;

  > div {
    display: grid;
    grid-template-columns: 1fr 2.5fr;
    row-gap: 15px;
    font-size: 14px;

    > span:nth-child(odd) {
      color: rgba(0, 0, 0, 0.6);
    }
  }
`;
const BottomContainer = styled.div`
  padding: 10px 1rem;
  display: flex;
  flex-direction: column;
  gap: 20px;

  > div {
    border-top: 1px solid rgba(0, 0, 0, 0.4);
  }

  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    background-color: white;
    border: none;
    padding: 5px;
    border-radius: 5px;
    transition: all 0.1s;

    &:hover {
      background-color: #d9d9d9;
    }
  }
`;

const StyledMdOutlineAddAPhoto = styled(MdOutlineAddAPhoto)`
  position: absolute;
  color: black;
  height: 30px;
  width: 30px;
  z-index: 1;
  transform: translate(3.7rem, 2rem);
  cursor: pointer;
  background-color: #ededed;
  border-radius: 50%;
  padding: 5px;

  &:hover {
    background-color: #d9d9d9;
  }
`;

const StyledAvatar = styled(Avatar)`
  outline-offset: 5px;
  outline: 1px solid white;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.$showUpdate == true ? "0fr 1fr" : "1fr 0fr")};
  transition: grid-template-columns 0.15s ease-in-out;
`;

const GridItem = styled.div`
  overflow: hidden;
`;

const ShowContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
`;

const StyledMdOutlineKeyboardArrowLeft = styled(MdOutlineKeyboardArrowLeft)`
  cursor: pointer;
  height: 1.7rem;
  width: 1.7rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }

  border-radius: 50%;
`;

const UpdateContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 25rem;

  > div:nth-of-type(1) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;

    > div {
      display: flex;
      flex-direction: column;
      gap: 10px;
      > h5 {
        font-weight: 500;
      }

      > input {
        width: 100%;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.3);
        height: 2rem;
      }

      > input:focus {
        border: 2px solid #7491dd;
        outline: 0;
      }
    }
  }

  > div:nth-of-type(2) {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    padding: 1rem;

    > button {
      background-color: white;
      border: none;
      padding: 8px;
      border-radius: 5px;
      cursor: pointer;
    }

    > button:nth-of-type(1) {
      background-color: #f2f2f2;
    }

    > button:nth-of-type(1):hover {
      background-color: #e7e7e7;
    }

    > button:nth-of-type(2) {
      background-color: #63ccf2;
    }

    > button:nth-of-type(2):hover {
      background-color: #3a94d5;
    }
  }
`;

const imageLink =
  "https://plus.unsplash.com/premium_photo-1661767490975-f31a02946f48?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function InformationPopUp({ action }) {
  const userRequest = UserRequest();
  const fileRef = useRef();
  const uploadAvatarRequest = UploadImageRequest();
  const queryClient = useQueryClient();
  const [showUpdate, setShowUpdate] = useState(false);

  const [birthDay, setBirthDay] = useState(userRequest.data.data.dob);
  const [phone, setPhone] = useState(userRequest.data.data.phoneNumber);
  const [address, setAddress] = useState(userRequest.data.data.address);
  const [change, setChange] = useState(false);

  const dob = new Date(userRequest.data.data.dob);
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const onClickUploadImage = () => {
    fileRef.current.click();
  };

  useEffect(() => {
    fileRef.current.addEventListener("change", (ev) => {
      if (ev.target.files.length != 0) {
        const formData = new FormData();
        console.log(ev.target.files[0]);
        formData.append("uploadImage", ev.target.files[0]);
        uploadAvatarRequest.mutate(formData, {
          onSuccess: () => {
            queryClient.invalidateQueries("user");
          },
        });
      }
    });
  }, []);

  const onClickSave = () => {
    if (birthDay && phone && address) {
    } else {
      alert("nope");
    }
  };

  return (
    <StyledPopUp action={action}>
      <Container>
        {!showUpdate && (
          <Header>
            <h5>Account Detail</h5> <XButton action={action} />
          </Header>
        )}
        {showUpdate && (
          <Header>
            <div>
              <StyledMdOutlineKeyboardArrowLeft onClick={() => setShowUpdate(false)} />{" "}
              <h5>Update account information</h5>
            </div>
            <XButton action={action} />
          </Header>
        )}
        <GridContainer $showUpdate={showUpdate}>
          <GridItem>
            <ShowContainer>
              <ImageContainer>
                <div>
                  <img src={imageLink} />
                  <StyledMdOutlineAddAPhoto onClick={onClickUploadImage} />
                </div>
                <div>
                  <StyledAvatar
                    src={import.meta.env.VITE_API_IMAGE_PATH + userRequest.data.data.image}
                    name={userRequest.data.data.email}
                    size="75"
                    round="50px"
                  />
                  <h5>{userRequest.data.data.email.split("@")[0]}</h5>
                </div>
              </ImageContainer>
              <InfoContainer>
                <h5>User Information</h5>
                <div>
                  <span>Email</span>
                  <span>{userRequest.data.data.email}</span>
                  <span>Date of Birth</span>
                  <span>{formatter.format(dob)}</span>
                  <span>Phone</span>
                  <span>{userRequest.data.data.phoneNumber}</span>
                </div>
              </InfoContainer>
              <BottomContainer>
                <div></div>
                <button onClick={() => setShowUpdate((prev) => !prev)}>
                  <CiEdit /> Update
                </button>
              </BottomContainer>
              <form>
                <input ref={fileRef} type="file" hidden />
              </form>
            </ShowContainer>
          </GridItem>
          <GridItem>
            <UpdateContainer>
              <div>
                <div>
                  <h5>Date of birth</h5>
                  <input
                    onChange={(ev) => {
                      setBirthDay(ev.target.value);
                      setChange(true);
                    }}
                    type="date"
                    value={new Date(birthDay)}
                  />
                </div>
                <div>
                  <h5>Phone number</h5>
                  <input
                    onChange={(ev) => {
                      setPhone(ev.target.value);
                      setChange(true);
                    }}
                    value={phone}
                  />
                </div>
                <div>
                  <h5>Address</h5>
                  <input
                    onChange={(ev) => {
                      setAddress(ev.target.value);
                      setChange(true);
                    }}
                    value={address}
                  />
                </div>
              </div>
              <div>
                <button onClick={() => setShowUpdate(false)}>Turn back</button>
                <button onClick={onClickSave}>Save Change</button>
              </div>
            </UpdateContainer>
          </GridItem>
        </GridContainer>
      </Container>
    </StyledPopUp>
  );
}
