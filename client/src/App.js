import React, { useState, useEffect } from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { getData } from './api';
import Loading from './components/Loading';

function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);


  // The data is sent all at once to the client side
  useEffect(() => {
    setLoading(true);
    getData().then(res => {
      setLoading(false); setData(res)
    })
      .catch(err => { setLoading(false); console.log(err) });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        RAHEED FAROOQ ASSIGNMENT
      </header>

      <Loading condition={!loading}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
            </Route>
          </Switch>
        </BrowserRouter>
      </Loading>

      <footer>
      </footer>
    </div>
  );
}

export default App;
