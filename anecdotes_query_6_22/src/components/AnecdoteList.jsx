const AnecdoteList = ({ anecdotes, updateAnecdoteMutation }) => {
  const handleVote = (a) => {
    const updated = { ...a, votes: a.votes + 1 };
    updateAnecdoteMutation.mutate(updated);
  };
  return (
    <>
      {anecdotes.map((a) => (
        <div key={a.id}>
          <div>{a.content}</div>
          <div>
            has {a.votes} <button onClick={() => handleVote(a)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
