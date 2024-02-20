import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorBoundaryMessage from '@components/error-boundary-message';

export interface ErrorBoundaryProps {
    children: ReactNode;
}

export interface ErrorBoundaryStates {
    hasError: boolean;
    error: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryStates> {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: new Error('Unknow error!')
        };
    }

    static getDerivedStateFromError(error: Error) {
        return {
            hasError: true,
            message: error.message,
            error
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // 在这里可以把错误信息发送到后端
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <ErrorBoundaryMessage error={this.state.error} />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
