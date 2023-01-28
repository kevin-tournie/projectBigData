import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import { Microphone } from "microphone-js";
import { WrapperMicrophone } from "./microphone.style";
import { useState } from "react";
import { processAudio } from "../../../services/backend";
import { Button } from "@mui/material";
import { uploadFileToS3Bucket } from "../../../services/S3";

export const MyMicrophone = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [mic, setMic] = useState<MicrophoneInstance>(Microphone());
  const [text, setText] = useState<string>("");
  const [blob, setBlob] = useState<Blob>(new Blob());
  const [showPredictionAndButton, setShowPredictionAndButton] =
    useState<boolean>(false);

  return (
    <>
      <WrapperMicrophone onClick={() => setIsOpened(!isOpened)}>
        {isOpened ? (
          <MicIcon
            fontSize="large"
            onClick={async (e) => {
              e.preventDefault();
              mic.stop();
              const blob = mic.getBlob();
              mic.reset();
              // console.log("uploading de blob to s3", blob?.size);
              if (blob?.size) {
                const text = await processAudio(blob);
                console.log(text);
                setText(text);
                setBlob(blob);
                setShowPredictionAndButton(true);
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
      {showPredictionAndButton && (
        <>
          <p>{text}</p>
          <Button
            onClick={() => {
              const filename: string =
                text.trim() + new Date().getTime().toString() + ".wav";
              uploadFileToS3Bucket(blob, filename, text);
              setShowPredictionAndButton(false);
            }}
          >
            Good prediction
          </Button>
        </>
      )}
    </>
  );
};
