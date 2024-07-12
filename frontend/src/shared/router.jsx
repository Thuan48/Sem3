import { createBrowserRouter } from "react-router-dom";

import UserLayout from "./layout/UserLayout";
import DefaultLayout from "./layout/DefaultLayout";
import SignIn from "@/features/auth/components/SignIn";
import SignUp from "@/features/auth/components/SignUp";
import ChatPage from "@/features/chat-page/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/chat",
    element: <UserLayout />,
    children: [
      {
        path: "",
        element: <ChatPage />,
      },
    ],
  },
]);

export default router;
