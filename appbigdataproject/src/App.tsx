import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Route, Routes, Navigate } from "react-router";

import { Game } from "./routes/game/game";
import { LeaderBoard } from "./routes/leaderboard/leaderboard";
import { Login } from "./routes/login/login";
import { NavBar } from "./routes/navbar/navbar";
import { Preparation } from "./routes/preparation/preparation";
import { Register } from "./routes/register/register";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/home" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/game" element={<Game />} />
          <Route path="/preparation" element={<Preparation />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/*" element={<Navigate to="/login" />} />
          <Route path="" element={<Navigate to="/login" />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
