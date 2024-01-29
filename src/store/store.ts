import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasks/tasks-slice";
import modalReducer from "./modal/modal-slice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    modal: modalReducer,
  },
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
