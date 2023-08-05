import { useState } from "react";
import { UpdateToDoRequest, UpdateToDoResponse } from "../types/todo";
import useAxios from "./useAxios";

export const useCheckbox = () => {
  const [request, { response, error }] = useAxios<
    UpdateToDoRequest,
    UpdateToDoResponse
  >();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckbox = async (
    id: number,
    todo: string,
    isCompleted: boolean
  ) => {
    setIsChecked(isCompleted);
    try {
      request("put", `todos/${id}`, { todo, isCompleted });
    } catch (error) {
      alert(error);
    }
  };
  return { handleCheckbox, isChecked };
};

export default useCheckbox;
