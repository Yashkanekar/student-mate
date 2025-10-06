import api from "./api";

export async function processDocument(file, signal) {
  const formData = new FormData();
  formData.append("file", file);

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
    signal,
  };

  const response = await api.post("/api/process-document", formData, config);
  return response.data;
}
