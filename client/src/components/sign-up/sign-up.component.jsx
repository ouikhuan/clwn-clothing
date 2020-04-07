import React,{useState} from 'react';
import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {signUpStart} from '../../redux/user/user.actions';
import {connect} from 'react-redux';


const SignUp = ({signUpStart}) => {
    const [userCredentials,setUserCredentials] = useState({
        email:'',
        displayName:'',
        password:'',
        confirmPassword:''
    });

    const {email,displayName,password,confirmPassword} = userCredentials;

    const handleChange = event => {
        const {name,value} = event.target;
        setUserCredentials({
            ...userCredentials,
            [name]:value
        });
    }

    const handleSubmit = async event => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert("Password doesn't match");
            return;
        }

        signUpStart({email,displayName,password});
    }


    return (
        <div className="sign-up">
            <h2 className="title">I have no account</h2>
            <span>Sign up with your user name and password</span>
            <form className="signup-form" onSubmit={handleSubmit}>
            <FormInput name="email" value={email} type="email" label="email" handleChange={handleChange} />
            <FormInput name="displayName" value={displayName} type="text" label="Display Name" handleChange={handleChange} />
            <FormInput name="password" value={password} type="password" label="Password" handleChange={handleChange} />
            <FormInput name="confirmPassword" value={confirmPassword} type="password" label="confirmPassword" handleChange={handleChange} />
            <CustomButton type="submit">SIGN UP</CustomButton>
            </form>
        </div>
    )

}

const mapDispatchToProps = dispatch => ({
    signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
});

export default connect(null,mapDispatchToProps)(SignUp);