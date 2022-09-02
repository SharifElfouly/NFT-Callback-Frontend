import abi from "../contracts/abi.json";
import {
  useContractInfiniteReads,
  paginatedIndexesConfig,
  useAccount,
} from "wagmi";
import NFT from "./NFT";
import { useEffect } from "react";

const contractConfig = {
  addressOrName: "0x7e51Cb0880343732D0216527900C5C0184308642",
  contractInterface: abi,
};

export default function NFTs({ reload }) {
  const { address, isConnecting, isDisconnected } = useAccount();

  useEffect(() => {
    console.log("useEffect");
  }, [reload]);

  const { data, fetchNextPage } = useContractInfiniteReads({
    cacheKey: "mlootAttributes",
    ...paginatedIndexesConfig(
      (index) => ({
        ...contractConfig,
        functionName: "models",
        args: [address, index],
        onSuccess(data) {
          console.log("Success", data);
        },
      }),
      { start: 0, perPage: 10, direction: "increment" }
    ),
    onSuccess: () => {
      console.log("Read!");
    },
  });

  return (
    <div>
      <div className="mt-8 mb-8  text-xl font-bold">My Models</div>
      <div className="grid gap-4 grid-cols-2 grid-rows-3 ">
        {data &&
          data.pages[0].map((d) => {
            if (d) {
              return <NFT name={d[1]} hash={d[2]} />;
            }
          })}
        {data && data.pages[0][0] == null && (
          <div class="font-light text-sm">No models found!</div>
        )}
      </div>
    </div>
  );
}
