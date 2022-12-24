const fs = require('fs');
const path = require('path');
const anchor = require('@project-serum/anchor');

const KEYPAIR_PATH = path.resolve(__dirname, 'keypair.json');

function createKeypair() {
  const keypairExists = fs.existsSync(KEYPAIR_PATH);
  if (keypairExists) return;

  const keypair = anchor.web3.Keypair.generate();
  fs.writeFileSync(KEYPAIR_PATH, JSON.stringify(keypair));
}

createKeypair();