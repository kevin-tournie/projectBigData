import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { handleRegisterSupabase } from "../../services/supabase";

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
            handleRegisterSupabase(
              pseudo,
              password,
              confirmPassword,
              navigation
            );
          }}
        >
          Sign up
        </Button>
        <div
          style={{
            color: "#3C76D2",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <span>Already have an account ? </span>
          <Link
            to={"/login"}
            style={{
              textDecoration: "none",
              textDecorationColor: "none",
              color: "#1a4282",
              fontWeight: "semi",
            }}
          >
            Sign in
          </Link>
        </div>
      </WrapperTextFieldsAndButton>
    </WrapperLoginPage>
  );
};
