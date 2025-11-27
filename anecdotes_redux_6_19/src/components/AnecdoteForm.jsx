import { useDispatch } from "react-redux";
//import { createAnecdote } from "../reducers/anecdoteReducer";
//import anecdoteService from "../services/anecdotes";
import { showNotification } from "../reducers/notificationReducer";

import appendAnecdote from "../reducers/anecdoteReducer";
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    // dispatch(createAnecdote(content));
    // const newA = await anecdoteService.createNew(content); //for seerver side
    // dispatch(createAnecdote(newA));
    dispatch(appendAnecdote(content));
    dispatch(showNotification(`You added "${content}"`, 5));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
