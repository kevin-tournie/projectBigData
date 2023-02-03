import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import { Microphone } from "microphone-js";
import { TimeLeftBar } from "./microphone.style";
import { useState, useEffect, useContext } from "react";
import { processAudio } from "../../../services/backend";
import { slideValue } from "../../../const";
import { Feedback } from "./feedback";
import { uploadFileToBucketSupabase } from "../../../services/supabase";
import { AuthContext } from "../../../userContext";

export const MyMicrophone = ({
  setTranslation,
  setAnswers,
  setAnsweredButton,
}: any) => {
  const { user_id } = useContext(AuthContext);

  const [mic, setMic] = useState<MicrophoneInstance>(Microphone());
  const [blob, setBlob] = useState<Blob>(new Blob());
  const [text, setText] = useState<string>("");

  const [showThinkingTimeBar, setShowThinkingTimeBar] = useState<boolean>(true);
  const [showFeedbackTimebarAndButtons, setShowFeedbackTimebarAndButtons] =
    useState<boolean>(false);
  const [showAnswerTimeBar, setShowAnswerTimeBar] = useState<boolean>(false);

  const [retry, setRetry] = useState<boolean>(false);
  const [filename, setFilename] = useState<string>("");
  const [timer, setTimer] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleMicStop = () => {
    setErrorMessage("");
    mic.stop();
    const blob = mic.getBlob();
    mic.reset();
    if (blob?.size) {
      processAudio(blob).then((text) => {
        if (text === "Could not recognize the word") {
          setRetry(true);
          setErrorMessage(text);
        } else {
          setBlob(blob);
          setAnsweredButton(text.trim().toUpperCase() + "button");
          setText(text);
          setShowFeedbackTimebarAndButtons(true);
        }
      });
    }
  };

  // Interrupt management
  useEffect(() => {
    if (retry) {
      setRetry(false);
      setAnsweredButton("");
      setShowFeedbackTimebarAndButtons(false);
      setShowAnswerTimeBar(true);
      mic.start();
      console.log("mic started");
      return () => clearTimeout(timer);
    }
  }, [retry]);

  // Phase 1: Thinking time
  useEffect(() => {
    if (showThinkingTimeBar) {
      setTimeout(() => {
        setShowThinkingTimeBar(false);
        setShowAnswerTimeBar(true);
        mic.start();
        console.log("mic started");
      }, 3000);
    }
  }, [showThinkingTimeBar]);

  // Phase 2: Answer time
  useEffect(() => {
    if (showAnswerTimeBar) {
      setTimeout(() => {
        setShowAnswerTimeBar(false);
        handleMicStop();
        console.log("mic stopped");
      }, 3000);
    }
  }, [showAnswerTimeBar]);

  // Phase 3: Feedback time
  useEffect(() => {
    if (showFeedbackTimebarAndButtons) {
      setTimer(
        setTimeout(() => {
          if (filename === "") {
            uploadFileToBucketSupabase(
              blob,
              `${text.trim()}_false_true_${new Date().getTime()}.wav`,
              user_id
            );
          } else {
            uploadFileToBucketSupabase(blob, filename, user_id);
          }
          setFilename("");
          setTranslation((state: number) => (state -= slideValue));
          setAnswers((state: string[]) => [...state, text]);
          setRetry(false);
          setErrorMessage("");
          setAnsweredButton("");
          setShowFeedbackTimebarAndButtons(false);
          setShowThinkingTimeBar(true);
        }, 3000)
      );
    }
  }, [showFeedbackTimebarAndButtons]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {errorMessage}
      {showThinkingTimeBar && <TimeLeftBar />}
      {showAnswerTimeBar ? (
        <>
          <TimeLeftBar />
          <MicIcon fontSize="large" />
        </>
      ) : (
        <>
          <MicOffIcon fontSize="large" />
        </>
      )}
      {showFeedbackTimebarAndButtons && (
        <>
          <TimeLeftBar />
          <Feedback text={text} setRetry={setRetry} setFilename={setFilename} />
        </>
      )}
    </div>
  );
};
