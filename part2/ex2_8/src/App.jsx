import { useState } from "react";
import Note from "./components/Note";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", id: 1, number: 932387 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handlePersonChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const pObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };
    setPersons(persons.concat(pObject));
    setNewName("");

    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <label htmlFor="name">name: </label>
          <input id="name" value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <label htmlFor="number">number: </label>
          <input id="number" value={newNumber} onChange={handleNumberChange} />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Note key={person.id} note={person} />
        ))}
      </ul>
    </div>
  );
};
export default App;
