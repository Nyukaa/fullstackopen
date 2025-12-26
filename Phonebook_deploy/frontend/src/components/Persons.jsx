import Note from "./Note";
const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <Note key={person.id} person={person} deletePerson={deletePerson} />
      ))}
    </div>
  );
};

export default Persons;
