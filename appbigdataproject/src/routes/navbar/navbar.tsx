import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Button } from "@mui/material";

import { GlobalWrapper, Wrapper } from "./navbar.style";
import { signOut } from "../../services/supabase";
import { AuthContext } from "../../libs/userContext";

export const NavBar = () => {
  const navigation = useNavigate();
  const { user_id, setUserId } = useContext(AuthContext);

  return (
    <GlobalWrapper>
      <Wrapper>
        {user_id && (
          <Button
            variant="text"
            onClick={() => navigation(`/${user_id}/personalStats`)}
          >
            Home
          </Button>
        )}
        <Button
          variant="text"
          onClick={() => {
            setUserId("");
            signOut(navigation);
          }}
        >
          {user_id !== "" ? "Disconnect" : "Sign in"}
        </Button>
      </Wrapper>
      <Outlet />
    </GlobalWrapper>
  );
};
