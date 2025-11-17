import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import Anecdote from "./Anecdote.jsx";
const AnecdoteList = () => {
  const dispatch = useDispatch(); //
  //   const anecdotes = useSelector((state) => state.anecdote); // get all anecdotes from the Redux store
  const anecdotes = useSelector(({ anecdote, filter }) => {
    //destructure state object
    return anecdote.filter((a) =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    );
  });
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
