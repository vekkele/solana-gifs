import AddGifForm from '../components/AddGifForm';
import GifGrid from '../components/GifGrid';
import WalletButton from '../components/WalletButton';
import WalletContextProvider from '../components/WalletContextProvider';

export default function Home() {
  return (
    <WalletContextProvider>
      <header className="flex justify-end items-center h-20 px-4 m-2 rounded-2xl bg-slate-500">
        <WalletButton />
      </header>
      <main className="flex flex-col items-center flex-auto min-h-screen py-10 px-0">
        <h1 className="text-4xl font-bold mb-4">GIF Portal</h1>
        <p>View your favourite gifs through solana blockchain</p>
        <AddGifForm />
        <GifGrid />
      </main>
    </WalletContextProvider>
  )
}
