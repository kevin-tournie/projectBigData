import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import { Microphone } from "microphone-js";
import { WrapperMicrophone } from "./microphone.style";
import { useState } from "react";
import { processAudio } from "../services/backend";

export const MyMicrophone = ({ setText }: any) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [mic, setMic] = useState<MicrophoneInstance>(Microphone());

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
            // console.log("uploading de blob to s3", blob?.size);
            if (blob?.size) {
              setText(processAudio(blob));
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
