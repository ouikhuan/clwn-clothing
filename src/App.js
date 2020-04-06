import React from 'react';
import {connect} from 'react-redux';
import {Switch,Route,Redirect} from 'react-router-dom';

import './App.css';
import Homepage from './pages/homepage/hompage.component';
import ShopPage from './pages/shoppage/shoppage.component';
import Checkout from './pages/checkout/checkout.component';

import SignInAndSignUp from './pages/signin-and-signup/signin-and-signup.component';
import Header from './components/header/header.component';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from './redux/user/users.selectors';
import {checkUserSession} from './redux/user/user.actions';


class App extends React.Component {

  componentDidMount(){
    const {checkUserSession} = this.props;
    checkUserSession();
  }

  render(){
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
  currentUser:selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: ()=> dispatch(checkUserSession())
})


export default connect(mapStateToProps,mapDispatchToProps)(App);
