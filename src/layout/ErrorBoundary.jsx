import React, { Component } from "react";
import OurFallbackComponent from "./OurFallbackComponent";

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        console.log(error);
        return { hasError: true };
    }

    componentDidCatch(error) {
        // You can also log the error to an error reporting service
        console.log(error);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <OurFallbackComponent />;
        }

        // eslint-disable-next-line react/prop-types
        return this.props.children;
    }
}
