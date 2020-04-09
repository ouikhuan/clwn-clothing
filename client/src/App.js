import React,{useEffect,lazy,Suspense} from 'react';
import {connect} from 'react-redux';
import {Switch,Route,Redirect} from 'react-router-dom';

import {GlobalStyles} from './global.styles';
import Header from './components/header/header.component';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from './redux/user/users.selectors';
import {checkUserSession} from './redux/user/user.actions';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

const Homepage = lazy(()=>import('./pages/homepage/hompage.component'));
const ShopPage = lazy(()=>import('./pages/shoppage/shoppage.component'));
const SignInAndSignUp = lazy(()=>import('./pages/signin-and-signup/signin-and-signup.component'));
const Checkout = lazy(()=>import('./pages/checkout/checkout.component'));


const App = ({checkUserSession,currentUser}) => {

  useEffect(()=>{
    checkUserSession();
  },[checkUserSession]);

  return (
    <div>
      <GlobalStyles />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/signin" render={()=>currentUser?(<Redirect to="/" />):(<SignInAndSignUp />) } />
          <Route exact path="/checkout" component={Checkout} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );

}

const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: ()=> dispatch(checkUserSession())
})


export default connect(mapStateToProps,mapDispatchToProps)(App);
