import { useQuery } from "react-query";
import { useMemo } from "react";

export const fetchQuestionAnswers = (location: any) => {
  const { data, isLoading, error } = useQuery("questions", () =>
    fetch(
      "https://opentdb.com/api.php?amount=10&category=" +
        location.state.selectedCategoryId +
        "&difficulty=" +
        location.state.selectedDifficulty.toLowerCase() +
        "&type=multiple"
    ).then((data) => data.json())
  );
  return [data, isLoading, error];
};
