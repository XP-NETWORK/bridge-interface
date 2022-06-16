import { InjectedConnector } from "@web3-react/injected-connector";

   export const InjectedMetaMask = new InjectedConnector({
    supportedChainIds: [4, 1, 3, 5, 42, 137, 80001]
   });