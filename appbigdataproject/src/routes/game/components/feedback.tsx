import { Button } from "@mui/material";
import { WrapperButtons } from "./microphone.style";

export const Feedback = ({ text, setRetry, setFilename }: any) => {
  return (
    <WrapperButtons>
      <Button
        variant="outlined"
        onClick={(e) => {
          e.preventDefault();
          const filename: string = `${text.trim()}_true_false_${new Date().getTime()}.wav`;
          setRetry(true);
          setFilename(filename);
        }}
      >
        Bad prediction
      </Button>
      <Button
        variant="outlined"
        onClick={(e) => {
          e.preventDefault();
          const filename: string = `${text.trim()}_true_true_${new Date().getTime()}.wav`;
          setFilename(filename);
        }}
      >
        Good prediction
      </Button>
    </WrapperButtons>
  );
};
