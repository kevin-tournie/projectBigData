import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import { Microphone } from "microphone-js";
import { WrapperMicrophone } from "./microphone.style";
import { useState } from "react";

const mic = Microphone();

export const MyMicrophone = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <WrapperMicrophone onClick={() => setIsOpened(!isOpened)}>
      {isOpened ? (
        <MicIcon
          fontSize="large"
          onClick={(e) => {
            e.preventDefault();
            mic.stop();
            const blob = mic.getBlob();
            console.log(blob);
            mic.download();
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
