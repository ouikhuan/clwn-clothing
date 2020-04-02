import React from 'react';
import './header.styles.scss';
import {Link} from 'react-router-dom';
import { createStructuredSelector } from "reselect";
import {ReactComponent as Logo} from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {selectCurrentUser} from '../../redux/user/users.selectors';
import {selectCartHidden} from '../../redux/cart/cart.selectors';



const Header = ({currentUser,hidden})=>(
    <div className="header">
        <Link to="/" className="logo-container">
            <Logo className="logo" />
        </Link>
        <div className="options">
            <Link to="/shop" className="option">
                SHOP
            </Link>
            <Link to="/shop" className="option">
                CONTACT
            </Link>
            {
                currentUser?
                <div className="option" onClick={()=>{auth.signOut()}}>SIGNOUT</div>
                :<Link to="/signin" className="option">
                SIGNIN
                </Link>
            }
            <CartIcon />
        </div>
        { hidden?null:<CartDropdown /> }
    </div>
)
const mapStateToProps = createStructuredSelector({
    currentUser:selectCurrentUser,
    hidden:selectCartHidden

});


export default connect(mapStateToProps)(Header);
