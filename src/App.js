import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";

function App() {
  const CAR_YEAR_LIMIT = {
    MIN: 1980,
    MAX: new Date().getFullYear(),
  };
  const [searchAttributes, setSearchAttributes] = useState({
    type: "",
    make: "",
    year: "",
  });

  return (
    <Router>
      <Switch>
        <Route path="/results">
          <Results
            searchAttributes={searchAttributes}
            searchSetter={setSearchAttributes}
            yearLimit={CAR_YEAR_LIMIT}
          />
        </Route>
        <Route path="/">
          <Home
            searchAttributes={searchAttributes}
            searchSetter={setSearchAttributes}
            yearLimit={CAR_YEAR_LIMIT}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
