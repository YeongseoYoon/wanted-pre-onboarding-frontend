import useAxios from "./useAxios";

export const useDeleteToDo = () => {
  const [request, { response, error }] = useAxios<null, null>();

  const handleDeleteToDo = async (id: number) => {
    const confirm = window.confirm("삭제하시겠어요?");

    if (confirm) {
      try {
        request("delete", `todos/${id}`);
        alert("삭제되었습니다");
      } catch (error) {
        alert(error);
      }
    }
  };
  return { handleDeleteToDo };
};

export default useDeleteToDo;
