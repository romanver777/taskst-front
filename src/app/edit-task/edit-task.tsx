import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createTask, patchTask } from "../../store/tasks/tasks-slice";
import { closeModal } from "../../store/modal/modal-slice";
import ModalLayout from "../../layouts/modal-layout/modal-layout";
import EditForm from "../../components/edit-form/edit-form";
import type { TTask } from "../../components/task-item/task-item";
import type { TForm } from "../../components/edit-form/edit-form";

type TEditTask = {
  isOpen: boolean;
}

function EditTask({isOpen}: TEditTask) {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const openModalId = useAppSelector((state) => state.modal.modalId);
  const currentTask = tasks.filter((item) => item._id == openModalId);

  const onCloseModal = () => void dispatch(closeModal());

  const onSaveTask = (data: TTask | TForm) => {
    if (currentTask.length == 0) {
      data.status = "сделать";

      dispatch(createTask(data));
      onCloseModal();
      return;
    }
    if (
      currentTask[0].title != data.title.trim() ||
      currentTask[0].description !== data.description.trim() ||
      currentTask[0].status !== data.status.trim()
    ) {
      const dataTrim: Record<string, unknown> = {};
      Object.entries(data).forEach(([key, val]) => (dataTrim[key] = val.trim()));

      dispatch(patchTask({ ...dataTrim as TForm, _id: currentTask[0]._id }));
      onCloseModal();
      return;
    }
  };

  return (
    <ModalLayout
      title={openModalId != null ? "Редактировать" : "Создать"}
      isOpen={isOpen}
      onClose={onCloseModal}
    >
      <EditForm task={currentTask} onSave={onSaveTask} onClose={onCloseModal} />
    </ModalLayout>
  );
}

export default EditTask;
