import React from 'react';
import './signin.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {googleSignInStart,emailSignInStart} from '../../redux/user/user.actions';
import {connect} from 'react-redux';

class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:''
        }
    }

    handleChange = (event)=> {
        const { value, name } = event.target;
        this.setState({
            [name]:value
        });
    }

    handleSubmit = async (event) =>{
        event.preventDefault();
        const {email,password} = this.state;
        const {emailSignInStart} = this.props;
        emailSignInStart(email,password);
    }

    render(){
        const {googleSignInStart} = this.props;
        return (
            <div className="sign-in">
                <h2 className="title">I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email" value={this.state.email} type="email" label="email" handleChange={this.handleChange} />
                    <FormInput name="password" value={this.state.password} type="password" label="password" handleChange={this.handleChange} />
                    <div className="buttons">
                        <CustomButton type='submit'>Sign in</CustomButton>
                        <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn >Sign in with Google</CustomButton>
                    </div>

                </form>
            </div>
        )
    }
}

const mapDispatchToprops = dispatch =>({
    googleSignInStart: ()=> dispatch(googleSignInStart()),
    emailSignInStart: (email,password)=>dispatch(emailSignInStart({email,password}))
});
export default connect(null,mapDispatchToprops)(SignIn);