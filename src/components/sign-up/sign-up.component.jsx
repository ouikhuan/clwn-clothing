import React from 'react';
import './sign-up.styles.scss';
import {auth,createUserProfileDocument} from '../../firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import SignInAndSignUp from '../../pages/signin-and-signup/signin-and-signup.component';

class SignUp extends React.Component{
    constructor(){
        super();
        this.state = {
            email:'',
            displayName:'',
            password:'',
            confirmPassword:''
        }
    }

    handleChange = event => {
        const {name,value} = event.target;
        this.setState({
            [name]:value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {email,displayName,password,confirmPassword} = this.state;
        if(password!=confirmPassword){
            alert("Password doesn't match");
            return;
        }
        try{
            const {user} = await auth.createUserWithEmailAndPassword(email,password);

            await createUserProfileDocument(user,{displayName});
            this.setState({
                email:'',
                displayName:'',
                password:'',
                confirmPassword:''
            });

        }catch(error){
            console.log(error.message);
        }

    }

    render(){
        return (
            <div className="sign-up">
                <h2 className="title">I have no account</h2>
                <span>Sign up with your user name and password</span>
                <form className="signup-form" onSubmit={this.handleSubmit}>
                <FormInput name="email" value={this.state.email} type="email" label="email" handleChange={this.handleChange} />
                <FormInput name="displayName" value={this.state.displayName} type="text" label="Display Name" handleChange={this.handleChange} />
                <FormInput name="password" value={this.state.password} type="password" label="Password" handleChange={this.handleChange} />
                <FormInput name="confirmPassword" value={this.state.confirmPassword} type="password" label="confirmPassword" handleChange={this.handleChange} />
                <CustomButton type="submit">SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;