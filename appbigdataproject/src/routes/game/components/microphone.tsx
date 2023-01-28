import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import { Microphone } from "microphone-js";
import { WrapperMicrophone } from "./microphone.style";
import { useState, useEffect } from "react";
import { processAudio } from "../../../services/backend";
import { slideValue } from "../../../const";
import { Feedback } from "./feedback";
import { timeout } from "../../../services/utils";

export const MyMicrophone = ({
  setTranslation,
  setAnswers,
  setAnsweredButton,
}: any) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [mic, setMic] = useState<MicrophoneInstance>(Microphone());
  const [text, setText] = useState<string>("");
  const [blob, setBlob] = useState<Blob>(new Blob());
  const [showButtons, setShowButtons] = useState<boolean>(false);
  const [interrupt, setInterrupt] = useState<boolean>(false);
  const [timer, setTimer] = useState<any>(null);

  const handleMicStop = () => {
    mic.stop();
    const blob = mic.getBlob();
    mic.reset();
    if (blob?.size) {
      processAudio(blob).then((text) => {
        setText(text);
        setBlob(blob);
        setShowButtons(true);
        setAnsweredButton(text.trim().toUpperCase() + "button");
      });
    }
  };

  useEffect(() => {
    if (interrupt) {
      setInterrupt(false);
      setShowButtons(false);
      setText("");
      return () => clearTimeout(timer);
    }
  }, [interrupt]);

  useEffect(() => {
    if (text !== "") {
      setTimer(
        setTimeout(() => {
          if (interrupt === false) {
            setTranslation((state: number) => (state -= slideValue));
            setAnswers((state: string[]) => [...state, text]);
            setInterrupt(false);
          }
          setAnsweredButton("");
          setShowButtons(false);
          setText("");
        }, 5000)
      );
    }
  }, [text]);
  return (
    <>
      <WrapperMicrophone onClick={() => setIsOpened(!isOpened)}>
        {isOpened ? (
          <MicIcon
            fontSize="large"
            onClick={async (e) => {
              e.preventDefault();
              handleMicStop();
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
      {text}
      {showButtons && (
        <Feedback text={text} blob={blob} setInterrupt={setInterrupt} />
      )}
    </>
  );
};
