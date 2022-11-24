import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaGifs } from "../target/types/solana_gifs";

describe("solana-gifs", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaGifs as Program<SolanaGifs>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
