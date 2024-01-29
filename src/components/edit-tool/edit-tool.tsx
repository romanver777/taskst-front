import style from "./edit-tool.module.scss";
import addIcon from "../../assets/add.svg";

type TEditTool = {
  onOpen: (id: string | null) => void;
}

function EditTool({onOpen}: TEditTool) {
  return (
    <div className={style.EditTool}>
      <button className={style.EditTool__button} onClick={() => onOpen(null)}>
        <img src={addIcon} width={20} height={20} alt="Add icon" />
        <span className={style.EditTool__text}>Создать задачу</span>
      </button>
    </div>
  );
}

export default EditTool;
