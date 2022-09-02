import { useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import abi from "../contracts/abi.json";
import { Button, Input } from "@chakra-ui/react";

export default function Mint() {
  const [name, setName] = useState("");
  const [hash, setHash] = useState("");

  const { config } = usePrepareContractWrite({
    addressOrName: "0x7e51Cb0880343732D0216527900C5C0184308642",
    contractInterface: abi,
    functionName: "safeMint",
    args: [name, hash],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div className="flex flex-col gap-4 w-full">
      <Input
        placeholder="Model Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Hash"
        value={hash}
        onChange={(e) => setHash(e.target.value)}
      />
      <Button disabled={!write} onClick={() => write?.()}>
        Mint
      </Button>
      {/* {isLoading && <div>Check Wallet</div>} */}
      {/* {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>} */}
    </div>
  );
}
