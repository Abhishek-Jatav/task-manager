import TaskItem from "./TaskItem";
import { Task } from "../../../lib/api/tasks/types";

type Props = {
  tasks: Task[];
  editTaskId: string | null;
  editTaskTitle: string;
  setEditTaskId: (id: string | null) => void;
  setEditTaskTitle: (title: string) => void;
  handleToggle: (id: string) => void;
  handleUpdate: (id: string) => void;
  handleDelete: (id: string) => void;
};

export default function TaskList(props: Props) {
  if (props.tasks.length === 0) {
    return (
      <div className="text-center py-10 text-zinc-500">No tasks found 😴</div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {props.tasks.map((task) => (
        <TaskItem key={task.id} {...props} task={task} />
      ))}
    </div>
  );
}
