const Note = ({ person, deletePerson }) => {
  return (
    <div>
      <p className="person">
        {person.name} {person.number}
      </p>

      <button onClick={() => deletePerson(person.id)}>delete</button>
    </div>
  );
};
export default Note;
