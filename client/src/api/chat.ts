import { axiosInstance } from "../utils/axiosInstance";

export const getAnswer = async (formData: { question: string }) => {
  const res = await axiosInstance.post("/chat/answer", formData);

  return res;
};
