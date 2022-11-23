'use client';

import { useEffect, useState } from 'react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function WalletButton() {
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => setButtonVisible(true), []);

  return (
    <WalletModalProvider>
      {buttonVisible && <WalletMultiButton />}
    </WalletModalProvider>
  );
}