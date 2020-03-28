import React from 'react';
import logo from './logo.svg';
import './App.css';
import Homepage from './pages/homepage/hompage.component';
import ShopPage from './pages/shoppage/shoppage.component';
import SignInAndSignUp from './pages/signin-and-signup/signin-and-signup.component';
import {Switch,Route} from 'react-router-dom';
import Header from './components/header/header.component';
import {auth} from './firebase/firebase.utils';


class App extends React.Component {

  constructor(){
    super();
    this.state = {
      currentUser:null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user)=>{
      console.log(user);
      this.setState({
        currentUser:user
      });
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }

}

export default App;
