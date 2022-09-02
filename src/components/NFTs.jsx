import abi from "../contracts/abi.json";
import { useContractInfiniteReads, paginatedIndexesConfig } from "wagmi";

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
    <div className="flex flex-col gap-4 w-3/6">
      {/* <Button disabled={!write} onClick={() => write?.()}> */}
      {/*   Mint */}
      {/* </Button> */}
      {/* {isLoading && <div>Check Wallet</div>} */}
      {/* {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>} */}
    </div>
  );
}
