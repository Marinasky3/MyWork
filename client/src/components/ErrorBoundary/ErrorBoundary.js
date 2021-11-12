import { Component } from 'react';
import { ErrorIllustration } from '../../svg_elements/ErrorIllustration'
import './ErrorBoundary.scss'
export class ErrorBoundary extends Component {
    state = {
        error: null
    };

    static getDerivedStateFromError(error) {
        return { error };
    }

    sayHello() {
        console.log('Hello!');
    }

    render() {
        const { error } = this.state;
        const { children, additionalPage } = this.props;

        if (error) {
            // const { name, message, stack } = error;

            // return additionalPage({ error, onSayHello: this.sayHello });

            return (
                <div className="errorBoundary_wrapper">
                    <ErrorIllustration />
                    <div className="">Oops, something went wrong.</div>
                    <div className="">Please restart page to continue</div>
                </div>
                
            );
        }

        return children;
    }
}
