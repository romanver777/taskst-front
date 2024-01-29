import { createSlice } from "@reduxjs/toolkit";

interface IModalState {
  modal: string | null;
  modalId: string | null;
}

const initialState: IModalState = {
  modal: null,
  modalId: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modal = action.payload;
    },
    openModalId: (state, action) => {
      state.modalId = action.payload;
    },
    closeModal: (state) => {
      state.modal = null;
      state.modalId = null;
    },
  },
});

export const { openModal, openModalId, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
