import React from 'react';
import logo from './logo.svg';
import './App.css';
import Homepage from './pages/homepage/hompage.component';
import ShopPage from './pages/shoppage/shoppage.component';
import {Switch,Route} from 'react-router-dom';
import Header from './components/header/header.component';

const HatsPage = ()=>(
  <div><h2>HATS PAGE</h2></div>
)

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/shop" component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
