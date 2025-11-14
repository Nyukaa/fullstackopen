const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {anecdote.content}
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </li>
  );
};
export default Anecdote;
