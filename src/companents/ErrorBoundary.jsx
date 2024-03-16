import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    console.error('Error caught by boundary:', error, errorInfo);
  }

  refresh() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1 >404 Error</h1>
          <button onClick={this.refresh}>refresh</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;