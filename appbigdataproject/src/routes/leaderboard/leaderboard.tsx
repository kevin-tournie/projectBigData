import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";
import { Title, Wrapper, WrapperTable } from "./leaderboard.style";

interface IPlayerTotalScore {
  userId: number;
  username: string;
  totalScore: number;
}

export const LeaderBoard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataScoresPerPlayer, setDataScoresPerPlayer] = useState<
    IPlayerTotalScore[]
  >([]);

  const getScores = async () => {
    let totalScoresPerPlayer: IPlayerTotalScore[] = [];

    const { data: dataGames, error: errorGames } = await supabase
      .from("Games")
      .select("user_id, score");
    const { data: dataUsernames, error: errorUsernames } = await supabase
      .from("Authentication")
      .select("id, username");

    if (!errorUsernames) {
      for (let dataUsername of dataUsernames) {
        totalScoresPerPlayer.push({
          userId: dataUsername.id,
          username: dataUsername.username,
          totalScore: 0,
        });
      }
    }

    if (!errorGames) {
      for (let game of dataGames) {
        for (let player of totalScoresPerPlayer) {
          if (game.user_id === player.userId) {
            player.totalScore += game.score;
          }
        }
      }
      totalScoresPerPlayer.sort(
        (player1, player2) => player2.totalScore - player1.totalScore
      );
      setDataScoresPerPlayer(totalScoresPerPlayer);
    }
  };

  useEffect(() => {
    setLoading(true);
    getScores();
    setLoading(false);
  }, []);

  if (loading) return <div>Loading</div>;

  return (
    <Wrapper>
      <Title>Leaderboard</Title>
      <WrapperTable>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Player</TableCell>
                <TableCell align="right">Total score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataScoresPerPlayer.map((player: IPlayerTotalScore) => (
                <TableRow
                  key={player.userId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{player.username}</TableCell>
                  <TableCell align="right">{player.totalScore}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </WrapperTable>
    </Wrapper>
  );
};
