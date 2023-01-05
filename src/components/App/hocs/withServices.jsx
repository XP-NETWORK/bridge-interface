import React from "react";

import { ServiceConsumer } from "./serviceProvider";

const withServices = (Wrapped) =>
    function CallBack(props) {
        return (
            <ServiceConsumer>
                {({ serviceContainer, setContainer }) => (
                    <Wrapped
                        {...props}
                        serviceContainer={serviceContainer}
                        setContainer={setContainer}
                    />
                )}
            </ServiceConsumer>
        );
    };

export { withServices };
