const CountryDetail = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <img src={country.flags.png} alt={country.name.common} width="200" />
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <p>Languages: {Object.values(country.languages).join(", ")}</p>
    </div>
  );
};
export default CountryDetail;
