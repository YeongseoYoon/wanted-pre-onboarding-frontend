import { useEffect, useState } from "react";
import { GetToDoResponse } from "../../types/todo";
import useAxios from "../useAxios";

export const useGetToDo = () => {
  const [request, { response, error }] = useAxios<null, GetToDoResponse[]>();
  const [todos, setTodos] = useState<GetToDoResponse[]>();
  useEffect(() => {
    handleGetToDo();
  }, []);

  useEffect(() => {
    if (error) {
      alert(error);
    } else {
      setTodos(response?.data);
    }
  }, [response, error]);

  const handleGetToDo = async () => {
    try {
      request("get", "todos");
    } catch (error) {
      alert(error);
    }
  };
  return { handleGetToDo, todos };
};

export default useGetToDo;
