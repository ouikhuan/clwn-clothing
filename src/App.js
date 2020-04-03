import React from 'react';
import {connect} from 'react-redux';
import {Switch,Route,Redirect} from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import Homepage from './pages/homepage/hompage.component';
import ShopPage from './pages/shoppage/shoppage.component';
import Checkout from './pages/checkout/checkout.component';

import SignInAndSignUp from './pages/signin-and-signup/signin-and-signup.component';
import Header from './components/header/header.component';
import {auth,createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from './redux/user/users.selectors';


class App extends React.Component {


  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{

      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
        });

      }else{
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    console.log(this.props);
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/signin" render={()=>this.props.currentUser?(<Redirect to="/" />):(<SignInAndSignUp />) } />
          <Route exact path="/checkout" component={Checkout} />
        </Switch>
      </div>
    );
  }

}

const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
