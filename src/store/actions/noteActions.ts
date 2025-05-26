import {createAsyncThunk} from '@reduxjs/toolkit';
import { deleteNoteFromDb, getNotesFromDb, updateNoteFromDb } from '../../utils/db';

export const fetchNotes = createAsyncThunk(
  'notes/fetchNotes',
  async (values, {rejectWithValue}) => {
    try {
      const response = await getNotesFromDb(values);
      return response;
    } catch (error) {
      return rejectWithValue('Kullanıcı Bulunamadı', error.message);
    }
  },
);
export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (notId, {rejectWithValue}) => {
    try {
      const response = await deleteNoteFromDb(notId);
    return response
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async (note, { rejectWithValue }) => {
    try {
      const response = await updateNoteFromDb(note);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);