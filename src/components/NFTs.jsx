import abi from "../contracts/abi.json";
import {
  useContractInfiniteReads,
  paginatedIndexesConfig,
  useAccount,
} from "wagmi";
import NFT from "./NFT";
import { useEffect } from "react";
import { Button } from "antd";
import { add0x } from "../utils/hash";
import Loading from "./Loading";

const contractConfig = {
  addressOrName: "0x7e51Cb0880343732D0216527900C5C0184308642",
  contractInterface: abi,
};

const ITEMS_PER_PAGE = 100;

export default function NFTs({ reload }) {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  useEffect(() => {
    refetch();
    console.log("test");
  }, [reload, isConnected]);

  const { data, fetchNextPage, refetch, hasNextPage, isLoading, isFetching } =
    useContractInfiniteReads({
      cacheKey: "nfts",
      ...paginatedIndexesConfig(
        (index) => ({
          ...contractConfig,
          functionName: "models",
          args: [address, index],
          onSuccess(data) {
            console.log("Success", data);
          },
        }),
        { start: 0, perPage: ITEMS_PER_PAGE, direction: "increment" }
      ),
    });

  return (
    <div>
      <div class="flex justify-between items-center mb-8">
        <div className="text-xl font-bold">My Models</div>
        {isFetching && <Loading />}
      </div>
      {isConnected ? (
        <div className="flex gap-4 flex-wrap justify-center">
          {data &&
            data.pages[0].map((d) => {
              if (d) {
                return <NFT name={d[1]} hash={add0x(d[2])} />;
              }
            })}
          {data && !isFetching && data.pages[0][0] == null && (
            <div class="font-light text-sm">No models found!</div>
          )}
        </div>
      ) : (
        <div>Connect your wallet first!</div>
      )}
    </div>
  );
}
