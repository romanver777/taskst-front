import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  loadTasks,
  patchTask,
  removeTaskById,
} from "../../store/tasks/tasks-slice";
import { openModal, openModalId } from "../../store/modal/modal-slice";
import PageLayout from "../../layouts/page-layout/page-layout";
import Header from "../../components/header/header";
import EditTool from "../../components/edit-tool/edit-tool";
import Content from "../../components/content/content";
import List from "../../components/list/list";
import TaskItem from "../../components/task-item/task-item";
import Message from "../../components/message/message";
import type { TTask } from "../../components/task-item/task-item";

function Main() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const loading = useAppSelector((state) => state.tasks.loading);
  const error = useAppSelector((state) => state.tasks.error);

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  const onRemoveTask = (id: string) => dispatch(removeTaskById(id));

  const onOpenModal = (id: string | null) => {
    if (id === null) {
      dispatch(openModal("new"));
    } else {
      dispatch(openModal("edit"));
    }
    dispatch(openModalId(id));
  };

  const onCompletedTask = (task: TTask) => {
    switch (task.status) {
      case "в работе":
        dispatch(patchTask({ ...task, status: "готово" }));
        break;
      case "готово":
        dispatch(patchTask({ ...task, status: "в работе" }));
        break;
      default:
        dispatch(patchTask({ ...task, status: "в работе" }));
    }
  };

  const renders = {
    task: (item: TTask) => {
      return (
        <TaskItem
          key={item._id}
          task={item}
          onCompleted={onCompletedTask}
          onEdit={onOpenModal}
          onRemove={onRemoveTask}
        />
      );
    },
  };

  return (
    <PageLayout>
      <Header title="ToDo List">
        <EditTool onOpen={onOpenModal} />
      </Header>
      <Content loading={loading}>
        {tasks.length > 0 ? (
          <List list={[...tasks].reverse()} renderItem={renders.task} />
        ) : !loading ? (
          <Message text="Задач нет" />
        ) : (
          <Message text="Ждем пока проснется сервер и загружаем.." />
        )}
        {error && <Message text="Что-то пошло не так" />}
      </Content>
    </PageLayout>
  );
}

export default Main;
