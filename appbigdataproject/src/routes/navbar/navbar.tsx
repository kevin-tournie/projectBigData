import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { GlobalWrapper, Wrapper } from "./navbar.style";

export const NavBar = () => {
  const navigation = useNavigate();
  return (
    <GlobalWrapper>
      <Wrapper>
        <Button variant="text" onClick={() => navigation("/login")}>
          Login
        </Button>
        <Button variant="text" onClick={() => navigation("/register")}>
          Register
        </Button>
        <Button variant="text" onClick={() => navigation("/leaderboard")}>
          Leaderboard
        </Button>
      </Wrapper>
      <Outlet />
    </GlobalWrapper>
  );
};
