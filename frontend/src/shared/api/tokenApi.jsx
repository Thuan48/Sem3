import axiosClient from "./axiosClient";
import { useQuery } from "@tanstack/react-query";

const user = async () => {
  const response = await axiosClient.get("auth");
  return response.data;
};

export const UserRequest = () => {
  const request = useQuery({
    queryKey: ["user"],
    queryFn: user,
    retry: 0,
  });

  return request;
};
