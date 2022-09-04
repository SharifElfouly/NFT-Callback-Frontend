import abi from "../contracts/abi.json";
import { useContractInfiniteReads, paginatedIndexesConfig } from "wagmi";
import NFT from "./NFT";
import { Button } from "@chakra-ui/react";
import { add0x } from "../utils/hash";
import Loading from "./Loading";
import Address from "./Address";

const contractConfig = {
  addressOrName: "0x7e51Cb0880343732D0216527900C5C0184308642",
  contractInterface: abi,
};

const ITEMS_PER_PAGE = 100;

export default function NFTs({ address, setAddress, isConnected }) {
  const { data, refetch, isFetching } = useContractInfiniteReads({
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
      {isConnected && (
        <div class="flex flex-col gap-4 mt-2">
          <div class="flex justify-between gap-4">
            <Address address={address} setAddress={setAddress} />
            <Button onClick={refetch}>Search</Button>
          </div>
          <div class="flex justify-center">{isFetching && <Loading />}</div>
          <div className="flex gap-4 flex-wrap">
            {data &&
              !isFetching &&
              data.pages[0].map((d) => {
                if (d) {
                  return <NFT id={d[0]._hex} name={d[1]} hash={add0x(d[2])} />;
                }
              })}
            {data && !isFetching && data.pages[0][0] == null && (
              <div class="font-light text-sm">No models found!</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
