import { TextField, Button } from "@mui/material";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { signUpWithEmail } from "../../services/supabase";
import { AuthContext } from "../../libs/userContext";
import {
  WrapperLink,
  WrapperNoAccount,
  WrapperTermsAndConditions,
} from "../login/login.style";

import {
  Title,
  WrapperLoginPage,
  WrapperPrivacyPolicy,
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
        <WrapperTermsAndConditions>
          By signing up, you agree with our
          <WrapperPrivacyPolicy href="privacy_policy.html">
            privacy policy.
          </WrapperPrivacyPolicy>
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
        <Button variant="outlined" type="submit">
          Sign up
        </Button>
        <WrapperNoAccount>
          <span>Already have an account ? </span>
          <WrapperLink to={"/login"}>Sign in</WrapperLink>
        </WrapperNoAccount>
      </WrapperTextFieldsAndButton>
    </WrapperLoginPage>
  );
};
