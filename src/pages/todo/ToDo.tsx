import { useEffect } from "react";

import ToDoItem from "../../components/ToDoItem";
import {
  useInput,
  useGetToDo,
  useCreateToDo,
  useDeleteToDo,
  useUpdateToDo,
  useCheckbox,
} from "../../hooks";

function ToDo() {
  const { value: todo, setValue: setTodo } = useInput({
    regex: /^.{8,}$/,
    initialValue: "",
  });
  const { handleGetToDo, todos } = useGetToDo();
  const { handleCreateToDo, isCreated } = useCreateToDo();
  const { handleDeleteToDo, isDeleted } = useDeleteToDo();
  const { handleUpdateToDo, isUpdated } = useUpdateToDo();
  const { handleCheckbox, isChecked } = useCheckbox();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleCreateToDo({ todo });
  };

  useEffect(() => {
    handleGetToDo();
  }, [isCreated, isDeleted, isUpdated, isChecked]);

  return (
    <>
      <h1 className="text-xl font-bold">Add ToDos!</h1>
      <form
        className="flex items-center justify-center mt-10"
        onSubmit={handleSubmit}
      >
        <input
          placeholder="Todo를 입력하세요."
          required
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          data-testid="new-todo-input"
          className="p-2 mr-2 border border-gray-400 border-solid rounded"
        />
        <button
          data-testid="new-todo-add-button"
          className="p-2 text-white rounded-md bg-zinc-500 hover:bg-zinc-300 active:bg-blue-600"
        >
          추가
        </button>
      </form>
      <ul>
        {todos?.map((todo) => (
          <ToDoItem
            key={`${todo.id}-${todo.todo}`}
            todo={todo}
            handleDeleteToDo={handleDeleteToDo}
            handleUpdateToDo={handleUpdateToDo}
            handleCheckbox={handleCheckbox}
          />
        ))}
      </ul>
    </>
  );
}
export default ToDo;
