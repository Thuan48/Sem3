import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Avatar from "react-avatar";
import { UserRequest } from "@/shared/api/tokenApi";
import { useEffect } from "react";
import { showDate } from "../utils/Date";
import { MessagesRequest } from "../api/chatApi";
import { SaveMessageRequest } from "../api/chatApi";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import WaitingIcon from "@/shared/components/AnimationIcon/WaitingIcon";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: hidden;
  background-color: #f8f8f8; /* Light background for the chat */
  font-family: "Arial", sans-serif; /* Choose a clean font */
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 10vh;
  padding: 15px 20px;
  background-color: #fff; /* White background for the header */
  border-bottom: 1px solid #ddd; /* Subtle border for separation */

  > h5 {
    font-size: 15px;
    font-weight: 600; /* Slightly bolder font for the friend's name */
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
  gap: 2rem;
  padding: 2rem;
  overflow-y: scroll;
  background-color: #f8f8f8; /* Light background for the messages */

  &::-webkit-scrollbar {
    cursor: pointer;
    width: 8px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #0ae;
    border-radius: 10px; /* Rounded scrollbar thumb */

    background-image: -webkit-gradient(
      linear,
      0 0,
      0 100%,
      color-stop(0.5, rgba(255, 255, 255, 0.2)),
      color-stop(0.5, transparent),
      to(transparent)
    );
  }
`;

const Message = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.$own ? "row-reverse" : "row")};
  gap: 1rem;
  align-items: flex-end;

  > p {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 1rem 1.5rem; /* Add some extra padding */
    background-color: ${(props) => (props.$own ? "#0ae" : "#7491dd")}; /* Different colors for own and friend's messages */
    border-radius: 10px; /* Rounded corners for messages */
    color: white;
    min-width: 7rem;
    max-width: 30rem;
    word-break: break-word; /* Allow words to break within the message */

    > span {
      text-align: ${(props) => (props.$own ? "right" : "left")};
    }

    > span:nth-of-type(2) {
      font-size: 10px;
      color: rgba(255, 255, 255, 0.7); /* Slightly lighter color for timestamp */
    }

    > span:nth-of-type(1) {
      font-size: 14px;
    }
  }
`;

const ChatForm = styled.form`
  height: 10vh;
  padding: 15px 20px;
  background-color: #fff; /* White background for the input area */
  border-top: 1px solid #ddd; /* Subtle border for separation */
  display: flex;
  align-items: center; /* Align input and send button vertically */

  > input {
    width: calc(100% - 60px); /* Adjust width for send button */
    height: 6rem;
    border: 0;
    border-radius: 5px; /* Rounded corners for the input */
    padding: 10px;
    font-size: 16px; /* Larger font size for the input */
    margin-right: 10px; /* Space between input and button */
  }

  > input:focus {
    border: 2px solid #0ae; /* Blue border on focus */
    outline: 0;
  }

  > button { /* Style for the send button */
    background-color: #0ae;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
`;

const StyledAvatar = styled(Avatar)`
  font-size: 10px;
`;

export default function Chat({ roomId, connection, messages, setMessages }) {
  const userRequest = UserRequest();
  const [message, setMessage] = useState("");
  const messageRequest = MessagesRequest(roomId);
  const saveMessageRequest = SaveMessageRequest();
  const chatMessageRef = useRef();

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  const getFriendInfo = () => {
    let roomMessages = [];

    for (let item of messageRequest.data.pages) {
      roomMessages = [...roomMessages, ...item.data];
    }

    if (roomMessages[0].user.email != userRequest.data.data.email) {
      return roomMessages[0].user;
    } else {
      return roomMessages[1].user;
    }
  };

  const getMessage = () => {
    let chatMessages = [];

    for (let item of messageRequest.data.pages) {
      chatMessages = [...chatMessages, ...item.data];
    }

    if (chatMessages.length < 2) {
      return null;
    }

    const roomMessage = [];

    for (let item of chatMessages) {
      roomMessage.push({
        email: item.user.email,
        image: item.user.image,
        message: item.message,
        createdAt: item.createdAt,
      });
    }

    roomMessage.pop();
    roomMessage.pop();

    return roomMessage;
  };

  const sendMessage = async (ev) => {
    ev.preventDefault();

    await connection.invoke("SendMessage", {
      Email: userRequest.data.data.email,
      RoomId: roomId.toString(),
      Message: message,
      ImageLink: userRequest.data.data.image,
    });

    setMessages((prev) => [
      {
        email: userRequest.data.data.email,
        image: userRequest.data.data.image,
        message: message,
        createdAt: Date.now(),
      },
      ...prev,
    ]);

    const formData = new FormData();

    formData.append("roomId", roomId);
    formData.append("message", message);

    saveMessageRequest.mutate(formData);

    setMessage("");

    chatMessageRef.current.scrollTo(0, chatMessageRef.scrollHeight);
  };

  useEffect(() => {
    if (messageRequest.isSuccess) {
      setMessages(getMessage(roomId));
    }
  }, [messageRequest.fetchStatus]);

  useEffect(() => {
    if (inView) {
      if (messageRequest.hasNextPage) {
        messageRequest.fetchNextPage();
      }
    }
  }, [entry]);

  if (roomId == null) {
    return <p>....</p>;
  }

  if (messageRequest.isSuccess) {
    const friend = getFriendInfo();

    return (
      <Container>
        <Header>
          <StyledAvatar
            src={import.meta.env.VITE_API_IMAGE_PATH + friend.image}
            name={friend.email}
            size="50"
            round="50px"
          />
          <h5>{friend.email}</h5>
        </Header>
        <ChatMessages ref={chatMessageRef}>
          {messages != null &&
            messages.map((message, index) => {
              return (
                <Message $own={message.email == userRequest.data.data.email} key={index}>
                  <StyledAvatar
                    src={import.meta.env.VITE_API_IMAGE_PATH + message.image}
                    name={message.email}
                    size="35"
                    round="50px"
                  />
                  <p>
                    <span>{message.message}</span>
                    <span>{showDate(message.createdAt)}</span>
                  </p>
                </Message>
              );
            })}

          {messageRequest.isFetchingNextPage && <WaitingIcon />}
          <div ref={ref}></div>
        </ChatMessages>
        <ChatForm onSubmit={(ev) => sendMessage(ev)}>
          <input value={message} onChange={(ev) => setMessage(ev.target.value)} placeholder="Type your message..." />
          <button type="submit">Send</button> {/* Send button */}
        </ChatForm>
      </Container>
    );
  }
}