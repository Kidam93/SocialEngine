import 'bootstrap/dist/css/bootstrap.css';
import {Login} from './home/Login.js';
import {Register} from './home/Register';
import {Disconnected} from './home/Disconnected';
import {Profil} from './profil/Profil.js';
import {Search} from './search/Search.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { Confirmed } from './home/Confirmed.js';
import React, { useEffect, useState } from 'react';

function App() {
  const [id, setId] = useState(null)

  useEffect(() => {
    console.log("App", id)
  });

  return (

    <div className="App">
      <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Login id={setId} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/profil">
            <Profil />
          </Route>
          <Route path="/disconnected">
            <Disconnected />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path='/confirmed/:id-:token' component={Confirmed} />
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;