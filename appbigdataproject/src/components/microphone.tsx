import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import { Microphone } from "microphone-js";
import { WrapperMicrophone } from "./microphone.style";
import { useEffect, useState } from "react";
import { uploadFile } from "../services/awsAPI";

export const MyMicrophone = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [mic, setMic] = useState<MicrophoneInstance>(Microphone());

  console.log(mic);
  return (
    <WrapperMicrophone onClick={() => setIsOpened(!isOpened)}>
      {isOpened ? (
        <MicIcon
          fontSize="large"
          onClick={(e) => {
            e.preventDefault();
            mic.stop();
            const blob = mic.getBlob();
            console.log("uploading de blob to s3");
            uploadFile(blob, "test.wav");
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
