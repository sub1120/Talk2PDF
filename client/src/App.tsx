import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loading, setLoading] = useState({
    isUploading: false,
    isRetriving: false,
    isDeleting: false,
  });

  const [files, setFiles] = useState<File[]>([]);
  const [chat, setChat] = useState({
    question: "",
    answer: "",
  });

  const fileSubmitHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    setLoading({
      ...loading,
      isUploading: true,
    });

    const currentFiles = event.currentTarget.files;

    if (!currentFiles || currentFiles?.length === 0) {
      toast.error("Please apload atleast one file", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading({
        ...loading,
        isUploading: false,
      });
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < currentFiles?.length; i++) {
      formData.append("doc", currentFiles[i]);
    }

    try {
      // make a POST request with Axios
      await axios.post("http://localhost:4000/api/v1/doc/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Files uploaded successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setFiles([...files, ...Array.from(currentFiles)]);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Something Went Wrong", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    setLoading({
      ...loading,
      isUploading: false,
    });
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setChat({
      ...chat,
      question: event.target.value,
    });
  };

  const questionSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    setLoading({
      ...loading,
      isRetriving: true,
    });

    event.preventDefault();

    const formData = {
      question: chat.question,
    };

    try {
      // make a POST request with Axios
      const res = await axios.post(
        "http://localhost:4000/api/v1/chat/answer",
        formData
      );

      setChat({
        ...chat,
        answer: res.data.answer,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Something Went Wrong", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    setLoading({
      ...loading,
      isRetriving: false,
    });
  };

  const clearFileHandler = async () => {
    setLoading({
      ...loading,
      isDeleting: true,
    });

    try {
      // make a DEL request with Axios
      await axios.delete("http://localhost:4000/api/v1/doc/delete");
      toast.success("Files deleted successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Something Went Wrong", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    setLoading({
      ...loading,
      isDeleting: false,
    });
    setFiles([]);
    setChat({
      question: "",
      answer: "",
    });
  };

  return (
    <main className="text-center m-10  md:m-15 lg:m-20 space-y-5">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800">
        🎙Talk2PDF🎤
      </h1>
      <h2 className="text-md md:text-lg lg:text-xl mt-5 text-gray-800">
        Now Ask any question to your PDF.
      </h2>

      {/* upload pdfs */}
      <section className="space-y-2">
        <h2 className="text-md md:text-lg lg:text-xl">Upload PDFs</h2>
        <form>
          <div className="flex items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
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
                {loading.isUploading ? (
                  "Uploading..."
                ) : (
                  <>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      Only PDFs (max 10mb)
                    </p>
                  </>
                )}
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                multiple
                onChange={fileSubmitHandler}
                disabled={loading.isUploading}
              />
            </label>
          </div>
        </form>
        {files && (
          <div className="text-left">
            <span>{`${files.length} files uploaded `} </span>
            <button
              className="underline text-blue-500"
              onClick={clearFileHandler}
              disabled={loading.isDeleting}
            >
              Clear Files
            </button>
          </div>
        )}
      </section>

      {/* chat box */}

      <section className="space-y-2">
        <form onSubmit={questionSubmitHandler}>
          <input
            name="question"
            type="text"
            className="px-5 w-full py-2 outline-none border-gray-400 border rounded-full text-gray-800 text-sm md:text-md lg:text-lg"
            placeholder="Type your question here"
            onChange={onChangeHandler}
            disabled={files?.length === 0}
            value={chat.question}
          ></input>
        </form>

        <p className="text-left p-5 bg-gray-200 rounded-md">
          🚀 {loading.isRetriving ? "Loading..." : chat.answer}
        </p>
      </section>
    </main>
  );
}

export default App;
