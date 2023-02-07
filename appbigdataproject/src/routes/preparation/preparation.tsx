import { Button } from "@mui/material";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { difficulties } from "../../const";
import {
  fetchAllCategories,
  TriviaAPICategoryResponseStructure,
} from "../../services/trivia";
import { Loader, WrapperLoaderOrError } from "../../styles/global.style";

import { Categories } from "./components/categories/categories";
import { Difficulties } from "./components/difficulties/difficulties";
import { WrapperSections, WrapperStart } from "./preparation.style";

export const Preparation = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(9);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(
    difficulties[0]
  );

  const navigation = useNavigate();
  const queryClient = useQueryClient();
  queryClient.removeQueries("questions");

  const { data, isLoading, error } = useQuery<
    TriviaAPICategoryResponseStructure,
    Error
  >("categories", () => fetchAllCategories());

  if (isLoading) {
    return (
      <WrapperLoaderOrError>
        <Loader />
      </WrapperLoaderOrError>
    );
  }

  if (error)
    return <WrapperLoaderOrError>{error.message}</WrapperLoaderOrError>;

  return (
    <WrapperSections>
      <Categories
        data={data!}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
      />
      <Difficulties
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
      />
      <WrapperStart>
        <Button
          variant="outlined"
          disabled={
            selectedCategoryId == undefined || selectedDifficulty == undefined
          }
          onClick={(e) => {
            e.preventDefault();
            navigation(`../game/play`, {
              state: {
                selectedCategoryId,
                selectedDifficulty,
              },
            });
          }}
        >
          Go
        </Button>
      </WrapperStart>
    </WrapperSections>
  );
};
