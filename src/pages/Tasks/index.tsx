import { useParams } from "react-router-dom";
import Task1 from "./Task1";
import Task2 from "./Task2";
import Task3 from "./Task3";
import { FunctionComponent } from "react";

const TaskComponents: Record<number, FunctionComponent> = {
  1: Task1,
  2: Task2,
  3: Task3,
};

const Tasks = () => {
  const { id } = useParams<{ id?: string }>();
  const Component = TaskComponents[parseInt(id || "0", 10)];
  return <Component />;
};

export default Tasks;
