import { TextField, Button } from "@mui/material";
import { AuthError } from "@supabase/supabase-js";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signInWithEmail } from "../../services/supabase";
import { AuthContext } from "../../userContext";

import {
  Title,
  WrapperErrorMessage,
  WrapperLink,
  WrapperLoginPage,
  WrapperNoAccount,
  WrapperTermsAndConditions,
  WrapperTextFieldsAndButton,
} from "./login.style";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigation = useNavigate();
  const { setUserId } = useContext(AuthContext);
  return (
    <WrapperLoginPage>
      <Title>The Big Neural Quiz</Title>
      <WrapperTextFieldsAndButton
        onSubmit={async (e) => {
          e.preventDefault();
          const error = await signInWithEmail(
            email,
            password,
            navigation,
            setUserId
          );
          if (error!) {
            setErrorMessage(error.message);
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
          }
        }}
      >
        <WrapperTermsAndConditions>
          By connecting to this website, you agree the company to use your voice
          for research purpose.
        </WrapperTermsAndConditions>
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
        <WrapperErrorMessage>
          {errorMessage && <span>{errorMessage}</span>}
        </WrapperErrorMessage>
        <Button type="submit" variant="outlined">
          Sign in
        </Button>
        <WrapperNoAccount>
          <span>Don't have an account yet ? </span>
          <WrapperLink to={"/register"}>Sign up</WrapperLink>
        </WrapperNoAccount>
      </WrapperTextFieldsAndButton>
    </WrapperLoginPage>
  );
};
