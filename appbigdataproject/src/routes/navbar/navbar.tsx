import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { GlobalWrapper, Wrapper } from "./navbar.style";
import { signOut } from "../../services/supabase";

export const NavBar = () => {
  const navigation = useNavigate();
  const location = useLocation();

  return (
    <GlobalWrapper>
      <Wrapper>
        <Button variant="text" onClick={() => signOut(navigation)}>
          {location.state?.session ? "Disconnect" : "Sign in"}
        </Button>
        <Button variant="text" onClick={() => navigation("/leaderboard")}>
          Leaderboard
        </Button>
      </Wrapper>
      <Outlet />
    </GlobalWrapper>
  );
};
