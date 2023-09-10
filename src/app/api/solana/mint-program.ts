import { explorerURL, printConsoleSeparator } from "@/app/api/solana/helper";

//
import {
  Keypair,
  LAMPORTS_PER_SOL,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
  VoteInstruction,
} from "@solana/web3.js";

import { NextApiHandler } from "next";

import { payer, connection } from  "@/app/api/solana/helper/local";

const handle: NextApiHandler = async (req, res) => {
  let balanceBeforeTransaction = await getCurrentBalance();
  let balanceAfterTransaction = await getCurrentBalance();
  let explorerURL = createNewAccount();

  res.send({
    balanceBeforeTransaction,
    balanceAfterTransaction,
    explorerURL,
  });
};

export default handle;

async function getCurrentBalance() {
  // get the current balance of the `payer` account on chain
  const currentBalance = await connection.getBalance(payer.publicKey);
  console.log("Current balance of 'payer' (in lamports):", currentBalance);
  console.log(
    "Current balance of 'payer' (in SOL):",
    currentBalance / LAMPORTS_PER_SOL
  );

  return `Lampot: ${currentBalance} Sol:${currentBalance / LAMPORTS_PER_SOL} `;
}

async function Airdrop200Sol() {
  await connection.requestAirdrop(payer.publicKey, 200 * LAMPORTS_PER_SOL);
}

async function createNewAccount() {
  // generate a new, random address to create on chain
  const keypair = Keypair.generate();

  console.log("New keypair generated:", keypair.publicKey.toBase58());

  /**
   * create a simple instruction (using web3.js) to create an account
   */

  // on-chain space to allocated (in number of bytes)
  const space = 0;

  // request the cost (in lamports) to allocate `space` number of bytes on chain
  const lamports = await connection.getMinimumBalanceForRentExemption(space);

  console.log("Total lamports:", lamports);

  // create this simple instruction using web3.js helper function
  const createAccountIx = SystemProgram.createAccount({
    // `fromPubkey` - this account will need to sign the transaction
    fromPubkey: payer.publicKey,
    // `newAccountPubkey` - the account address to create on chain
    newAccountPubkey: keypair.publicKey,
    // lamports to store in this account
    lamports,
    // total space to allocate
    space,
    // the owning program for this account
    programId: SystemProgram.programId,
  });

  /**
   * build the transaction to send to the blockchain
   */

  // get the latest recent blockhash
  let recentBlockhash = await connection
    .getLatestBlockhash()
    .then((res) => res.blockhash);

  // create a message (v0)
  const message = new TransactionMessage({
    payerKey: payer.publicKey,
    recentBlockhash,
    instructions: [createAccountIx],
  }).compileToV0Message();

  // create a versioned transaction using the message
  const tx = new VersionedTransaction(message);

  // console.log("tx before signing:", tx);

  // sign the transaction with our needed Signers (e.g. `payer` and `keypair`)
  tx.sign([payer, keypair]);

  console.log("tx after signing:", tx);

  // tx.signatures.toString("base58")

  // console.log(tx.signatures);

  // actually send the transaction
  const sig = await connection.sendTransaction(tx);

  /**
   * display some helper text
   */
  printConsoleSeparator();

  console.log("Transaction completed.");
  return explorerURL({ txSignature: sig });
}


async function interractWithMySmartContract() {
  // generate a new, random address to create on chain
  const keypair = Keypair.generate();

  console.log("New keypair generated:", keypair.publicKey.toBase58());

  /**
   * create a simple instruction (using web3.js) to create an account
   */

  // on-chain space to allocated (in number of bytes)
  const space = 0;

  // request the cost (in lamports) to allocate `space` number of bytes on chain
  const lamports = await connection.getMinimumBalanceForRentExemption(space);

  console.log("Total lamports:", lamports);

  // create this simple instruction using web3.js helper function
  const createAccountIx = SystemProgram.createAccount({
    // `fromPubkey` - this account will need to sign the transaction
    fromPubkey: payer.publicKey,
    // `newAccountPubkey` - the account address to create on chain
    newAccountPubkey: keypair.publicKey,
    // lamports to store in this account
    lamports,
    // total space to allocate
    space,
    // the owning program for this account
    programId: SystemProgram.programId,
  });

//  let ins=new VoteInstruction({})
  
  /**
   * build the transaction to send to the blockchain
   */

  // get the latest recent blockhash
  let recentBlockhash = await connection
    .getLatestBlockhash()
    .then((res) => res.blockhash);

  // create a message (v0)
  const message = new TransactionMessage({
    payerKey: payer.publicKey,
    recentBlockhash,
    instructions: [createAccountIx],
  }).compileToV0Message();

  // create a versioned transaction using the message
  const tx = new VersionedTransaction(message);

  // console.log("tx before signing:", tx);

  // sign the transaction with our needed Signers (e.g. `payer` and `keypair`)
  tx.sign([payer, keypair]);

  console.log("tx after signing:", tx);

  // tx.signatures.toString("base58")

  // console.log(tx.signatures);

  // actually send the transaction
  const sig = await connection.sendTransaction(tx);

  /**
   * display some helper text
   */
  printConsoleSeparator();

  console.log("Transaction completed.");
  return explorerURL({ txSignature: sig });
}



