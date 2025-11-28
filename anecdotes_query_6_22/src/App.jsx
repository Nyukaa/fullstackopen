import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AnecdoteList from "./components/AnecdoteList";
import { getAnecdotes, createAnecdote, updateAnecdote } from "./requests";

const App = () => {
  console.log("%c▶ App render", "color: orange; font-weight: bold;");
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    //onSuccess: () => {
    onSuccess: (newA) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newA)); // обновляем кэш вручную
      console.log(
        "%c✔ [Mutation → createAnecdote] SUCCESS. Server responsed:",
        "color: green; font-weight: bold;",
        newA
      );
    },
    // queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    // помечает кэш с ключом ['notes'] как устаревший
    // React Query автоматически делает новый GET-запрос (getNotes)
    // компонент получает обновлённые данные
    // на экране появляется новая заметка
  });

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    // validation
    if (content.length < 5) {
      alert("Anecdote must be at least 5 characters long");
      return;
    }
    event.target.anecdote.value = "";
    console.log(content);
    newAnecdoteMutation.mutate({ content, votes: 0 });
    // вызываем mutate
    // сервер создаёт заметку
    // onSuccess → invalidateQueries
    // React Query сам перезагружает список заметок
    // UI обновляется
  };

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedA) => {
      // Берём текущий кэш анекдотов
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      // Обновляем только тот анекдот, который проголосовал пользователь
      const newList = anecdotes.map((a) =>
        a.id === updatedA.id ? updatedA : a
      );
      // Сохраняем обратно в кэш
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
