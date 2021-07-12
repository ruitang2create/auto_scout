import React from 'react';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta charSet='utf-8' />
        <title>Auto Scout</title>
        <meta name='description' content='A application that help you find auto models information' />
      </Helmet>
    </div>
  );
}

export default App;
