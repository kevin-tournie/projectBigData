import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
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
      .select("id")
      .eq("username", pseudo)
      .eq("password", password);
    if (!error) {
      navigation(`/game/${data[0].id}/preparation`, {
        state: { connected: true },
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
          <span>Don't have an account yet ? </span>
          <Link
            to={"/register"}
            style={{
              textDecoration: "none",
              textDecorationColor: "none",
              color: "#1a4282",
              fontWeight: "semi",
            }}
          >
            Sign up
          </Link>
        </div>
      </WrapperTextFieldsAndButton>
    </WrapperLoginPage>
  );
};
