import styled from "styled-components";
import { useState } from "react";
import SideBar from "./components/SideBar";
import PopUp from "@/shared/components/PopUp/PopUp";
import Chat from "./components/Chat";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useEffect } from "react";
import { UserRequest } from "@/shared/api/tokenApi";
import { useRef } from "react";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
`;

export default function ChatPage() {
  const [roomId, setRoomId] = useState();
  const [connection, setConnection] = useState(null);
  const [chatRooms, setChatRooms] = useState();
  const [messages, setMessages] = useState();
  const roomRef = useRef(0);

  const userRequest = UserRequest();

  useEffect(() => {
    const startConnection = async () => {
      const conn = new HubConnectionBuilder()
        .withUrl("https://localhost:7276/chat")
        .configureLogging(LogLevel.Information)
        .build();

      try {
        await conn.start();

        conn.on("sendall", (user, msg) => {
          console.log(user, msg);
        });

        conn.on("ReceiveMessage", (id, email, msg, img) => {
          if (roomRef.current == id && userRequest.data.data.email != email) {
            setMessages((prev) => [
              {
                email: email,
                image: img,
                message: msg,
                createdAt: Date.now(),
              },
              ...prev,
            ]);
          }

          setChatRooms((prev) => {
            const chatRoom = prev.find((room) => room.roomId == id);
            if (email == userRequest.data.data.email) {
              chatRoom.lastMsg = "You: " + msg;
            } else {
              chatRoom.lastMsg = msg;
            }

            return [...prev];
          });
        });

        setConnection(conn);
      } catch (error) {
        console.error("some thing went wrong");
      }
    };

    startConnection();

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, []);

  return (
    <Container>
      <SideBar
        roomRef={roomRef}
        chatRooms={chatRooms}
        setChatRooms={setChatRooms}
        connection={connection}
        setRoomId={setRoomId}
      />
      <Chat
        connection={connection}
        roomId={roomId}
        chatRooms={chatRooms}
        setChatRooms={setChatRooms}
        messages={messages}
        setMessages={setMessages}
      />
    </Container>
  );
}
