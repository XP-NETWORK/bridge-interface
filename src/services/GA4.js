import ReactGA from "react-ga4";

const tagId = window.location.hostname.includes("temporary")
    ? "G-28QX2ZF8PV"
    : window.location.hostname.includes("staging")
    ? "G-DWQH0ZR376"
    : "G-28QX2ZF8PV";

ReactGA.initialize(tagId);
ReactGA.set({ appName: "CROSS-CHAIN NFT BRIDGE" });

export const googleAnalyticsCategories = {
    Connect: "connect",
    Approve: "approve",
    Transfer: "transfer",
    Content: "content",
    Chain: "chain",
    Error: "error",
    UserInf: "userInf",
    Button: "button",
    Whitelist: "whitelist",
};

export const handleGA4Event = (
    category,
    action,
    label,
    value,
    nonInteraction
) => {
    ReactGA.event({
        category,
        action,
        label: label || undefined, // optional
        value: value || undefined, // optional, must be a number
        nonInteraction: nonInteraction || undefined, // optional, true/false
        transport: "xhr", // optional, beacon/xhr/image
    });
};

export default ReactGA;
