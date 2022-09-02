import abi from "../contracts/abi.json";
import { useContractInfiniteReads, paginatedIndexesConfig } from "wagmi";
import NFT from "./NFT";

const contractConfig = {
  addressOrName: "0x7e51Cb0880343732D0216527900C5C0184308642",
  contractInterface: abi,
};

export default function NFTs() {
  const { data, fetchNextPage } = useContractInfiniteReads({
    cacheKey: "mlootAttributes",
    ...paginatedIndexesConfig(
      (index) => ({
        ...contractConfig,
        functionName: "models",
        args: ["0xD0eba5f813cEfa1FD5f60E11feCD84f39a9dDA88", index],
        onSuccess(data) {
          console.log("Success", data);
        },
      }),
      { start: 0, perPage: 10, direction: "increment" }
    ),
  });

  return (
    <div>
      <div className="mt-8 mb-8 text-xl font-bold">My Models</div>
      <div className="grid gap-4 grid-cols-2 grid-rows-3">
        {data &&
          data.pages[0].map((d) => {
            if (d) {
              return <NFT name={d.name} hash={d.hash} />;
            }
          })}
      </div>
    </div>
  );
}
