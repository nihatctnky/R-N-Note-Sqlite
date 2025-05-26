import {configureStore} from '@reduxjs/toolkit';
import notes from './slice/notesSlice';
import auth from './slice/authSlice';
const store = configureStore({
  reducer: {
    notes,
    auth,
  },
});

export default store;