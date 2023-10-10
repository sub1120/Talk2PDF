import { ChangeEvent } from "react";
import Spinner from "./Spinner";

interface AppProps {
  disabled: boolean;
  isUploading: boolean;
  submitHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FileInput = ({ disabled, submitHandler, isUploading }: AppProps) => {
  return (
    <form>
      <div className="flex items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-80 border-2 border-orange-200 border-dashed rounded-lg cursor-pointer bg-gray-50 phover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploading ? (
              <>
                <Spinner />
                <div>Uploading...</div>
              </>
            ) : (
              <>
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500">Only PDFs (max 10mb)</p>
              </>
            )}
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            multiple
            onChange={submitHandler}
            disabled={disabled}
          />
        </label>
      </div>
    </form>
  );
};

export default FileInput;
