import { RadarChartOutlined } from "@ant-design/icons";

export default function NFT({ name, hash }) {
  return (
    <div class="rounded-lg shadow-lg bg-white max-w-sm">
      <div
        class="h-14 bg-gradient-to-r from-purple-500 to-pink-500 h-40 p-4 
          flex flex-col content-between justify-between
          "
      >
        <RadarChartOutlined style={{ fontSize: "2rem" }} />
        <div class="text-sm font-light">{hash}</div>
      </div>
      <div class="p-6">
        <h5 class="text-gray-900 text-xl font-medium mb-2">{name}</h5>
      </div>
    </div>
  );
}
