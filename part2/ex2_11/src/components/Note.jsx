const Note = ({ note }) => {
  return (
    <p>
      {note.name} {note.number}
    </p>
  );
};

export default Note;
