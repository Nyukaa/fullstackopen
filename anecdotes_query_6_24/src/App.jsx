import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AnecdoteList from "./components/AnecdoteList";
import { getAnecdotes, createAnecdote, updateAnecdote } from "./requests";
import NotificationContext from "./NotificationContext";
import { useContext } from "react";
import Notification from "./components/Notifications";
const App = () => {
  console.log("%c▶ App render", "color: orange; font-weight: bold;");
  const queryClient = useQueryClient();

  const { notDispatch } = useContext(NotificationContext);

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    //onSuccess: () => {
    onSuccess: (newA) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newA)); //  cache update
      notDispatch({ type: "SET", payload: `Anecdote "${content}" created` });
      setTimeout(() => notDispatch({ type: "CLEAR" }), 5000);
      console.log(
        "%c✔ [Mutation → createAnecdote] SUCCESS. Server responsed:",
        "color: green; font-weight: bold;",
        newA
      );
    },
    onError: (error) => {
      // Показываем уведомление об ошибке
      notDispatch({
        type: "SET",
        payload: error.message || "Unknown error",
      });
      setTimeout(() => notDispatch({ type: "CLEAR" }), 5000);
    },
  });

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    // validation, but now handled in server
    // if (content.length < 5) {
    //   alert("Anecdote must be at least 5 characters long");

    //   return;
    // }
    event.target.anecdote.value = "";
    console.log(content);
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedA) => {
      // cache update
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      // update the specific anecdote in the list
      const newList = anecdotes.map((a) =>
        a.id === updatedA.id ? updatedA : a
      );
      // set the updated list back to the cache
      queryClient.setQueryData(["anecdotes"], newList);
      console.log(
        "%c✔ [Mutation → updateAnecdote] SUCCESS. Server responsed:",
        "color: green; font-weight: bold;",
        updatedA
      );
    },
  });
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
    // refetchOnWindowFocus: false, // отключаем автообновление при фокусе окна
  });

  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  if (result.isError) {
    return <div>anecdotes service not available due to server problems</div>;
  }
  const anecdotes = result.data;

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList
        anecdotes={anecdotes}
        updateAnecdoteMutation={updateAnecdoteMutation}
      />

      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default App;
