const CountryList = ({ countries, onShowDetails }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.cca3}>
          {country.name.common}
          <button onClick={() => onShowDetails(country)}>Show </button>
        </li>
      ))}
    </ul>
  );
};
export default CountryList;
