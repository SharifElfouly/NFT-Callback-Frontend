import { WagmiConfig } from "wagmi";
import "./App.css";
import { NavBar } from "./components/layout/Navbar";
import { client, chains } from "./utils/wagmi-config";
import { ChakraProvider } from "@chakra-ui/react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import Mint from "./components/Mint";
import NFTs from "./components/NFTs";
import { useState } from "react";
import { Footer } from "./components/Footer";

function App() {
  const [reload, setReload] = useState(false);

  return (
    <ChakraProvider>
      <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains}>
          <NavBar />
          <div className="flex flex-col items-center p-10 gap-4 w-full">
            <div class="w-4/6">
              <Mint reload={reload} setReload={setReload} />
              <NFTs reload={reload} />
            </div>
          </div>
          <Footer />
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default App;
