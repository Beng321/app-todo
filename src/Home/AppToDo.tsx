import React, { useEffect, useState } from "react";
import AddTaskModal from "../components/AddTaskModal";
import { ColumnProps } from "../sections/TypeColumn";
import { Task } from "../sections/TypeColumn";
import ItemTask from "../item/itemTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { data, Link } from "react-router-dom";

const AppToDo = () => {
  const [isModal, setIsModal] = useState(false);
  const [columns, setColumns] = useState<ColumnProps[]>([
    {
      id: "td",
      title: "To Do",
      tasks: [],
    },
    {
      id: "ip",
      title: "In Progress",
      tasks: [],
    },
    {
      id: "de",
      title: "Done",
      tasks: [],
    },
  ]);
  const fetchTasks = () => {
    fetch("http://localhost:3001/tasks")
      .then((response) => response.json())
      .then(({ data }) => {
        if (Array.isArray(data)) {
          const newColumns = columns.map((column) => {
            return {
              ...column,
              tasks: data.filter((task: Task) => task.idColumn === column.id),
            };
          });
          setColumns(newColumns);
        }
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = (content: string, columnId: string) => {
    console.log(columnId);
    const newTask: Task = {
      id: Math.floor(Math.random() * 1000),
      content,
      createdAt: new Date(),
      idColumn: columnId,
    };

    fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then(() => {
        fetchTasks();
      });
  };

  const handleRemoveTask = (taskId: number, columnId: string) => {
    const result = window.confirm("Do you want to remove this task?");
    fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(() => {
        if (result) {
          const newColumns = columns.map((column) => {
            if (column.id === columnId) {
              return {
                ...column,
                tasks: column.tasks.filter((task) => task.id !== taskId),
              };
            }
            return column;
          });
          setColumns(newColumns);
        }
      });
  };

  const handleUpdateTask = (taskId: number) => {
    const newContent = window.prompt("Enter new content");
    if (newContent) {
      const taskToUpdate = columns
        .flatMap((column) => column.tasks)
        .find((task) => task.id === taskId);

      const updatedTask = { ...taskToUpdate, content: newContent };

      fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      })
        .then((response) => response.json())
        .then(() => {
          const newColumns = columns.map((column) => ({
            ...column,
            tasks: column.tasks.map((task) => {
              if (task.id === taskId) {
                return {
                  ...task,
                  content: newContent,
                };
              }
              return task;
            }),
          }));

          setColumns(newColumns);
        });
    }
  };

  const handleMoveTask = (taskId: number, toColumnId: string) => {
    let taskToMove: Task | null = null;
    const newColumns = columns.map((column) => {
      const newTasks = column.tasks.filter((task) => {
        if (task.id === taskId) {
          taskToMove = task;
          return false;
        }
        return true;
      });

      return {
        ...column,
        tasks: newTasks,
      };
    });
    console.log(toColumnId);

    if (taskToMove) {
      const updateTask: Task = taskToMove;
      updateTask.idColumn = toColumnId;
      fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateTask),
      })
        .then((response) => response.json())
        .then(() => {
          const updatedColumns = newColumns.map((column) => {
            if (column.id === toColumnId) {
              return {
                ...column,
                tasks: [...column.tasks, updateTask],
              };
            }
            return column;
          });
          setColumns(updatedColumns);
        });
    }
  };

  return (
    <div>
      <div className="Header-home">
        <div className="btn-task" style={{ marginTop: "10px" }}>
          <Link to={"/"} className="home-button">
            {" "}
            Home
          </Link>
        </div>
        <h1>TO DO LIST</h1>
        <div className="Content-home">
          <div className="Columns">
            {columns.map((column) => (
              <div key={column.id} className="Column">
                <div className="Column-header">
                  <span className="Column-header__count">
                    {column.tasks.length} {column.tasks.length > 1}
                  </span>
                  <h2>{column.title.toLocaleUpperCase()}</h2>
                  <p
                    style={{
                      backgroundColor: "#5680f9",
                      color: "#fff",
                      padding: "5px 7px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      border: "none",
                      fontSize: "20px",
                    }}
                    onClick={() => setIsModal(true)}
                  >
                    <FontAwesomeIcon
                      style={{ marginRight: "3px" }}
                      icon={faPlus}
                    />
                    New Task
                  </p>
                </div>

                <ul>
                  {column.tasks.map((task, index) => (
                    <ItemTask
                      key={index}
                      task={task}
                      columnId={column.id}
                      handleRemoveTask={handleRemoveTask}
                      handleUpdateTask={handleUpdateTask}
                      handleMoveTask={handleMoveTask}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AddTaskModal
        width="400px"
        title="Enter task content"
        isShow={isModal}
        onClose={() => setIsModal(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
};

export default AppToDo;
