import { createSlice } from "@reduxjs/toolkit";

const initialState = ""; //initially no notification

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return "";
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
// thunk action creator for showing notification
export const showNotification = (message, time = 5) => {
  return (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
