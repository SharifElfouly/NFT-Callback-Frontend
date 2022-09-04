import { useEffect, useState } from "react";
import { Footer } from "./Footer";
import { NavBar } from "./layout/Navbar";
import Mint from "./Mint";
import { useAccount } from "wagmi";
import NFTs from "./NFTs";

export default function Home() {
  const { address, isConnected } = useAccount();

  const [reload, setReload] = useState(false);
  const [customAddress, setAddress] = useState(address);

  useEffect(() => {
    setAddress(address);
  }, [isConnected]);

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center p-10 w-full">
        <div class="w-4/6 flex flex-col gap-8">
          {/* <Verify /> */}
          <Mint reload={reload} setReload={setReload} />
          <div>
            <div className="text-xl font-bold">Models</div>
            {customAddress && (
              <NFTs
                reload={reload}
                address={customAddress}
                setAddress={setAddress}
                isConnected={isConnected}
              />
            )}
            {!isConnected && (
              <div class="mt-2">
                Connect your wallet to see your or other Models!
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
