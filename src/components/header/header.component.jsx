import React from 'react';
import { createStructuredSelector } from "reselect";
import {ReactComponent as Logo} from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {selectCurrentUser} from '../../redux/user/users.selectors';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {HeaderContainer,LogoContainer,OptionsContainer,OptionLink} from './header.styles';


const Header = ({currentUser,hidden})=>(
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className="logo" />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to="/shop" >
                SHOP
            </OptionLink>
            <OptionLink to="/shop" >
                CONTACT
            </OptionLink>
            {
                currentUser?
                <OptionLink as="div" onClick={()=>{auth.signOut()}}>SIGNOUT</OptionLink>
                :<OptionLink to="/signin">
                SIGNIN
                </OptionLink>
            }
            <CartIcon />
        </OptionsContainer>
        { hidden?null:<CartDropdown /> }
    </HeaderContainer>
)
const mapStateToProps = createStructuredSelector({
    currentUser:selectCurrentUser,
    hidden:selectCartHidden

});


export default connect(mapStateToProps)(Header);
