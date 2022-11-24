'use client';

import { WalletDisconnectButton, WalletModalButton, WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

export default function WalletButton() {
  const { connected } = useWallet();
  const buttonClass = 'wallet-adapter-button-trigger !rounded-full !leading-9 !h-9';

  return (
    <WalletModalProvider>
      {connected
        ? <WalletDisconnectButton className={buttonClass} />
        : <WalletModalButton className={buttonClass} />
      }
    </WalletModalProvider>
  );
}