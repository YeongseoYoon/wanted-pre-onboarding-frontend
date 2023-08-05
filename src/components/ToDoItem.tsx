import { useState } from "react";
import { ToDoResponse } from "../types/todo";

interface ToDoItemProps {
  todo: ToDoResponse;
  handleDeleteToDo: (id: number) => Promise<void>;
  handleUpdateToDo: (
    id: number,
    todo: string,
    isCompleted: boolean
  ) => Promise<void>;
  handleCheckbox: (
    id: number,
    todo: string,
    isCompleted: boolean
  ) => Promise<void>;
}
const ToDoItem = ({
  todo,
  handleDeleteToDo,
  handleUpdateToDo,
  handleCheckbox,
}: ToDoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState(todo.todo);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedTodo(todo.todo);
  };

  const handleUpdateClick = () => {
    handleUpdateToDo(todo.id, updatedTodo, todo.isCompleted);
    setIsEditing(false);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    handleCheckbox(todo.id, todo.todo, checked);
  };

  return (
    <li className="flex flex-row items-center justify-start my-1">
      {isEditing ? (
        <div>
          <input
            type="checkbox"
            checked={todo.isCompleted}
            className="mr-1"
            onChange={handleCheckboxChange}
          />
          <input
            data-testid="modify-input"
            value={updatedTodo}
            onChange={(event) => setUpdatedTodo(event.target.value)}
            className="p-2 mr-2 border border-gray-400 border-solid rounded"
          />
          <button
            data-testid="submit-button"
            onClick={handleUpdateClick}
            className="p-1 text-white rounded-md bg-zinc-500 hover:bg-zinc-300 active:bg-blue-600"
          >
            제출
          </button>
          <button
            data-testid="cancel-button"
            onClick={handleCancelClick}
            className="p-1 text-white rounded-md bg-zinc-500 hover:bg-zinc-300 active:bg-blue-600"
          >
            취소
          </button>
        </div>
      ) : (
        <>
          <label>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              className="mr-1"
              onChange={handleCheckboxChange}
            />
            <span
              className={todo.isCompleted ? "line-through text-gray-300" : ""}
            >
              {todo.todo}
            </span>
          </label>
          <div className="flex gap-1 ml-2">
            <button
              data-testid="modify-button"
              onClick={handleEditClick}
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
        </>
      )}
    </li>
  );
};

export default ToDoItem;
