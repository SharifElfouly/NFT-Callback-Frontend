import { WagmiConfig } from "wagmi";
import "./App.css";
import Home from "./components/Home";
import { NavBar } from "./components/layout/Navbar";
import { client, chains } from "./utils/wagmi-config";
import { ChakraProvider } from "@chakra-ui/react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import Mint from "./components/Mint";
import NFTs from "./components/NFTs";
// import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

function App() {
  return (
    <ChakraProvider>
      <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains}>
          <NavBar />
          <div className="flex flex-col items-center m-10 gap-4">
            <Home />
            <Mint />
            <NFTs />
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default App;
