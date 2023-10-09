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
        className="px-5 w-full py-2 outline-none border-gray-400 border rounded-full text-gray-800 text-sm md:text-md lg:text-lg"
        placeholder="Type your question here"
        onChange={onChangeHandler}
        disabled={disabled}
        value={value}
      ></input>
    </form>
  );
};

export default ChatInput;
