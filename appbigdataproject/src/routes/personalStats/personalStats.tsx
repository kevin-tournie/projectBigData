import { Button } from "@mui/material";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import { categories } from "../../const";
import { getUserHistorySupabase } from "../../services/supabase";
import {
  WrapperCell,
  WrapperTable,
  WrapperTableHeaders,
  WrapperTableRows,
} from "./personalStats.style";

export const PersonalStats = () => {
  const { userId } = useParams();
  const { data, isLoading, error } = useQuery("personalStats", () =>
    getUserHistorySupabase(userId || "unknown")
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const navigation = useNavigate();
  return (
    <div style={{ margin: "20px", position: "relative" }}>
      <h2>Personal Stats</h2>
      <WrapperTable>
        <WrapperTableHeaders>
          <WrapperCell>Date</WrapperCell>
          <WrapperCell>Category</WrapperCell>
          <WrapperCell>Difficulty</WrapperCell>
          <WrapperCell>Score</WrapperCell>
        </WrapperTableHeaders>
        <WrapperTableRows isEmpty={data?.length === 0}>
          {data?.length === 0
            ? "No recent games played"
            : data?.map((item: any) => (
                <>
                  <WrapperCell>
                    {new Date(Date.parse(item.created_at)).toDateString()}
                  </WrapperCell>
                  <WrapperCell>{`${
                    categories.find(
                      (category) => (category.id = item.category_id)
                    )?.name
                  }`}</WrapperCell>
                  <WrapperCell>{item.difficulty}</WrapperCell>
                  <WrapperCell>{item.score}</WrapperCell>
                </>
              ))}
        </WrapperTableRows>
      </WrapperTable>
      <Button
        variant="contained"
        style={{ position: "absolute", bottom: "0px", right: "20px" }}
        onClick={() => navigation("../game/preparation")}
      >
        New game
      </Button>
    </div>
  );
};
