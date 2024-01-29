import style from "./task-item.module.scss";
import removeIcon from "../../assets/close.svg";
import editIcon from "../../assets/edit.svg";

export type TTask = {
  _id: string;
  title: string;
  description: string;
  status: string;
};

type TTaskItem = {
  task: TTask;
  onCompleted: (task: TTask) => void;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
};

const TaskItem = ({ task, onCompleted, onEdit, onRemove }: TTaskItem) => {

  const handleCompleted = () => onCompleted(task);
  const handleEdit = () => onEdit(task._id);
  const handleRemove = () => onRemove(task._id);

  return (
    <div className={style.TaskItem}>
      <div className={style.TaskItem__head}>
        <h3
          className={
            task.status.toLowerCase() === "готово"
              ? style.TaskItem__title + " " + style.TaskItem__title_completed
              : task.status.toLowerCase() === "в работе"
              ? style.TaskItem__title + " " + style.TaskItem__title_dev
              : style.TaskItem__title
          }
          onClick={handleCompleted}
        >
          {task.title}
        </h3>
        <div className={style.TaskItem__controls}>
          <button
            className={style.TaskItem__button}
            onClick={handleEdit}
            data-title="Редактировать"
          >
            <img
              src={editIcon}
              width={20}
              height={20}
              alt="edit icon"
              className={style.TaskItem__editIcon}
            />
          </button>
          <button
            className={style.TaskItem__button}
            onClick={handleRemove}
            data-title="Удалить"
          >
            <img src={removeIcon} width={23} height={23} alt="remove icon" />
          </button>
        </div>
      </div>
      <div className={style.TaskItem__text}>{task.description}</div>
      <div
        className={
          task.status.toLowerCase() === "сделать"
            ? style.TaskItem__status
            : task.status.toLowerCase() === "готово"
            ? style.TaskItem__status + " " + style.TaskItem__status_done
            : style.TaskItem__status + " " + style.TaskItem__status_dev
        }
      >
        {task.status}
      </div>
    </div>
  );
};

export default TaskItem;
