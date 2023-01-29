export const processAudio = async (blob: Blob) => {
  const data = await fetch("https://54.237.64.201:5000/api/processAudio", {
    method: "POST",
    body: blob,
    headers: {
      "Content-Type": "audio/wav",
    },
  });
  const text = await data.json();
  if (!text.data.includes("Error")) {
    return text.data;
  } else {
    return "Could not recognize the word";
  }
};
