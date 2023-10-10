import { ChangeEvent, FormEvent } from "react";

interface AppProps {
  submitHandler: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  value: string;
}

const ChatInput = ({
  submitHandler,
  onChangeHandler,
  disabled,
  value,
}: AppProps) => {
  return (
    <form onSubmit={submitHandler}>
      <input
        name="question"
        type="text"
        className="px-5 w-full py-4 outline-none shadow-lg rounded-md text-gray-500 disabled:bg-gray-200 placeholder:text-gray-400 text-sm md:text-md lg:text-lg"
        placeholder="Type your question here"
        onChange={onChangeHandler}
        disabled={disabled}
        value={value}
      ></input>
    </form>
  );
};

export default ChatInput;
