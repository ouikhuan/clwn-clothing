import React from 'react';
import {ErrorImageOverlay,ErrorImageContainer,ErrorImageText} from './error-boundary.styles';

class ErrorBoundary extends React.Component{
    constructor(){
        super();
        this.state = {
            hasError:false
        }
    }

    static getDerivedStateFromError(error) {
        console.log("run errror");
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    }

    render(){
        if(this.state.hasError){
            return (<ErrorImageOverlay>
                <ErrorImageContainer imageUrl='https://i.imgur.com/qIufhof.png' />
                <ErrorImageText>This page is broken</ErrorImageText>
                </ErrorImageOverlay>);
        }

        return this.props.children;
    }
}

export default ErrorBoundary;