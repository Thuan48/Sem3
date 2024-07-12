import axiosClient from "@/shared/api/axiosClient";
import { useMutation } from "@tanstack/react-query";

const login = async (payload) => {
  const response = await axiosClient.post("auth", payload);
  return response.data;
};

export const UserLoginRequest = (onSuccess) => {
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: onSuccess,
  });

  return mutation;
};

const sendEmailConfirm = async () => {
  const response = await axiosClient.put("auth");
  return response.data;
};

export const SendEmailConfirmRequest = (onSuccess, onError) => {
  const mutation = useMutation({
    mutationFn: sendEmailConfirm,
    onSuccess: onSuccess,
    onError: onError,
  });

  return mutation;
};
