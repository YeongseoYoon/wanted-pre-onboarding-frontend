import { UpdateToDoRequest, UpdateToDoResponse } from "../types/todo";
import useAxios from "./useAxios";

export const useUpdateToDo = () => {
  const [request, { response, error }] = useAxios<
    UpdateToDoRequest,
    UpdateToDoResponse
  >();

  const handleUpdateToDo = async (
    id: number,
    todo: string,
    isCompleted: boolean
  ) => {
    const confirm = window.confirm("수정하시겠어요?");

    if (confirm) {
      try {
        request("put", `todos/${id}`, { todo, isCompleted });
        alert("수정되었습니다");
      } catch (error) {
        alert(error);
      }
    }
  };
  return { handleUpdateToDo };
};

export default useUpdateToDo;
