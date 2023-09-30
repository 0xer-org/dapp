import { useParams } from "react-router-dom";
import TaskIntro1 from "./Intro1";
import TaskIntro2 from "./Intro2";
import TaskIntro3 from "./Intro3";
import { FunctionComponent } from "react";

const TaskIntroductionComponents: Record<number, FunctionComponent> = {
  1: TaskIntro1,
  2: TaskIntro2,
  3: TaskIntro3,
};

const TaskIntroduction = () => {
  const { id } = useParams<{ id?: string }>();
  const Component = TaskIntroductionComponents[parseInt(id || "0", 10)];
  return <Component />;
};

export default TaskIntroduction;
