import { TextField, Button } from "@mui/material";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { signUpWithEmail } from "../../services/supabase";
import { AuthContext } from "../../userContext";

import {
  Title,
  WrapperLoginPage,
  WrapperTextFieldsAndButton,
} from "./register.style";

export const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigation = useNavigate();
  const { setUserId } = useContext(AuthContext);
  return (
    <WrapperLoginPage>
      <Title>The Big Neural Quiz</Title>
      <WrapperTextFieldsAndButton
        onSubmit={(e) => {
          e.preventDefault();
          signUpWithEmail(email, password, navigation, setUserId);
        }}
      >
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="outlined" type="submit">
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
