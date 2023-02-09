export const processAudio = async (blob: Blob) => {
  const formData = new FormData();
  formData.append("file",blob,"test.wav")
  const data = await fetch(import.meta.env.VITE_BACKEND_BASE_URL + "/api/processAudio", {
    method: "POST",
    body: formData,
    mode:"cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    /*headers: {
      "Content-Type": "multipart/form-data"
    },*/
  })

  const result = await data.text()

  return result;
}