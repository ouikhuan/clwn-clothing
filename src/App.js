import React from 'react';
import logo from './logo.svg';
import './App.css';
import Homepage from './pages/homepage/hompage.component';

import {Switch,Route} from 'react-router-dom';

const HatsPage = ()=>(
  <div><h2>HATS PAGE</h2></div>
)

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/shop/hats" component={HatsPage} />
      </Switch>
    </div>
  );
}

export default App;
