import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import CountryDetail from "./components/CountryDetail.jsx";
import CountryList from "./components/CountryList.jsx";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setQuery(newValue);
    setSelectedCountry(null);
    setFiltered(
      countries.filter((c) =>
        c.name.common.toLowerCase().includes(newValue.toLowerCase())
      )
    );
  };
  // countries.filter(
  //   (c) => c.name.common.toLowerCase().indexOf(newValue.toLowerCase()) >= 0

  const handleShowDetails = (country) => {
    setSelectedCountry(country);
  };
  let content;
  if (filtered.length > 10) {
    content = <p>Too many matches, please be more specific.</p>;
  } else if (filtered.length > 1) {
    console.log("filtered");
    if (selectedCountry) {
      content = <CountryDetail country={selectedCountry} />;
    } else {
      content = (
        <CountryList countries={filtered} onShowDetails={handleShowDetails} />
      );
    }
  } else if (filtered.length === 1) {
    console.log(filtered[0]);
    content = <CountryDetail country={filtered[0]} />;
  }
  return (
    <div>
      <h1>Country Information</h1>
      <input type="text" value={query} onChange={handleChange} />
      {content}
    </div>
  );
};

export default App;
