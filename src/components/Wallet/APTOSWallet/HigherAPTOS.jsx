import React from "react";

export default function HigherAPTOS(OriginalComponent) {
    return function updatedComponent() {
        const getStyles = () => {};

        const connectWallet = (wallet) => {
            switch (wallet) {
                case "Martian":
                    break;
                case "Petra":
                    break;
                case "Pontem":
                    break;
                default:
                    break;
            }
        };
        return (
            <OriginalComponent
                styles={getStyles}
                connectWallet={connectWallet}
            />
        );
    };
}
