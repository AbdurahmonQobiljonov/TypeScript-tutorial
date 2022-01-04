import React,{Component, ErrorInfo} from 'react';
import {IError} from "../../interfaces/interfaces";
import ErrorMassage from "../errorMassage/ErrorMassage";

type ChildrenProps={
    children:React.ReactElement,
}

class ErrorBoundary extends Component<ChildrenProps> {
    state: IError = {
        error: false,
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log(error,errorInfo);
        this.setState({error: true});
    }

    render():JSX.Element {
        if (this.state.error) {
            return (
                <ErrorMassage/>
            )
        }

        return this.props.children;
    }

}

export default ErrorBoundary;