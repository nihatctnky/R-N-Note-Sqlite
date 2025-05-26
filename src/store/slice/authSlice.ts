import {createSlice} from '@reduxjs/toolkit';
import {createUser, fetchUser, getUserInfo, logOut, updateUser} from '../actions/authActions';

const initialState = {
  isLogin: false,
  user: {},
  visible: false,
  pendingLogin: false,
  pendingRegister: false,
  pendingUpdate: false,
  error: null,
  info:null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    closeModal: (state, action) => {
      state.visible = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, state => {
        state.pendingLogin = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        (state.pendingLogin = false),
          (state.user = action.payload),
          (state.isLogin = true);
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.pendingLogin = false;
        state.info = action.payload;
        state.visible=true

      })
      .addCase(createUser.pending, state => {
        state.pendingRegister = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.pendingRegister = false;
        state.visible = true;
        state.info=action.payload
      })
      .addCase(createUser.rejected, (state, action) => {
        state.pendingRegister = false;
        (state.info = action.payload), (state.visible = true);
      })
      .addCase(updateUser.pending, state => {
        state.pendingUpdate = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.pendingUpdate = false;
        state.visible = true;
        state.info=action.payload
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.pendingUpdate = false;
        (state.info = action.payload), (state.visible = true);
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.isLogin = false;
        state.user = action.payload;
      });
  },
});
export const {closeModal} = authSlice.actions;
export default authSlice.reducer;