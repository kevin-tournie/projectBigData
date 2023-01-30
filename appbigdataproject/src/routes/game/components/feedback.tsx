import { Button } from "@mui/material";
import { useLocation } from "react-router";
import { uploadFileToBucketSupabase } from "../../../services/supabase";
import { TimeLeftBar, WrapperButtons } from "./microphone.style";

export const Feedback = ({ text, blob, setInterrupt }: any) => {
  const location = useLocation();

  return (
    <div>
      <TimeLeftBar />
      <WrapperButtons>
        <Button
          variant="outlined"
          onClick={(e) => {
            e.preventDefault();
            setInterrupt(true);
          }}
        >
          Bad prediction
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setInterrupt(false);
            const filename: string =
              text.trim() + new Date().getTime().toString() + ".wav";
            uploadFileToBucketSupabase(
              blob,
              filename,
              location.state.session.user.id
            );
          }}
        >
          Good prediction
        </Button>
      </WrapperButtons>
    </div>
  );
};
