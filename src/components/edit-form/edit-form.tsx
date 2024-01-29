import { useForm } from "react-hook-form";
import style from "./edit-form.module.scss";
import type { TTask } from "../task-item/task-item";

export type TForm = {
  title: string;
  description: string;
  status: string;
};

type TEditForm = {
  task: TTask[];
  onSave: (data: TForm | TTask) => void;
  onClose: () => void;
};

function EditForm({ task, onSave, onClose }: TEditForm) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>();

  const onSubmit = (data: TForm) => onSave(data);

  return (
    <form className={style.EditForm}>
      <div className={style.EditForm__text}>
        <input
          type="text"
          className={style.EditForm__textInput}
          placeholder="Название"
          {...register("title", {
            required: "Это обязательное поле",
            maxLength: 50,
          })}
          defaultValue={task.length > 0 ? task[0].title : ""}
        />
        {errors.title && (
          <div className={style.EditForm__errorMsg}>{errors.title.message}</div>
        )}
        {errors.title?.type === "maxLength" && (
          <div className={style.EditForm__errorMsg}>Слишко много текста</div>
        )}
      </div>
      <div className={style.EditForm__desc}>
        <textarea
          className={style.EditForm__descTextarea}
          placeholder="Описание"
          {...register("description", {
            required: "Это обязательное поле",
            maxLength: 400,
          })}
          defaultValue={task.length > 0 ? task[0].description : ""}
        ></textarea>
        {errors.description && (
          <div className={style.EditForm__errorMsg}>
            {errors.description.message}
          </div>
        )}
        {errors.description?.type === "maxLength" && (
          <div className={style.EditForm__errorMsg}>Слишко много текста</div>
        )}
      </div>
      {task.length > 0 && (
        <div className={style.EditForm__statuses}>
          <label className={style.EditForm__label}>
            <input
              type="radio"
              className={style.EditForm__radio}
              defaultChecked={task[0].status.toLowerCase() === "сделать"}
              {...register("status")}
              value="сделать"
            />
            <span className={style.EditForm__name}>Cделать</span>
          </label>
          <label className={style.EditForm__label}>
            <input
              type="radio"
              className={style.EditForm__radio}
              defaultChecked={task[0].status.toLowerCase() === "в работе"}
              {...register("status")}
              value="в работе"
            />
            <span className={style.EditForm__name}>В работе</span>
          </label>
          <label className={style.EditForm__label}>
            <input
              type="radio"
              className={style.EditForm__radio}
              defaultChecked={task[0].status.toLowerCase() === "готово"}
              {...register("status")}
              value="готово"
            />
            <span className={style.EditForm__name}>Готово</span>
          </label>
        </div>
      )}
      <div className={style.EditForm__btns}>
        <button
          type="button"
          className={style.EditForm__btn}
          onClick={handleSubmit(onSubmit)}
        >
          Сохранить
        </button>
        <button
          type="button"
          className={style.EditForm__btn + " " + style.EditForm__btn_close}
          onClick={onClose}
        >
          Отмена
        </button>
      </div>
    </form>
  );
}

export default EditForm;
