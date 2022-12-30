import { HomeScreen } from "./screen";
import { useConnectWallet } from "@web3-onboard/react";
/*
import type { EIP1193Provider, WalletHelpers, WalletModule } from '@web3-onboard/common/dist/types';
import type { Account, ConnectedChain } from '@web3-onboard/core/dist/types';
*/
import "./App.css";
import { Header } from "./component";

const Button = ({
  children,
  className,
  onClick,
  disabled
}: {
  children: JSX.Element | string;
  className?: string;
  onClick?: () => void;
  disabled: boolean;
}) => (
  <a onClick={disabled ? () => undefined : onClick}>
    <div
      className={`Button ${disabled ? "Button-Disabled" : ""} ${
        className || ""
      }`}
    >
      {children}
    </div>
  </a>
);

export function App() {
  const [
    {
      wallet, // the wallet that has been connected or null if not yet connected
      connecting // boolean indicating if connection is in progress
    },
    connect, // function to call to initiate user to connect wallet, returns a list of WalletState objects (connected wallets)
    disconnect, // function to call with wallet<DisconnectOptions> to disconnect wallet, returns a list of WalletState objects (connected wallets)
    updateBalances, // function to be called with an optional array of wallet addresses connected through Onboard to update balance or empty/no params to update all connected wallets
    setWalletModules, // function to be called with an array of wallet modules to conditionally allow connection of wallet types i.e. setWalletModules([ledger, trezor, injected])
    setPrimaryWallet // function that can set the primary wallet and/or primary account within that wallet. The wallet that is set needs to be passed in for the first parameter and if you would like to set the primary account, the address of that account also needs to be passed in
  ] = useConnectWallet();

  return (
    <div className="App">
      {!wallet ? (
        <Header>
          <Button
            disabled={connecting}
            onClick={() => (wallet ? disconnect(wallet) : connect())}
            className="Connect"
          >
            {connecting ? "connecting" : wallet ? "disconnect" : "connect"}
          </Button>
        </Header>
      ) : (
        <HomeScreen wallet={wallet} />
      )}
    </div>
  );
}
