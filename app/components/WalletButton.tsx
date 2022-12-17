'use client';

import { WalletDisconnectButton, WalletModalButton, WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { useAnchorWallet } from '@solana/wallet-adapter-react';

export default function WalletButton() {
  const wallet = useAnchorWallet();
  const buttonClass = 'wallet-adapter-button-trigger !rounded-full !leading-9 !h-9';

  return (
    <WalletModalProvider>
      {wallet
        ? <WalletDisconnectButton className={buttonClass} />
        : <WalletModalButton className={buttonClass} />
      }
    </WalletModalProvider>
  );
}