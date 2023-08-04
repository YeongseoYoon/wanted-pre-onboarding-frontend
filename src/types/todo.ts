export interface ToDoRequest {
  todo: string;
}

export interface ToDoResponse {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export interface CreateToDoRequest extends ToDoRequest {}

export interface CreateToDoResponse extends ToDoResponse {}

export interface GetToDoResponse extends ToDoResponse {}
