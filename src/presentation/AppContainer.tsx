import { App } from "./App";
import "./AppContainer.css";

import injectedModule from "@web3-onboard/injected-wallets";
import { init, Web3OnboardProvider } from "@web3-onboard/react";
import walletConnectModule from "@web3-onboard/walletconnect";

/*
const CHAIN_TaikoA1_L1 = {
  id: "0x7a6a",
  token: "ETH",
  label: "Taiko A1 - Layer 1",
  rpcUrl: "https://l1rpc.a1.taiko.xyz"
};
*/

const CHAIN_TaikoA1_L2 = {
  id: "0x28c5b",
  token: "ETH",
  label: "Taiko A1 - Layer 2",
  rpcUrl: "https://l2rpc.a1.taiko.xyz"
};

const chains = [
  //  CHAIN_TaikoA1_L1,
  CHAIN_TaikoA1_L2
];

const walletConnect = walletConnectModule({
  qrcodeModalOptions: {
    mobileLinks: ["rainbow", "metamask", "argent", "trust", "imtoken", "pillar"]
  },
  connectFirstChainId: true
});

const wallets = [injectedModule(), walletConnect];

const web3Onboard = init({
  wallets,
  chains,
  appMetadata: {
    name: "Guestbook at Taiko A1",
    icon: "<svg>App Icon</svg>",
    description: "Simple guestbook for Taiko A1 testing"
  }
});

export default function AppContainer() {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <App />
    </Web3OnboardProvider>
  );
}
