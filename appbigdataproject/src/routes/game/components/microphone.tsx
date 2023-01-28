import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import { Microphone } from "microphone-js";
import { WrapperMicrophone } from "./microphone.style";
import { useState } from "react";
import { Button } from "@mui/material";
import { useLocation } from "react-router";

import { processAudio } from "../../../services/backend";
import { uploadFileToBucketSupabase } from "../../../services/supabase";

export const MyMicrophone = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [mic, setMic] = useState<MicrophoneInstance>(Microphone());
  const [text, setText] = useState<string>("");
  const [blob, setBlob] = useState<Blob>(new Blob());
  const [showPredictionAndButton, setShowPredictionAndButton] =
    useState<boolean>(false);

  const location = useLocation();
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
              if (blob?.size) {
                const text = await processAudio(blob);
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
              uploadFileToBucketSupabase(
                blob,
                filename,
                location.state.session.user.id
              );
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
