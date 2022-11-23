import WalletButton from '../components/WalletButton';
import WalletContextProvider from '../components/WalletContextProvider';

export default function Home() {
  return (
    <WalletContextProvider>
      <header className="flex justify-end p-4">
        <WalletButton />
      </header>
      <main className="flex flex-col justify-center items-center flex-auto min-h-screen py-16 px-0">
        <h1 className="text-4xl font-bold">Gifs</h1>
      </main>
    </WalletContextProvider>
  )
}
