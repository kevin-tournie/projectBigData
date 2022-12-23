import { useQuery } from "react-query";
import { useLocation } from "react-router";

export const Game = () => {
  const location = useLocation();
  console.log(location.state);
  const { data, isLoading, error } = useQuery("questions", () =>
    fetch(
      "https://opentdb.com/api.php?amount=10&category=" +
        location.state.selectedCategoryId +
        "&difficulty=" +
        location.state.selectedDifficulty.toLowerCase() +
        "&type=multiple"
    ).then((data) => data.json())
  );

  if (isLoading) return <div>Loading</div>;

  console.log(data);
  return <></>;
};
