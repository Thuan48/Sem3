import axiosClient from "@/shared/api/axiosClient";
import { useMutation } from "@tanstack/react-query";

const register = async (payload) => {
  const response = await axiosClient.post("account", payload);

  return response.data;
};

export const RegisterRequest = (onSuccess) => {
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: onSuccess,
  });

  return mutation;
};
