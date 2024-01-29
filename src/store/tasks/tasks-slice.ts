import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { TTask } from "../../components/task-item/task-item";
import type { TForm } from "../../components/edit-form/edit-form";

export const loadTasks = createAsyncThunk(
  "tasks/loadTasks",
  async (_, thunkApi) => {
    try {
      const resp = await fetch("https://taskst.onrender.com/api/tasks");

      if (!resp.ok) return thunkApi.rejectWithValue("Что-то пошло не так...");

      return resp.json();
    } catch (err) {
      thunkApi.rejectWithValue("failed to load data");
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (data: TForm, thunkApi) => {
    try {
      const resp = await fetch(`https://taskst.onrender.com/api/task`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!resp.ok) return thunkApi.rejectWithValue("Что-то пошло не так...");

      return resp.json();
    } catch (err) {
      thunkApi.rejectWithValue("failed to load data");
    }
  }
);

export const patchTask = createAsyncThunk(
  "tasks/patchTask",
  async (data: TTask, thunkApi) => {
    const { _id, ...rest } = data;
    try {
      const resp = await fetch(`https://taskst.onrender.com/api/task/${_id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rest),
      });

      if (!resp.ok) return thunkApi.rejectWithValue("Что-то пошло не так...");

      const result = await resp.json();
      return await {result, data};
    } catch (err) {
      thunkApi.rejectWithValue("failed to load data");
    }
  }
);

export const removeTaskById = createAsyncThunk(
  "tasks/removeTaskById",
  async (id: string, thunkApi) => {
    try {
      const resp = await fetch(`https://taskst.onrender.com/api/task/${id}`, {
        method: "DELETE",
      });

      if (!resp.ok) return thunkApi.rejectWithValue("Что-то пошло не так...");

      const result = await resp.json();
      return await { result, id };
    } catch (err) {
      thunkApi.rejectWithValue("failed to load data");
    }
  }
);

interface ITasksState {
  tasks: TTask[];
  loading: boolean;
  error: string | null;
}

const initialState: ITasksState = {
  tasks: [],
  loading: true,
  error: null,
};

export const tasksSlice = createSlice({
  name: "fetch-tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // loadTasks
      .addCase(loadTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(loadTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Что-то пошло не так";
      })
      // removeTaskById
      .addCase(removeTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter(
          (item) => item._id != action.payload?.id
        );
      })
      .addCase(removeTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Что-то пошло не так";
      })
      // createTask
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Что-то пошло не так";
      })
      // patchTask
      .addCase(patchTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(patchTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.map(item => {
          if (item._id === action.payload?.data._id) {
            item = action.payload?.data;
          }
          return item;
        });
      })
      .addCase(patchTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Что-то пошло не так";
      });
  },
});

export default tasksSlice.reducer;
