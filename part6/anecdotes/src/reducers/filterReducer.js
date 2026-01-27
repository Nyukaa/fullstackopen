import { createSlice } from "@reduxjs/toolkit";
const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterChange(state, action) {
      // action.payload contains the new filter string
      return action.payload;
      // or you can also do: state = action.payload; return state; (Immer handles it)
    },
  },
});

export const { filterChange } = filterSlice.actions;
export default filterSlice.reducer;
// const filterReducer = (state = "", action) => {
//   switch (action.type) {
//     case "SET_FILTER":
//       return action.payload;
//     default:
//       return state;
//   }
// };

// export const filterChange = (value) => {
//   return {
//     type: "SET_FILTER",
//     payload: value,
//   };
// };

//export default filterReducer;
