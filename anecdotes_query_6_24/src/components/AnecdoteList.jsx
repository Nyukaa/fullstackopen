import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const AnecdoteList = ({ anecdotes, updateAnecdoteMutation }) => {
  const { notDispatch } = useContext(NotificationContext);
  const handleVote = (a) => {
    const updated = { ...a, votes: a.votes + 1 };
    updateAnecdoteMutation.mutate(updated);
    notDispatch({
      type: "SET",
      payload: `You voted for "${a.content}"`,
    });
    setTimeout(() => notDispatch({ type: "CLEAR" }), 5000);
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
