import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import Anecdote from "./Anecdote.jsx";
import { showNotification } from "../reducers/notificationReducer";
const AnecdoteList = () => {
  const dispatch = useDispatch(); //
  //   const anecdotes = useSelector((state) => state.anecdote); // get all anecdotes from the Redux store
  // правильный селектор: обращаемся к slice 'anecdote' как 'anecdotes' в store
  const anecdotes = useSelector((state) => state.anecdote);

  const filter = useSelector((state) => state.filter); // если есть фильтр

  // фильтруем анекдоты
  const filteredAnecdotes = anecdotes.filter((a) =>
    a.content.toLowerCase().includes(filter.toLowerCase())
  );

  // колбэк для голосования
  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(showNotification(`You voted for "${anecdote.content}"`, 5));
  };

  return (
    <ul>
      {filteredAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVote(anecdote)}
        />
      ))}
    </ul>
  );
};
export default AnecdoteList;
