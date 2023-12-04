// CustomQueryProvider.js
import React, { useEffect } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  RainbowKitProvider,
  RainbowKitAuthenticationProvider,
} from "@rainbow-me/rainbowkit";
import {
  configureChains,
  createConfig,
  WagmiConfig,
  useAccount,
  ChainNotConfiguredError,
} from "wagmi";
import { mainnet, polygon, optimism, arbitrum, zora } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
  coinbaseWallet,
  braveWallet,
} from "@rainbow-me/rainbowkit/wallets";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, zora],
  [publicProvider()],
);

let projectId = "Truts Dashboard" as any;

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ projectId, chains }),
      coinbaseWallet({ appName: projectId, chains }),
      braveWallet({ name: projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const WalletAuthLayer = ({ children }: { children: React.ReactNode }) => {
  const { isConnected, address } = useAccount();

  return (
    <RainbowKitProvider modalSize="compact" chains={chains}>
      {children}
    </RainbowKitProvider>
  );
};

const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <WalletAuthLayer>{children}</WalletAuthLayer>
    </WagmiConfig>
  );
};

export default WalletProvider;
