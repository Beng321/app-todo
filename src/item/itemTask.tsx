import { Task } from "../sections/TypeColumn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faArrowRight,
  faArrowLeft,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { hover } from "@testing-library/user-event/dist/hover";
// import { Draggable } from "react-beautiful-dnd";

type Props = {
  task: Task;
  columnId: string;
  handleRemoveTask: (taskId: number, columnId: string) => void;
  handleUpdateTask: (
    taskId: number,
    columnId: string,
    newContent: string
  ) => void;
  handleMoveTask: (taskId: number, toColumnId: string) => void;
};

const ItemTask = ({
  task,
  columnId,
  handleRemoveTask,
  handleUpdateTask,
  handleMoveTask,
}: Props) => {
  const moveTaskLeft = () => {
    if (columnId === "ip") handleMoveTask(task.id, "td");
    if (columnId === "de") handleMoveTask(task.id, "ip");
  };

  const moveTaskRight = () => {
    if (columnId === "td") handleMoveTask(task.id, "ip");
    if (columnId === "ip") handleMoveTask(task.id, "de");
  };

  return (
    <li className="Task-item" key={task.id}>
      <div style={{ width: "100%" }}>
        <p style={{ fontSize: "13px", color: "#666", marginBottom: "10px" }}>
          <FontAwesomeIcon
            style={{ marginRight: "3px" }}
            icon={faCalendarDays}
          />
          {task.createdAt ? new Date(task.createdAt).toLocaleString() : ""}
        </p>
        <p style={{ fontSize: "20px", color: "black" }}>{task.content}</p>
      </div>
      <div className="task-action">
        <div>
          <div
            className="btn-task"
            onClick={() => handleUpdateTask(task.id, columnId, "New Content")}
          >
            <FontAwesomeIcon
              style={{ color: "\f044", fontWeight: "400" }}
              icon={faPenToSquare}
            />
          </div>
          <div
            className="btn-task"
            style={{ color: "red", fontWeight: "400" }}
            onClick={() => handleRemoveTask(task.id, columnId)}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </div>
        </div>
        <div className="btn-task">
          {columnId !== "td" && (
            <div className="btn-left" onClick={moveTaskLeft}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
          )}
          {columnId !== "de" && (
            <div className="btn-right" onClick={moveTaskRight}>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default ItemTask;
