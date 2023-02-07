import { Button } from "@mui/material";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import { categories } from "../../const";
import {
  getUserHistorySupabase,
  UserHistoryRow,
} from "../../services/supabase";
import { Loader, WrapperLoaderOrError } from "../../styles/global.style";
import {
  WrapperCell,
  WrapperTable,
  WrapperTableHeaders,
  WrapperTableRow,
  WrapperTableRows,
} from "./personalStats.style";

export const PersonalStats = () => {
  const { userId } = useParams();
  const { data, isLoading, error } = useQuery<UserHistoryRow[], Error>(
    "personalStats",
    () => getUserHistorySupabase(userId || "unknown")
  );
  const navigation = useNavigate();

  if (isLoading)
    return (
      <WrapperLoaderOrError>
        <Loader />
      </WrapperLoaderOrError>
    );

  if (error)
    return <WrapperLoaderOrError>{error.message}</WrapperLoaderOrError>;

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
            : data?.map((item: any, index: number) => (
                <WrapperTableRow key={index}>
                  <WrapperCell>
                    {new Date(Date.parse(item.created_at)).toDateString()}
                  </WrapperCell>
                  <WrapperCell>{`${
                    categories.find(
                      (category) => category.id === item.category_id
                    )?.name
                  }`}</WrapperCell>
                  <WrapperCell>{item.difficulty}</WrapperCell>
                  <WrapperCell>{item.score}</WrapperCell>
                </WrapperTableRow>
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
