import React, { useEffect } from "react";
import styled from "styled-components";
import { ChatRoomRequest } from "../api/chatApi";
import Avatar from "react-avatar";
import { UserRequest } from "@/shared/api/tokenApi";
import { useState } from "react";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import { SearchUserRequest } from "../api/chatApi";
import { IoIosSearch } from "react-icons/io";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 10px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
`;

const ChatRoom = styled.div`
  display: flex;
  gap: 1rem;
  cursor: pointer;
  padding: 10px 0;
`;

const ChatRoomDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > h5 {
    font-size: 14px;
  }

  > p {
    font-size: 13px;
  }
`;

const StyledAvatar = styled(Avatar)`
  font-size: 10px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 3px;
  border-radius: 5px;

  > input {
    border: none;
    outline: none;
  }
`;

const StyledIoIosSearch = styled(IoIosSearch)`
  height: 20px;
  width: 20px;
`;

export default function SideBar({ setRoomId, connection, chatRooms, setChatRooms, roomRef }) {
  const [search, setSearch] = useState();
  const chatRoomRequest = ChatRoomRequest();
  const userRequest = UserRequest();
  const searchUserRequest = SearchUserRequest(search);

  const getLastMessage = (chatroom) => {
    if (chatroom.messages.length > 2) {
      const message = chatroom.messages[chatroom.messages.length - 1];

      if (message.user.email == userRequest.data.data.email) {
        return "You: " + message.message;
      }

      return message.message;
    }

    return null;
  };

  const getFriendInfo = (chatroom) => {
    if (chatroom.messages[0].user.email != userRequest.data.data.email) {
      return chatroom.messages[0].user;
    } else {
      return chatroom.messages[1].user;
    }
  };

  const joinChatRoom = async (email, roomId) => {
    try {
      await connection.invoke("JoinChatRoom", { Email: email, RoomId: roomId.toString() });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (chatRoomRequest.isSuccess && connection != null) {
      const data = chatRoomRequest.data.data;

      for (let room of data) {
        joinChatRoom(userRequest.data.data.email, room.roomId);
      }
    }
  }, [chatRoomRequest.status, connection]);

  useEffect(() => {
    if (chatRoomRequest.isSuccess && chatRoomRequest.fetchStatus == "idle") {
      setChatRooms([]);
      for (let data of chatRoomRequest.data.data) {
        setChatRooms((prev) => [
          ...prev,
          {
            ...data,
            lastMsg: getLastMessage(data),
          },
        ]);
      }
    }
  }, [chatRoomRequest.fetchStatus]);

  return (
    <Container>
      <SearchContainer>
        <StyledIoIosSearch />
        <input placeholder="Search" onChange={(ev) => setSearch(ev.target.value)} />
      </SearchContainer>
      {chatRooms == null && <WaitingPopUp />}
      {chatRoomRequest.isSuccess &&
        chatRooms != null &&
        chatRooms.map((chatroom, index) => {
          const friend = getFriendInfo(chatroom);
          return (
            <ChatRoom
              onClick={() => {
                setRoomId(chatroom.roomId);
                roomRef.current = chatroom.roomId;
              }}
              key={index}
            >
              <StyledAvatar
                src={import.meta.env.VITE_API_IMAGE_PATH + friend.image}
                name={friend.email}
                w
                size="50"
                round="50px"
              />
              <ChatRoomDetail>
                <h5>{friend.email.split("@")[0]}</h5>
                <p>{chatroom.lastMsg}</p>
              </ChatRoomDetail>
            </ChatRoom>
          );
        })}
    </Container>
  );
}
