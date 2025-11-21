import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import Anecdote from "./Anecdote.jsx";
import { showNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteList = () => {
  const dispatch = useDispatch(); //
  //   const anecdotes = useSelector((state) => state.anecdote); // get all anecdotes from the Redux store
  // правильный селектор: обращаемся к slice 'anecdote' как 'anecdotes' в store
  const anecdotes = useSelector((state) => state.anecdote);

  const filter = useSelector((state) => state.filter); // if there is a filter

  // filter anecdotes based on the filter value
  const filteredAnecdotes = anecdotes.filter((a) =>
    a.content.toLowerCase().includes(filter.toLowerCase())
  );

  // callback for voting
  const handleVote = async (anecdote) => {
    console.log("vote", anecdote.votes);
    const updated = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    const returnedAnecdote = await anecdoteService.updateVotes(
      anecdote.id,
      updated
    );
    dispatch(voteAnecdote(returnedAnecdote));

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
