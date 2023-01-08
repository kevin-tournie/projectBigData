import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../supabaseClient";

import {
  Title,
  WrapperLoginPage,
  WrapperTextFieldsAndButton,
} from "./register.style";

export const Register = () => {
  const [pseudo, setPseudo] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigation = useNavigate();

  const handleRegister = async () => {
    if (password === confirmPassword) {
      const { error } = await supabase
        .from("Authentication")
        .insert({ username: pseudo, password });
      if (error) {
        console.log(error);
      } else {
        navigation("/preparation", {
          state: {
            pseudo,
            password,
          },
        });
      }
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
        <TextField
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          variant="outlined"
          onClick={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          Sign up
        </Button>
      </WrapperTextFieldsAndButton>
    </WrapperLoginPage>
  );
};
