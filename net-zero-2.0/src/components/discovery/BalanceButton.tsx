import { ConnectButton } from "thirdweb/react";
import { createWallet, walletConnect, inAppWallet } from "thirdweb/wallets";

import { createThirdwebClient } from "thirdweb";
import { IonHeader } from "@ionic/react";

export default function BalanceButton() {
  const client = createThirdwebClient({
    clientId: process.env.REACT_APP_CLIENT_ID!,
  });

  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    walletConnect(),
    inAppWallet({
      auth: {
        options: ["email", "google", "apple", "facebook", "phone"],
      },
    }),
  ];

  return (
    <ConnectButton
      connectButton={{
        style: {
          backgroundColor: "white",
          color: "black",
          borderRadius: "0.5rem",
        },
        label: "Sign Up",
      }}
      client={client}
      wallets={wallets}
      connectModal={{ size: "wide" }}
    />
  );
}
