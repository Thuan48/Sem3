import axiosClient from "@/shared/api/axiosClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";

const getChatRoom = async () => {
  const response = await axiosClient.get("chat/chatroom");

  return response.data;
};

export const ChatRoomRequest = () => {
  const query = useQuery({
    queryKey: ["chatroom"],
    queryFn: getChatRoom,
    refetchOnWindowFocus: false,
  });

  return query;
};

const getMessages = async (roomId, pageParam) => {
  const response = await axiosClient.get("chat/" + roomId, {
    params: {
      pageNumber: pageParam,
    },
  });
  return response.data;
};

export const MessagesRequest = (roomId) => {
  const query = useInfiniteQuery({
    queryKey: ["messages", roomId],
    queryFn: ({ pageParam = 1 }) => {
      return getMessages(roomId, pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNext == true) {
        return lastPage.currentPage + 1;
      } else {
        return null;
      }
    },
    refetchOnWindowFocus: false,
  });

  return query;
};

const saveMessage = async (payload) => {
  const response = await axiosClient.post("chat/saveMessage", payload);
  return response.data;
};

export const SaveMessageRequest = (onSuccess, onError) => {
  const mutation = useMutation({
    mutationFn: saveMessage,
    onSuccess: onSuccess,
    onError: onError,
  });

  return mutation;
};

const searchUser = async (search) => {
  const response = await axiosClient.get("api/chat/search", { params: { name: search } });
  return response.data;
};

export const SearchUserRequest = (search) => {
  const query = useQuery({
    queryKey: ["search-user", search],
    queryFn: () => searchUser(search),
    enabled: false,
  });

  return query;
};
