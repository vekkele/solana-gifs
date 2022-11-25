import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { assert } from "chai";
import { SolanaGifs } from "../target/types/solana_gifs";

describe("solana-gifs", () => {
  const { SystemProgram } = anchor.web3;
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.SolanaGifs as Program<SolanaGifs>;
  const baseAccount = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    console.log("🚀 Initializing...");
    const tx = await program.methods.initialize()
      .accounts({
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([baseAccount])
      .rpc();

    console.log("📝 Your transaction signature", tx);

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    const totalGifs = account.totalGifs;
    console.log("👀 Total gifs:", totalGifs);

    const expected = 0;
    assert(account.totalGifs.eqn(expected), `totalGifs equals ${totalGifs}. Expected: ${expected}`);
  });

  it("Adds a gif", async () => {
    console.log("🚀 Adding a gif...");
    const tx = await program.methods.addGif()
      .accounts({ baseAccount: baseAccount.publicKey })
      .rpc();

    console.log("📝 Your transaction signature", tx);

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    const totalGifs = account.totalGifs;
    console.log("👀 Total gifs:", totalGifs);

    const expected = 1;
    assert(account.totalGifs.eqn(expected), `totalGifs equals ${totalGifs}. Expected: ${expected}`);
  })
});
