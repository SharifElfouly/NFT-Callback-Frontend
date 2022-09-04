import { Input } from "@chakra-ui/react";

export default function Address({ address, setAddress }) {
  return (
    <div class="w-full">
      <Input value={address} onChange={(e) => setAddress(e.target.value)} />
    </div>
  );
}
