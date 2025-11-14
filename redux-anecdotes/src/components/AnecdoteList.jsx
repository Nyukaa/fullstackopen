import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import Anecdote from "./Anecdote.jsx";
const AnecdoteList = () => {
  const dispatch = useDispatch(); //
  const anecdotes = useSelector((state) => state); // get all anecdotes from the Redux store

  return (
    <ul>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(voteAnecdote(anecdote.id))}
        />
      ))}
    </ul>
  );
};
export default AnecdoteList;
