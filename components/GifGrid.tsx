'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import Image from 'next/image'
import { useEffect, useState } from 'react';

const TEST_GIFS = [
  'https://media.giphy.com/media/4ilFRqgbzbx4c/giphy.gif',
  'https://media.giphy.com/media/ayMW3eqvuP00o/giphy.gif',
  'https://media.giphy.com/media/u2LJ0n4lx6jF6/giphy.gif',
  'https://media.giphy.com/media/naiatn5LxTOsU/giphy.gif',
  'https://media.giphy.com/media/b5Hcaz7EPz26I/giphy.gif',
]

export default function GifGrid() {
  const [gifList, setGifList] = useState<string[]>([]);
  const { connected } = useWallet();

  useEffect(() => {
    if (!connected) {
      console.log('Fetching gif list...');
    }

    setGifList(TEST_GIFS);
  }, [connected]);

  if (!connected) {
    return (
      <div>You need to connect wallet to see gifs</div>
    );
  }

  return (
    <div className="grid gap-4 w-full justify-center p-3 items-center grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]">
      {gifList.map(gif => (
        <div key={gif} >
          <Image
            src={gif}
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