import useCreateToDo from "../../hooks/useCreateTodo";
import useInput from "../../hooks/useInput";

function ToDo() {
  const { value: todo, setValue: setTodo } = useInput({
    regex: /^.{8,}$/,
    initialValue: "",
  });
  const handleCreateToDo = useCreateToDo();

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
      {/*
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                  const updatedTodos = [...todos];
                  updatedTodos[index].completed =
                    !updatedTodos[index].completed;
                  setTodos(updatedTodos);
                }}
              />
              <span>{todo.text}</span>
            </label>
          </li>
        ))}
      </ul>*/}
    </>
  );
}
export default ToDo;
