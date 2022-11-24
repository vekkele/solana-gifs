'use client';

import { WalletDisconnectButton, WalletModalButton, WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

export default function WalletButton() {
  const { connected } = useWallet();

  return (
    <WalletModalProvider>
      {connected ? <WalletDisconnectButton /> : <WalletModalButton />}
    </WalletModalProvider>
  );
}