import { WagmiConfig } from "wagmi";
import "./App.css";
import { client, chains } from "./utils/wagmi-config";
import { ChakraProvider } from "@chakra-ui/react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import Home from "./components/Home";
// import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

function App() {
  return (
    <ChakraProvider>
      <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains}>
          <Home />
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default App;
