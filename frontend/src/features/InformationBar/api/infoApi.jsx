import axiosClient from "@/shared/api/axiosClient";
import { useMutation } from "@tanstack/react-query";

const uploadAvatar = async (payload) => {
  const response = await axiosClient.put("account/avatar", payload);
  return response.data;
};

export const UploadImageRequest = () => {
  const mutation = useMutation({
    mutationFn: uploadAvatar,
  });

  return mutation;
};
