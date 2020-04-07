import React,{useState} from 'react';
import './signin.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {googleSignInStart,emailSignInStart} from '../../redux/user/user.actions';
import {connect} from 'react-redux';

const SignIn = ({emailSignInStart,googleSignInStart}) => {
    const [userCredentials, setUserCredentials] = useState({
        email:'',
        password:''
    });

    const {email,password} = userCredentials;

    const handleChange = (event)=> {
        const { value, name } = event.target;
        setUserCredentials({
            ...userCredentials,
            [name]:value
        });
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        emailSignInStart(email,password);
    }



    return (
        <div className="sign-in">
            <h2 className="title">I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput name="email" value={email} type="email" label="email" handleChange={handleChange} />
                <FormInput name="password" value={password} type="password" label="password" handleChange={handleChange} />
                <div className="buttons">
                    <CustomButton type='submit'>Sign in</CustomButton>
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn >Sign in with Google</CustomButton>
                </div>

            </form>
        </div>
    )

}

const mapDispatchToprops = dispatch =>({
    googleSignInStart: ()=> dispatch(googleSignInStart()),
    emailSignInStart: (email,password)=>dispatch(emailSignInStart({email,password}))
});
export default connect(null,mapDispatchToprops)(SignIn);