import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../supabaseClient";

import {
  Title,
  WrapperLoginPage,
  WrapperTextFieldsAndButton,
} from "./login.style";

export const Login = () => {
  const [pseudo, setPseudo] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigation = useNavigate();

  const handleConnection = async () => {
    const { data, error } = await supabase
      .from("Authentication")
      .select("username, password")
      .eq("username", pseudo)
      .eq("password", password);
    if (!error) {
      navigation("/preparation", {
        state: {
          pseudo,
          password,
        },
      });
    }
  };
  return (
    <WrapperLoginPage>
      <Title>The Big Neural Quiz</Title>
      <WrapperTextFieldsAndButton>
        <TextField
          label="Pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="outlined"
          onClick={(e) => {
            e.preventDefault();
            handleConnection();
          }}
        >
          Sign in
        </Button>
      </WrapperTextFieldsAndButton>
    </WrapperLoginPage>
  );
};
