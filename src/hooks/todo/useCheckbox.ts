import { UpdateToDoRequest, UpdateToDoResponse } from "../../types/todo";
import useAxios from "../useAxios";

export const useCheckbox = () => {
  const [request, { loading, error }] = useAxios<
    UpdateToDoRequest,
    UpdateToDoResponse
  >();

  const handleCheckbox = async (
    id: number,
    todo: string,
    isCompleted: boolean
  ) => {
    try {
      request("put", `todos/${id}`, { todo, isCompleted });
    } catch (error) {
      alert(error);
    }
  };
  return { handleCheckbox, isChecked: !error && !loading };
};

export default useCheckbox;
