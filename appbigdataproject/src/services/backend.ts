export const processAudio = async (blob: Blob) => {
  const data = await fetch("http://localhost:5000/api/processAudio", {
    method: "POST",
    body: blob,
    headers: {
      "Content-Type": "audio/wav",
    },
  });
  const text = await data.json();
  if (!text.data.includes("Unrecognised")) {
    return text.data;
  } else {
    return "Could not recognize the word";
  }
};
