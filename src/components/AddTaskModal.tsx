import { ReactElement, useState } from "react";

type Props = {
  width?: string;
  height?: string;
  children?: ReactElement;
  isShow?: boolean;
  title?: string;
  onClose?: () => void;
  onAddTask?: (content: string, status: string) => void;
};

const AddTaskModal = ({
  width,
  height,
  isShow,
  onClose,
  onAddTask,
  children,
  title,
}: Props) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("td");
  const [taskContent, setTaskContent] = useState<string>("");

  const handleSave = () => {
    if (onAddTask) {
      onAddTask(taskContent, selectedStatus);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div>
      {isShow && (
        <div className="wrapper-modal">
          <div className="wrapper-body" style={{ width }}>
            <h1
              style={{
                color: "#5680f9",
                fontSize: "22px",
                fontWeight: "700",
                letterSpacing: ".5px",
                lineHeight: "30px",
                boxSizing: "border-box",
                borderBottom: "1px solid #ccc",
              }}
            >
              CREATE NEW TASK
            </h1>
            <div style={{ display: "flex", padding: "0 18px", rowGap: "1rem" }}>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "30px",
                  marginRight: "20px",
                }}
              >
                <span className="AddNewModal__options">
                  <input
                    type="radio"
                    name="status"
                    value="td"
                    checked={selectedStatus === "td"}
                    onChange={() => setSelectedStatus("td")}
                  />
                  <span>TODO</span>
                </span>
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "30px",
                  marginRight: "20px",
                }}
              >
                <span className="AddNewModal__options">
                  <input
                    type="radio"
                    name="status"
                    value="ip"
                    checked={selectedStatus === "ip"}
                    onChange={() => setSelectedStatus("ip")}
                  />
                  <span>IN PROGRESS</span>
                </span>
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "30px",
                }}
              >
                <span className="AddNewModal__options">
                  <input
                    type="radio"
                    name="status"
                    value="de"
                    checked={selectedStatus === "de"}
                    onChange={() => setSelectedStatus("de")}
                  />
                  <span>DONE</span>
                </span>
              </div>
            </div>
            {!children ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "1rem",
                }}
              >
                <input
                  style={{ fontSize: "22px", textAlign: "center" }}
                  placeholder={title}
                  value={taskContent}
                  onChange={(e) => setTaskContent(e.target.value)}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    columnGap: "1rem",
                  }}
                >
                  <button className="button" onClick={handleSave}>
                    {" "}
                    Save
                  </button>
                  <button className="button" onClick={onClose}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              children
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTaskModal;
