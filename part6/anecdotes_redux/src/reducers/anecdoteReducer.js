import { current } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";
const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    createAnecdote(state, action) {
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

const { createAnecdote, setAnecdotes, voteAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(notes));
  };
};

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newAnecdote));
  };
};

export const voteAdd = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    const returnedAnecdote = await anecdoteService.updateVotes(
      anecdote.id,
      updatedAnecdote
    );
    dispatch(voteAnecdote(returnedAnecdote));
  };
};

//export const { voteAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
