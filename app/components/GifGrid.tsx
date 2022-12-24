'use client';

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react';
import useProgram, { BaseAccount, baseAccount, GifItem } from '../hooks/useProgram';

export default function GifGrid() {
  const [gifList, setGifList] = useState<GifItem[] | undefined>([]);
  const { wallet, program, initializeAccount, fetchAccount } = useProgram()

  const handleAccountChange = useCallback((event: BaseAccount) => {
    setGifList(event.gifList);
  }, [])

  const fetchList = useCallback(async () => {
    const account = await fetchAccount();
    setGifList(account?.gifList);
  }, [fetchAccount])

  const subscribeToList = useCallback(() => {
    const emitter = program?.account.baseAccount.subscribe(baseAccount.publicKey);

    emitter?.addListener('change', handleAccountChange);

    return emitter;
  }, [handleAccountChange, program])

  useEffect(() => {
    if (!wallet || !program) {
      console.log('Fetching gif list...');
      return;
    }

    fetchList();
    const emitter = subscribeToList();

    return () => { emitter?.removeListener('change', handleAccountChange) };
  }, [wallet, program, subscribeToList, handleAccountChange, fetchList]);

  if (!wallet) {
    return (
      <div>You need to connect wallet to see gifs</div>
    );
  }

  if (!gifList) {
    return (
      <button
        onClick={initializeAccount}
        className="px-3 py-2 rounded-2xl bg-purple-700"
      >
        Do One-Time Initialization For GIF Program Account
      </button>
    )
  }

  if (gifList.length === 0) {
    return (
      <div>No gifs added. Feel free to submit one</div>
    );
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