import { current } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    createAnecdote(state, action) {
      // const content = action.payload;
      // state.push({
      //   content,
      //   votes: 0,
      //   id: getId(),
      // });
      state.push(action.payload);
    },
    voteAnecdote(state, action) {
      const changeAnecdote = action.payload;
      const id = changeAnecdote.id;
      //console.log(state); //not useful
      console.log(current(state)); // useful for debugging immutable state
      return state
        .map((a) => (a.id !== id ? a : changeAnecdote))
        .sort((a, b) => b.votes - a.votes);
    },
  },
});

export const { createAnecdote, voteAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
