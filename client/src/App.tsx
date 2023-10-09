import { ChangeEvent, FormEvent, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import FileInput from "./components/FileInput";
import notify from "./utils/customToast";
import api from "./api";
import { ToastContainer } from "react-toastify";
import ChatInput from "./components/ChatInput";

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

  //file submit handler
  const fileSubmitHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    setLoading({
      ...loading,
      isUploading: true,
    });

    const currentFiles = event.currentTarget.files;

    if (!currentFiles || currentFiles?.length === 0) {
      notify("error", "Please apload atleast one file");
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
      await api.uploadFiles(formData);
      notify("success", "Files uploaded successfully");
      setFiles([...files, ...Array.from(currentFiles)]);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      notify("error", "Something Went Wrong");
    }

    setLoading({
      ...loading,
      isUploading: false,
    });
  };

  //input change handler
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setChat({
      ...chat,
      question: event.target.value,
    });
  };

  //question submit handler
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
      const res = await api.getAnswer(formData);

      setChat({
        ...chat,
        answer: res.data.answer,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      notify("error", "Something Went Wrong");
    }

    setLoading({
      ...loading,
      isRetriving: false,
    });
  };

  //clear file handler
  const resetHandler = async () => {
    setLoading({
      ...loading,
      isDeleting: true,
    });

    try {
      await api.clearFiles();
      notify("success", "Files deleted successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      notify("error", "Something Went Wrong");
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
    <main className="m-10  md:m-15 lg:m-20 space-y-5">
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
      {/* heading */}
      <section className="text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800">
          🎙Talk2PDF🎤
        </h1>
        <h2 className="text-md md:text-lg lg:text-xl mt-5 text-gray-800">
          Now Ask any question to your PDF.
        </h2>
      </section>

      {/* file input */}
      <section className="space-y-2">
        <div className="flex justify-between">
          <h2 className="text-md md:text-lg lg:text-xl">Upload PDFs</h2>
          <button
            className="text-white bg-orange-500 w-24 hover:bg-orange-600 p-2"
            onClick={resetHandler}
            disabled={loading.isDeleting}
          >
            Reset
          </button>
        </div>

        <FileInput
          submitHandler={fileSubmitHandler}
          disabled={loading.isUploading}
          isUploading={loading.isUploading}
        />
        {files && <span>{`${files.length} files uploaded `} </span>}
      </section>

      {/* chat box */}
      <section className="space-y-2">
        <ChatInput
          disabled={files?.length === 0}
          value={chat.question}
          submitHandler={questionSubmitHandler}
          onChangeHandler={onChangeHandler}
        />
        <p className="text-left p-5 bg-gray-200 rounded-md">
          🚀 {loading.isRetriving ? "Loading..." : chat.answer}
        </p>
      </section>
    </main>
  );
}

export default App;
