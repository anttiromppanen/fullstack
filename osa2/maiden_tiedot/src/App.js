import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ShowCountries from "./components/ShowCountries";
import Filter from "./components/Filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all")
      .then((res) => setCountries(res.data));
  }, []);

  const filteredCountries = countries.filter((x) =>
    x.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div>
      <Filter filterValue={filterValue} setFilterValue={setFilterValue} />
      <ShowCountries
        countries={filteredCountries}
        setFilterValue={setFilterValue}
      />
    </div>
  );
};

export default App;
