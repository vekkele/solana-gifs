import styles from './page.module.css';
import WalletButton from '../components/WalletButton';
import WalletContextProvider from '../components/WalletContextProvider';

export default function Home() {
  return (
    <WalletContextProvider>
      <header className={styles.header}>
        <WalletButton />
      </header>
      <main className={styles.main}>
        <h1>Gifs</h1>
      </main>
    </WalletContextProvider>

  )
}
