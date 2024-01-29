import style from "./list.module.scss";
import { TTask } from "../task-item/task-item";

type TList = {
  list: TTask[];
  renderItem: (item: TTask) => JSX.Element;
};

const List = ({ list, renderItem }: TList) => {
  return (
    <div className={style.List}>
      <ul className={style.List__ul}>{list.map((item) => renderItem(item))}</ul>
    </div>
  );
};

export default List;
