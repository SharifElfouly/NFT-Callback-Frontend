import NFTs from "./NFTs";
import {
  useContractInfiniteReads,
  paginatedIndexesConfig,
  useAccount,
} from "wagmi";

export default function NFTsWrapper() {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  return <div>{isConnected && <NFTs />}</div>;
}
