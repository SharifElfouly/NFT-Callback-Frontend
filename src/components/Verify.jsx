import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";

export default function Verify() {
  return (
    <div>
      <div className="mb-4 text-xl font-bold flex items-center justify-between">
        <div>Verify</div>
      </div>
      <div>
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          for="file_input"
        >
          Upload file
        </label>
        <input
          class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          onChange={(e) => {
            console.log(e.target.files[0]);
          }}
        />
      </div>
    </div>
  );
}
