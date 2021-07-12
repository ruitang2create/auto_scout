import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import Axios from 'axios';

function App() {
  const CAR_YEAR_MIN = 1980;
  const CAR_YEAR_MAX = new Date().getFullYear();
  const [searchAttributes, setSearchAttributes] = useState({
    type: '',
    make: '',
    year: CAR_YEAR_MAX,
  });

  return (
    <Router>
      <Switch>
        <Route path="/results">
          <Results
            searchAttributes={searchAttributes}
            searchSetter={setSearchAttributes}
          />
        </Route>
        <Route path="/">
          <Home
            searchAttributes={searchAttributes}
            searchSetter={setSearchAttributes}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
