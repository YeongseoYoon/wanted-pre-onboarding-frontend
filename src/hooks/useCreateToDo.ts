import { useEffect } from "react";
import { CreateToDoRequest, CreateToDoResponse } from "../types/todo";
import useAxios from "./useAxios";

export const useCreateToDo = () => {
  const [request, { loading, error }] = useAxios<
    CreateToDoRequest,
    CreateToDoResponse
  >();

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);
  const handleCreateToDo = async ({ todo }: CreateToDoRequest) => {
    try {
      request("post", "todos", { todo });
    } catch (error) {
      alert(error);
    }
  };
  return { handleCreateToDo, isCreated: !error && !loading };
};

export default useCreateToDo;
