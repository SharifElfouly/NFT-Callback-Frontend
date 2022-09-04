import { useState } from "react";
import { Footer } from "./Footer";
import { NavBar } from "./layout/Navbar";
import Mint from "./Mint";
import { useAccount } from "wagmi";
import NFTs from "./NFTs";

export default function Home() {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  const [reload, setReload] = useState(false);

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center p-10 w-full">
        <div class="w-4/6 flex flex-col gap-8">
          {/* <Verify /> */}
          <Mint reload={reload} setReload={setReload} />
          <NFTs reload={reload} />
        </div>
      </div>
      <Footer />
    </>
  );
}
