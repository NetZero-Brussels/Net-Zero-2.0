import { ConnectButton } from "thirdweb/react";
import { createWallet, walletConnect, inAppWallet } from "thirdweb/wallets";

import { createThirdwebClient } from "thirdweb";
import { IonHeader } from "@ionic/react";

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

export default function ThirdwebSignUp() {
  return (
    <ConnectButton
      connectButton={{
        style: {
          backgroundColor: "#003778",
          color: "white",
        },
        label: "Log In",
      }}
      client={client}
      wallets={wallets}
      connectModal={{ size: "wide" }}
    />
  );
}
