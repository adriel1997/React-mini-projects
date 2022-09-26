import React, { Component, PropsWithChildren } from 'react';

type State = {
  error?: Error;
};

class ErrorBlock extends Component<PropsWithChildren, State> {
  state: State = {
    error: undefined,
  };

  static getDerivedStateFromError(error: Error) {
    return {
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(errorInfo.componentStack);
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    if (error) {
      return <h1>{error.message}</h1>;
    }

    return children;
  }
}

export default ErrorBlock;
