import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes, Navigate } from "react-router";
import { AuthSecurity } from "./routes/authsecurity/authsecurity";

import { Game } from "./routes/game/game";
import { LeaderBoard } from "./routes/leaderboard/leaderboard";
import { Login } from "./routes/login/login";
import { NavBar } from "./routes/navbar/navbar";
import { PersonalStats } from "./routes/personalStats/personalStats";
import { Preparation } from "./routes/preparation/preparation";
import { Register } from "./routes/register/register";
import { AuthContext } from "./userContext";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  });

  const [user_id, setUserId] = useState<string>("");
  const value = { user_id, setUserId };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={value}>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/:userId" element={<AuthSecurity />}>
              <Route
                path="/:userId/personalStats"
                element={<PersonalStats />}
              />
              <Route
                path="/:userId/game/preparation"
                element={<Preparation />}
              />
              <Route path="/:userId/game/play" element={<Game />} />
            </Route>
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/*" element={<Navigate to="/login" />} />
            <Route path="" element={<Navigate to="/login" />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
