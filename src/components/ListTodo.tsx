import type { TodoType } from "../App";
import { Todo } from "./Todo";

export const ListTodo = ({
  todolist,
  updateIsCompleted,
}: {
  todolist: TodoType[];
  updateIsCompleted: (todoId: string) => void;
}) => {
  return (
    <div>
      {todolist.map((todo) => {
        return (
          <Todo
            todoId={todo.id}
            name={todo.name}
            isCompleted={todo.isCompleted}
            updateIsCompleted={updateIsCompleted}
          />
        );
      })}
    </div>
  );
};
