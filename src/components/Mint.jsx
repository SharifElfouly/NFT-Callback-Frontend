import { useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import abi from "../contracts/abi.json";
import { Button, Input } from "@chakra-ui/react";
import Loading from "./Loading";

export default function Mint({ reload, setReload }) {
  const [name, setName] = useState("");
  const [hash, setHash] = useState("");

  const { config } = usePrepareContractWrite({
    addressOrName: "0x7e51Cb0880343732D0216527900C5C0184308642",
    contractInterface: abi,
    functionName: "safeMint",
    args: [name, hash],
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      console.log("waitForTransaction");
      setReload(!reload);
    },
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="mb-4 text-xl font-bold flex items-center justify-between">
        <div>Upload Model Hash</div>
        {isLoading && <Loading />}
      </div>
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
    </div>
  );
}
