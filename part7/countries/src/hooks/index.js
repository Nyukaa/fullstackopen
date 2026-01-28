import axios from "axios";
import { useState, useEffect } from "react";

//field hook
export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};
//country hook
export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (!name) {
      setCountry(null);
      return;
    }

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then((response) => {
        setCountry({ data: response.data, found: true });
      })
      .catch((error) => {
        setCountry({ found: false });
      });
  }, [name]);

  return country;
};
