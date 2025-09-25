const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      <label htmlFor="filter">filter shown with: </label>
      <input value={newFilter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
