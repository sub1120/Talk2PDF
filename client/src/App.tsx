import { ChangeEvent, FormEvent, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import FileInput from "./components/FileInput";
import notify from "./utils/customToast";
import api from "./api";
import { ToastContainer } from "react-toastify";
import ChatInput from "./components/ChatInput";

interface IConversation {
  question: string;
  answer: string;
}

function App() {
  const [loading, setLoading] = useState({
    isUploading: false,
    isRetriving: false,
    isDeleting: false,
  });

  const [files, setFiles] = useState<File[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [chat, setChat] = useState<IConversation>({
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
      notify("error", error.response.data.message || "Something Went Wrong");
    }

    setLoading({
      ...loading,
      isUploading: false,
    });
  };

  //input change handler
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentQuestion(event.target.value);
  };

  //question submit handler
  const questionSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    setLoading({
      ...loading,
      isRetriving: true,
    });
    event.preventDefault();

    setChat((prevState) => {
      return {
        ...prevState,
        question: currentQuestion,
      };
    });
    const formData = {
      question: currentQuestion,
    };

    try {
      const res = await api.getAnswer(formData);
      setChat((prevState) => {
        return {
          ...prevState,
          answer: res.data.answer,
        };
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      notify("error", error.response.data.message || "Something Went Wrong");
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
      notify("error", error.response.data.message || "Something Went Wrong");
    }

    setLoading({
      isRetriving: false,
      isDeleting: false,
      isUploading: false,
    });
    setFiles([]);
    setChat({
      question: "",
      answer: "",
    });
    setCurrentQuestion("");
  };

  return (
    <main className="p-10 flex items-center md:p-15 lg:p-20 space-y-5 h-[100vh]">
      <div className="w-full">
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
          <h1 className="text-4xl md:text-3xl lg:text-4xl font-semibold text-gray-800">
            🎙Talk2PDF🎤
          </h1>
          <h2 className="text-md md:text-lg lg:text-xl mt-5 text-gray-800">
            Now Ask any question to your PDF.
          </h2>
        </section>

        {/* file input */}
        <section className="space-y-2">
          {files.length === 0 && (
            <>
              <h2 className="text-md md:text-lg lg:text-xl">Upload PDFs</h2>
              <FileInput
                submitHandler={fileSubmitHandler}
                disabled={loading.isUploading}
                isUploading={loading.isUploading}
              />
            </>
          )}
          {files && (
            <div className="flex justify-between mb-2">
              <span>{`${files.length} files uploaded `} </span>
              <button
                className="text-white bg-orange-500 w-24 hover:bg-orange-600 p-2"
                onClick={resetHandler}
                disabled={loading.isDeleting}
              >
                Reset
              </button>
            </div>
          )}
        </section>

        {/* chat box */}
        {files.length !== 0 && (
          <section className="bg-gray-100 rounded-md h-52 relative">
            {chat.question ? (
              <>
                <div className="bg-gray-100  mt-0">
                  <p className="text-left py-3 px-10 text-gray-800">
                    <span className="font-semibold">You: </span>
                    {chat.question}
                  </p>
                </div>
                <div className=" bg-gray-300 flex mt-0">
                  <p className="text-left px-10 py-3 text-gray-800">
                    <span className="font-semibold">PDF:</span>{" "}
                    {loading.isRetriving
                      ? "🚀 Loading..."
                      : chat.answer ||
                        "Apology, Could you please provide more context!"}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No Chat Found
              </div>
            )}

            <div className="absolute bottom-0 py-2 px-2 w-full">
              <ChatInput
                disabled={loading.isRetriving}
                value={currentQuestion}
                submitHandler={questionSubmitHandler}
                onChangeHandler={onChangeHandler}
              />
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default App;
