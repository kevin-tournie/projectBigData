import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import { Microphone } from "microphone-js";
import { TimeLeftBar, Wrapper } from "./microphone.style";
import { useState, useEffect, useContext } from "react";
import { processAudio } from "../../../services/backend";
import { slideValue } from "../../../const";
import { uploadFileToBucketSupabase } from "../../../services/supabase";
import { AuthContext } from "../../../userContext";

const thinkingTime = 5000;
const answerTime = 3000;

export const MyMicrophone = ({
  setTranslation,
  setAnswers,
  setAnsweredButton,
}: any) => {
  const { user_id } = useContext(AuthContext);

  const [mic, setMic] = useState<MicrophoneInstance>(Microphone());
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [showThinkingTimeBar, setShowThinkingTimeBar] = useState<boolean>(true);
  const [showAnswerTimeBar, setShowAnswerTimeBar] = useState<boolean>(false);

  const handleMicStop = () => {
    setErrorMessage("");
    mic.stop();
    const blob = mic.getBlob();
    mic.reset();
    if (blob?.size) {
      processAudio(blob).then((text) => {
        if (text === "Could not recognize the word") {
          setErrorMessage(text + "! Try again!");
          setShowAnswerTimeBar(true);
          mic.start();
        } else {
          setAnsweredButton(text.trim().toUpperCase() + "button");
          uploadFileToBucketSupabase(
            blob,
            `${text.trim()}_${new Date().getTime()}.wav`,
            user_id
          );

          // Next question
          setTimeout(() => {
            setTranslation((state: number) => (state -= slideValue));
            setAnswers((state: string[]) => [...state, text.trim()]);
            setErrorMessage("");
            setAnsweredButton("");
            setShowThinkingTimeBar(true);
          }, 2000);
        }
      });
    }
  };

  // Phase 1: Thinking time
  useEffect(() => {
    if (showThinkingTimeBar) {
      setTimeout(() => {
        setShowThinkingTimeBar(false);
        setShowAnswerTimeBar(true);
        mic.start();
      }, 5000);
    }
  }, [showThinkingTimeBar]);

  // Phase 2: Answer time
  useEffect(() => {
    if (showAnswerTimeBar) {
      setTimeout(() => {
        setShowAnswerTimeBar(false);
        handleMicStop();
      }, 3000);
    }
  }, [showAnswerTimeBar]);

  return (
    <Wrapper>
      {errorMessage}
      {showThinkingTimeBar && <TimeLeftBar time={thinkingTime} />}
      {showAnswerTimeBar ? (
        <>
          <TimeLeftBar time={answerTime} />
          <MicIcon fontSize="large" />
        </>
      ) : (
        <>
          <MicOffIcon fontSize="large" />
        </>
      )}
    </Wrapper>
  );
};
