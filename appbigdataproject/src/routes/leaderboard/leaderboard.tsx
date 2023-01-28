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
import {
  computerScoresSupabase,
  IPlayerTotalScore,
} from "../../services/supabase";
import { Title, Wrapper, WrapperTable } from "./leaderboard.style";

export const LeaderBoard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataScoresPerPlayer, setDataScoresPerPlayer] = useState<
    IPlayerTotalScore[]
  >([]);

  useEffect(() => {
    setLoading(true);
    computerScoresSupabase(setDataScoresPerPlayer);
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
