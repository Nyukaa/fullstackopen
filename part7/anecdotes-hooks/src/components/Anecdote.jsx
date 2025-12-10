const Anecdote = ({ anecdote }) => {
  if (!anecdote) return <div>Anecdote not found</div>;
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <div>has {anecdote.votes} votes</div>
      <div>
        for more info <a href={anecdote.info}>{anecdote.info}</a>
      </div>
    </div>
  );
};
export default Anecdote;
