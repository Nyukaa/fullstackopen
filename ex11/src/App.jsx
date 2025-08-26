import { useState } from "react";
const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);
const Statistics = ({ good, bad, neutral, total }) => {
  if (total === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={(good - bad) / total} />
        <StatisticLine text="positive" value={good / total} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGoodClick = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    setTotal(neutral + bad + updatedGood);
  };
  const handleBadClick = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setTotal(neutral + updatedBad + good);
  };
  const handleNeutralClick = () => {
    const updatedNautral = neutral + 1;
    setNeutral(updatedNautral);
    setTotal(updatedNautral + bad + good);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onClick={handleGoodClick} text="good" />
        <Button onClick={handleNeutralClick} text="neutral" />
        <Button onClick={handleBadClick} text="bad" />
      </div>
      <h1>statisticks</h1>
      <Statistics neutral={neutral} bad={bad} good={good} total={total} />
    </div>
  );
};

export default App;

// import { useState } from "react";

// const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

// const StatisticLine = ({ text, value }) => (
//   <tr>
//     <td>{text}</td>
//     <td>{value}</td>
//   </tr>
// );

// const Statistics = ({ good, bad, neutral }) => {
//   const total = good + bad + neutral;

//   if (total === 0) {
//     return <p>No feedback given</p>;
//   }

//   return (
//     <table>
//       <tbody>
//         <StatisticLine text="good" value={good} />
//         <StatisticLine text="neutral" value={neutral} />
//         <StatisticLine text="bad" value={bad} />
//         <StatisticLine text="all" value={total} />
//         <StatisticLine text="average" value={(good - bad) / total} />
//         <StatisticLine text="positive" value={(good / total) * 100 + " %"} />
//       </tbody>
//     </table>
//   );
// };

// const App = () => {
//   const [good, setGood] = useState(0);
//   const [neutral, setNeutral] = useState(0);
//   const [bad, setBad] = useState(0);

//   return (
//     <div>
//       <h1>give feedback</h1>
//       <div>
//         <Button onClick={() => setGood(good + 1)} text="good" />
//         <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
//         <Button onClick={() => setBad(bad + 1)} text="bad" />
//       </div>
//       <h1>statistics</h1>
//       <Statistics good={good} neutral={neutral} bad={bad} />
//     </div>
//   );
// };

// export default App;
