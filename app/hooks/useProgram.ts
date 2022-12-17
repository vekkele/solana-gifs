import { AnchorProvider, Program, Wallet, web3 } from '@project-serum/anchor';
import { ConfirmOptions, Connection, Keypair, PublicKey } from '@solana/web3.js';
import { useCallback, useEffect, useState } from 'react';
import { SolanaGifs } from '../../target/types/solana_gifs';

const SOLANA_GIFS_PROGRAM = 'HuLCc7aj2iw2Zfb2XbVsNQpiixa6MhydxkSdf5CsMTvY';
const programId = new PublicKey(SOLANA_GIFS_PROGRAM);
const opts: ConfirmOptions = { preflightCommitment: 'processed' }

//FIXME: Regenerating on page reload
export const baseAccount = Keypair.generate();

export interface UseProgramProps {
  connection: Connection,
  wallet?: Pick<Wallet, 'publicKey' | 'signAllTransactions' | 'signTransaction'>,
}

//FIXME: temp workaround for issue: https://github.com/coral-xyz/anchor/issues/1913
export type GifItem = {
  gifUrl: string
  userAddress: web3.PublicKey
}

export default function useProgram({ connection, wallet }: UseProgramProps) {
  const [program, setProgram] = useState<Program<SolanaGifs> | null>(null)

  const updateProgram = useCallback(async () => {
    console.log({ wallet });
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

  const initializeAccount = useCallback(async () => {
    await program?.methods
      .initialize()
      .accounts({ baseAccount: baseAccount.publicKey })
      .signers([baseAccount])
      .rpc()
  }, [program]);

  return {
    program,
    initializeAccount,
  };
}