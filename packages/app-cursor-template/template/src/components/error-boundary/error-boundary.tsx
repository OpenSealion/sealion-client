import { Component, ErrorInfo, ReactNode } from 'react';
import { detector } from '@easycode/client-detector';
import ErrorBoundaryMessage from '@components/error-boundary-message';

export interface ErrorBoundaryProps {
    children: ReactNode;
}

export interface ErrorBoundaryStates {
    hasError: boolean;
    error: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryStates> {
    static getDerivedStateFromError(error: Error) {
        return {
            hasError: true,
            message: error.message,
            error,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: new Error('Unknow error!'),
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // errorInfo是以组件为单位的调用栈
        detector.sendError0(error, errorInfo.componentStack || '');
    }

    render() {
        if (this.state.hasError) {
            return <ErrorBoundaryMessage error={this.state.error} />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
