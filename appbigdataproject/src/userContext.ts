import { createContext } from "react";

export const AuthContext = createContext({
  user_id: "",
  setUserId: (id: string) => {},
});
