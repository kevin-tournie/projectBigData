import { Button } from "@mui/material";
import { useContext } from "react";
import { uploadFileToBucketSupabase } from "../../../services/supabase";
import { AuthContext } from "../../../userContext";
import { TimeLeftBar, WrapperButtons } from "./microphone.style";

export const Feedback = ({ text, blob, setInterrupt }: any) => {
  const { user_id } = useContext(AuthContext);
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
            uploadFileToBucketSupabase(blob, filename, user_id);
          }}
        >
          Good prediction
        </Button>
      </WrapperButtons>
    </div>
  );
};
