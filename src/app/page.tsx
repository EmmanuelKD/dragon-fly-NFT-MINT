"use client";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { ReactNode } from "react";
import useGetWallet from "./hooks/use-wallet-hook";
import MainLayour from "./layout/main-layout";
import NFT_Grids from "./layout/grid-layout";
import UploadFiles from "./layout/upload-files";

function HomeContext({ children }: { children: ReactNode }) {
  "use client";

  let { endpoint, network, wallets } = useGetWallet();

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

function Home() {
  return (
    <HomeContext>
      <>
        <Header />
        <MainLayour LeftChild={<NFT_Grids/>} RightChild={<UploadFiles/>} />
      </>
    </HomeContext>
  );
}
function Header() {
  return (
    <header className="shrink-0 bg-gray-900">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <img
          className="h-8 w-auto"
          src="https://pbs.twimg.com/profile_images/1694459076602654721/8mxVtVUt_400x400.jpg"
          alt="Your Company"
        />
        <div className="flex items-center gap-x-8">
          <a href="#" className="-m-1.5 p-1.5">
            <WalletMultiButton />
          </a>
        </div>
      </div>
    </header>
  );
}
export default Home;
