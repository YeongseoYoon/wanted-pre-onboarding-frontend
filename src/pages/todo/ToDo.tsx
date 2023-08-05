import { useEffect } from "react";
import useCreateToDo from "../../hooks/useCreateToDo";
import useGetToDo from "../../hooks/useGetToDo";
import useInput from "../../hooks/useInput";
import useDeleteToDo from "../../hooks/useDeleteToDo";

function ToDo() {
  const { value: todo, setValue: setTodo } = useInput({
    regex: /^.{8,}$/,
    initialValue: "",
  });
  const handleCreateToDo = useCreateToDo();
  const { handleGetToDo, todos } = useGetToDo();
  const { handleDeleteToDo } = useDeleteToDo();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleCreateToDo({ todo });
  };

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
          <li
            key={`${todo.id}-${todo.todo}`}
            className="flex flex-row items-center justify-start my-1"
          >
            <label>
              <input type="checkbox" checked={todo.isCompleted} />
              <span>{todo.todo}</span>
            </label>
            <div className="flex gap-1 ml-2">
              <button
                data-testid="modify-button"
                className="p-1 text-white rounded-md bg-zinc-500 hover:bg-zinc-300 active:bg-blue-600"
              >
                수정
              </button>
              <button
                data-testid="delete-button"
                onClick={() => handleDeleteToDo(todo.id)}
                className="p-1 text-white rounded-md bg-zinc-500 hover:bg-zinc-300 active:bg-blue-600"
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
export default ToDo;
