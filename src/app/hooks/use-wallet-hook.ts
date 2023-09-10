'use client'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
// @ts-ignore
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';

export default function useGetWallet(){
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
   const network = WalletAdapterNetwork.Devnet;

   // You can also provide a custom RPC endpoint.
   const endpoint = useMemo(() => clusterApiUrl(network), [network]);

   const wallets = useMemo(
       () => [

           new UnsafeBurnerWalletAdapter(), 
       ],
       // eslint-disable-next-line react-hooks/exhaustive-deps
       [network]
   );

return {network,endpoint,wallets}

}