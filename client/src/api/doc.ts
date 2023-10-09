import { axiosInstance } from "../utils/axiosInstance";

// To upload PDFs
export const uploadFiles = async (formData: FormData) => {
  await axiosInstance.post("/doc/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// To delete PDFs
export const clearFiles = async () => {
  await axiosInstance.delete("/doc/delete");
};
