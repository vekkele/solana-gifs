import { AnchorProvider, IdlAccounts, IdlTypes, Program } from '@project-serum/anchor';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { ConfirmOptions, Keypair, PublicKey } from '@solana/web3.js';
import { useCallback, useEffect, useState } from 'react';
import { SolanaGifs } from '../../target/types/solana_gifs';
import keypair from '../keypair/keypair.json';

const SOLANA_GIFS_PROGRAM = 'HuLCc7aj2iw2Zfb2XbVsNQpiixa6MhydxkSdf5CsMTvY';
const programId = new PublicKey(SOLANA_GIFS_PROGRAM);
const opts: ConfirmOptions = { preflightCommitment: 'processed' }

const secret = Object.values(keypair._keypair.secretKey);
export const baseAccount = Keypair.fromSecretKey(new Uint8Array(secret));

//FIXME: temp workaround for issue: https://github.com/coral-xyz/anchor/issues/1913
export type GifItem = IdlTypes<SolanaGifs>['GifItem']

export type BaseAccount = IdlAccounts<SolanaGifs>['baseAccount'] & {
  gifList?: GifItem[],
};

export default function useProgram() {
  const [program, setProgram] = useState<Program<SolanaGifs> | null>(null)

  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const updateProgram = useCallback(async () => {
    if (!wallet) {
      setProgram(null);
      return;
    }

    const provider = new AnchorProvider(connection, wallet, opts);
    const idl = await Program.fetchIdl<SolanaGifs>(programId, provider);
    if (!idl) {
      setProgram(null);
      return;
    }

    const program = new Program<SolanaGifs>(idl, programId, provider)

    setProgram(program);
  }, [connection, wallet]);

  useEffect(() => {
    updateProgram();
  }, [updateProgram]);

  const fetchAccount = useCallback(async () => {
    const account = await program?.account.baseAccount.fetchNullable(baseAccount.publicKey) as BaseAccount | null;

    return account;
  }, [program]);

  const initializeAccount = useCallback(async () => {
    await program?.methods
      .initialize()
      .accounts({ baseAccount: baseAccount.publicKey })
      .signers([baseAccount])
      .rpc()
  }, [program]);

  const addGif = useCallback(async (url: string) => {
    await program?.methods
      .addGif(url)
      .accounts({ baseAccount: baseAccount.publicKey })
      .rpc();
  }, [program]);

  return {
    wallet,
    program,
    initializeAccount,
    addGif,
    fetchAccount,
  };
}