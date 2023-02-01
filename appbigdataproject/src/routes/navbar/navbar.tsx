import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Button } from "@mui/material";
import { GlobalWrapper, Wrapper } from "./navbar.style";
import { signOut } from "../../services/supabase";
import { AuthContext } from "../../userContext";

export const NavBar = () => {
  const navigation = useNavigate();
  const { user_id } = useContext(AuthContext);

  return (
    <GlobalWrapper>
      <Wrapper>
        <Button variant="text" onClick={() => signOut(navigation)}>
          {user_id !== "" ? "Disconnect" : "Sign in"}
        </Button>
        <Button variant="text" onClick={() => navigation("/leaderboard")}>
          Leaderboard
        </Button>
      </Wrapper>
      <Outlet />
    </GlobalWrapper>
  );
};
