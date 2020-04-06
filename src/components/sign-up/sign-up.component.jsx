import React from 'react';
import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {signUpStart} from '../../redux/user/user.actions';
import {connect} from 'react-redux';


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
        const {signUpStart} = this.props;

        const {email,displayName,password,confirmPassword} = this.state;
        if(password !== confirmPassword){
            alert("Password doesn't match");
            return;
        }

        signUpStart({email,displayName,password});
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

const mapDispatchToProps = dispatch => ({
    signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
});

export default connect(null,mapDispatchToProps)(SignUp);