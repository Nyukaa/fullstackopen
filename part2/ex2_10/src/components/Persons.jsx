import Note from "./Note";
const Persons = ({ personsToShow }) => {
  return (
    <div>
      <ul>
        {personsToShow.map((person) => (
          <Note key={person.id} note={person} />
        ))}
      </ul>
    </div>
  );
};

export default Persons;
