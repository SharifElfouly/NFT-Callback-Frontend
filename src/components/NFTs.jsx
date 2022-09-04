import abi from "../contracts/abi.json";
import {
  useContractInfiniteReads,
  paginatedIndexesConfig,
  useAccount,
} from "wagmi";
import NFT from "./NFT";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { add0x } from "../utils/hash";
import Loading from "./Loading";
import Address from "./Address";

const contractConfig = {
  addressOrName: "0x7e51Cb0880343732D0216527900C5C0184308642",
  contractInterface: abi,
};

const ITEMS_PER_PAGE = 100;

export default function NFTs({ reload }) {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const [customAddress, setAddress] = useState(address);

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
          args: [customAddress, index],
          onSuccess(data) {
            console.log("Success", data);
          },
        }),
        { start: 0, perPage: ITEMS_PER_PAGE, direction: "increment" }
      ),
    });

  function search() {
    refetch();
  }

  return (
    <div>
      <div class="flex justify-between mb-4">
        <div className="text-xl font-bold">Models</div>
        {isFetching && <Loading />}
      </div>
      <div class="flex justify-between gap-4">
        <Address address={customAddress} setAddress={setAddress} />
        <Button onClick={search}>Search</Button>
      </div>
      {isConnected ? (
        <div className="flex gap-4 flex-wrap mt-4">
          {data &&
            data.pages[0].map((d) => {
              if (d) {
                return <NFT id={d[0]._hex} name={d[1]} hash={add0x(d[2])} />;
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
