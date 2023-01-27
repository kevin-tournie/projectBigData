import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import { Microphone } from "microphone-js";
import { WrapperMicrophone } from "./microphone.style";
import { useState } from "react";

export const MyMicrophone = ({ setText }: any) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [mic, setMic] = useState<MicrophoneInstance>(Microphone());

  const handleSubmit = async (blob: Blob) => {
    const data = await fetch("http://localhost:5000/api/processAudio", {
      method: "POST",
      body: blob,
      headers: {
        "Content-Type": "audio/wav",
      },
    });
    const text = await data.json();
    if (!text.data.includes("Error")) {
      setText(text.data);
    } else {
      setText("Could not recognize the word");
    }
  };
  return (
    <WrapperMicrophone onClick={() => setIsOpened(!isOpened)}>
      {isOpened ? (
        <MicIcon
          fontSize="large"
          onClick={(e) => {
            e.preventDefault();
            mic.stop();
            const blob = mic.getBlob();
            mic.reset();
            console.log("uploading de blob to s3", blob?.size);
            if (blob?.size) {
              handleSubmit(blob);
            }
          }}
        />
      ) : (
        <MicOffIcon
          fontSize="large"
          onClick={(e) => {
            e.preventDefault();
            mic.start();
          }}
        />
      )}
    </WrapperMicrophone>
  );
};
