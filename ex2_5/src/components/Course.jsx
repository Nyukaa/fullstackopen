const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  );
};
const Header = ({ name }) => {
  return (
    <div>
      <h2>{name}</h2>
    </div>
  );
};
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};
const Part = ({ part }) => {
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  );
};

const Total = ({ parts }) => {
  return (
    <div>
      <p>
        <strong>
          total of {parts.reduce((sum, part) => sum + part.exercises, 0)}{" "}
          exercises
        </strong>
      </p>
    </div>
  );
};
export default Course;
