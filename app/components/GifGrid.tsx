'use client';

import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react';
import useProgram, { baseAccount, GifItem } from '../hooks/useProgram';

export default function GifGrid() {
  const [gifList, setGifList] = useState<GifItem[] | undefined>();
  const wallet = useAnchorWallet();

  const { connection } = useConnection();
  const { program, initializeAccount } = useProgram({ wallet, connection })

  const fetchList = useCallback(async () => {
    const account = await program?.account.baseAccount.fetchNullable(baseAccount.publicKey);
    console.log('Got the account', account)

    const gifList = account?.gifList as GifItem[] | undefined;

    setGifList(gifList);
  }, [program])

  const initialize = useCallback(async () => {
    await initializeAccount();
    await fetchList();
  }, [fetchList, initializeAccount])

  useEffect(() => {
    if (!wallet) {
      console.log('Fetching gif list...');
    }

    fetchList()
  }, [wallet, program, fetchList]);

  if (!wallet) {
    return (
      <div>You need to connect wallet to see gifs</div>
    );
  }

  if (!gifList) {
    return (
      <button
        onClick={initialize}
        className="px-3 py-2 rounded-2xl bg-purple-700"
      >
        Do One-Time Initialization For GIF Program Account
      </button>
    )
  }

  return (
    <div className="grid gap-4 w-full justify-center p-3 items-center grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]">
      {gifList.map(gif => (
        <div key={gif.gifUrl} >
          <Image
            src={gif.gifUrl}
            alt=""
            className="w-full h-auto"
            width={0}
            height={0}
            priority />
        </div>
      ))}
    </div>
  )
}