import React from "react";

export default function OurFallbackComponent({
    error,
    componentStack,
    resetErrorBoundary,
}) {
    return (
        <div>
            <h1>An error occurred: {error.message}</h1>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    );
}
