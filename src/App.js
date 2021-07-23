import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios';
import Home from "./pages/Home";
import Results from "./pages/Results";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Global.css';

function App() {
  const CAR_YEAR_LIMIT = {
    MIN: 1980,
    MAX: new Date().getFullYear(),
  };
  const [searchCriteria, setSearchCriteria] = useState({
    type: "",
    make: "",
    year: "",
  });
  const [allMakes, setAllMakes] = useState([]);
  const [types, setTypes] = useState([]);

  const getAllMakes = async () => {
    try {
      let apiUrl = "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json";
      // console.log("getting all car makers...");
      const res = await axios.get(apiUrl);
      setAllMakes(res.data.Results);
    } catch (err) {
      console.error(err);
    }
  };

  const getAllTypes = async (make) => {
    try {
      let apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/${make}?format=json`;
      // console.log(`getting all car types from ${make}...`);
      const res = await axios.get(apiUrl);
      const cleanRes = [];
      for (let i = 0; i < res.data.Results.length; i++) {
        if (res.data.Results[i].MakeName === make) {
          cleanRes.push(res.data.Results[i]);
        }
      }
      setTypes(cleanRes);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Router>
      <Switch>
        <Route path="/results">
          <Results
            searchCriteria={searchCriteria}
            searchSetter={setSearchCriteria}
            yearLimit={CAR_YEAR_LIMIT}
            types={types}
            setTypes={setTypes}
            allMakes={allMakes}
            setAllMakes={setAllMakes}
            getAllMakes={getAllMakes}
            getAllTypes={getAllTypes}
          />
        </Route>
        <Route path="/">
          <Home
            searchCriteria={searchCriteria}
            searchSetter={setSearchCriteria}
            yearLimit={CAR_YEAR_LIMIT}
            types={types}
            setTypes={setTypes}
            allMakes={allMakes}
            setAllMakes={setAllMakes}
            getAllMakes={getAllMakes}
            getAllTypes={getAllTypes}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
