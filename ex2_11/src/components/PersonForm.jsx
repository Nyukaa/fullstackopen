const PersonForm = ({
  newName,
  newNumber,
  addPerson,
  handlePersonChange,
  handleNumberChange,
}) => {
  return (
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
  );
};

export default PersonForm;
