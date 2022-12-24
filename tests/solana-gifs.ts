import * as anchor from "@project-serum/anchor";
import { assert } from "chai";
import { SolanaGifs } from "../target/types/solana_gifs";

//FIXME: temp workaround for issue: https://github.com/coral-xyz/anchor/issues/1913
type GifItem = anchor.IdlTypes<SolanaGifs>['GifItem']

describe("solana-gifs", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.SolanaGifs as anchor.Program<SolanaGifs>;

  const baseAccount = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    console.log("🚀 Initializing...");
    const tx = await program.methods.initialize()
      .accounts({ baseAccount: baseAccount.publicKey })
      .signers([baseAccount])
      .rpc();

    console.log("📝 Your transaction signature", tx);

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    const totalGifs = account.totalGifs;
    console.log("👀 Total gifs:", totalGifs);

    const expected = 0;
    assert.isTrue(account.totalGifs.eqn(expected), `totalGifs equals ${totalGifs}. Expected: ${expected}`);
  });

  it("Adds a gif", async () => {
    console.log("🚀 Adding a gif...");
    const newGifUrl = "some_gif_url_here";
    const tx = await program.methods.addGif(newGifUrl)
      .accounts({ baseAccount: baseAccount.publicKey })
      .rpc();

    console.log("📝 Your transaction signature", tx);

    const { totalGifs, ...account } = await program.account.baseAccount.fetch(baseAccount.publicKey);
    const gifList = account.gifList as GifItem[];

    assert.isArray(gifList);
    assert.lengthOf(gifList, 1);

    const [newGifAdded] = gifList;

    console.log("👀 Total gifs:", totalGifs);
    console.log("👀 Gif list:", gifList);

    const expectedTotalGifs = 1;
    assert.isTrue(
      totalGifs.eqn(expectedTotalGifs),
      `totalGifs equals ${totalGifs}. Expected: ${expectedTotalGifs}`
    );

    assert.equal(newGifAdded.gifUrl, newGifUrl);

    assert.isTrue(
      newGifAdded.userAddress.equals(provider.publicKey),
      `userAddress equals ${newGifAdded.userAddress}. Expected: ${provider.publicKey}`
    );
  })
});
