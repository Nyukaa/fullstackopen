const App = ({ store }) => {
  const { good, ok, bad } = store.getState();
  return (
    <div>
      <button onClick={() => store.dispatch({ type: "GOOD" })}>good</button>
      <button onClick={() => store.dispatch({ type: "OK" })}>ok</button>
      <button onClick={() => store.dispatch({ type: "BAD" })}>bad</button>
      <button onClick={() => store.dispatch({ type: "RESET" })}>
        reset stats
      </button>
      <div>good {good}</div>
      <div>ok {ok}</div>
      <div>bad {bad}</div>
    </div>
  );
};
export default App;
