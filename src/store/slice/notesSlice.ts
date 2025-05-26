import { createSlice } from '@reduxjs/toolkit';
import { deleteNote, fetchNotes,updateNote } from '../actions/noteActions';

const initialState = {
  notes: [],
  pending: false,
  info: null,
  visible: false,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.visible = false;
    },
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    openModal: (state) => {
      state.visible = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.pending = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state) => {
        state.pending = false;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.info = action.payload;
        state.visible = true;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.info = action.payload;
        state.visible = true;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.info = action.payload;
        state.visible = true;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.info = action.payload || { success: false, message: 'Güncelleme başarısız' };
        state.visible = true;
      });
  },
});

export const { closeModal, setInfo, openModal } = notesSlice.actions;
export default notesSlice.reducer;
