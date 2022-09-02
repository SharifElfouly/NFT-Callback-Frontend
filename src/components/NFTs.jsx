import { useState } from "react";
import { useContractRead } from "wagmi";
import abi from "../contracts/abi.json";
import { Button, Input } from "@chakra-ui/react";

export default function NFTs() {
  const [name, setName] = useState("");
  const [hash, setHash] = useState("");

  const { data, isError, isLoading } = useContractRead({
    addressOrName: "0x7e51Cb0880343732D0216527900C5C0184308642",
    contractInterface: abi,
    functionName: "models",
    args: ["0xD0eba5f813cEfa1FD5f60E11feCD84f39a9dDA88", 1],
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  // const { data, isError, isLoading } = useContractRead({
  //   addressOrName: "0x7e51Cb0880343732D0216527900C5C0184308642",
  //   contractInterface: abi,
  //   functionName: "balanceOf",
  //   args: ["0xD0eba5f813cEfa1FD5f60E11feCD84f39a9dDA88"],
  //   onSuccess(data) {
  //     console.log("Success", data);
  //   },
  // });

  return (
    <div className="flex flex-col gap-4 w-3/6">
      <Input
        placeholder="Model Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {/* {data && <div>{data}</div>} */}
      <Input
        placeholder="Hash"
        value={hash}
        onChange={(e) => setHash(e.target.value)}
      />
      {/* <Button disabled={!write} onClick={() => write?.()}> */}
      {/*   Mint */}
      {/* </Button> */}
      {/* {isLoading && <div>Check Wallet</div>} */}
      {/* {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>} */}
    </div>
  );
}
