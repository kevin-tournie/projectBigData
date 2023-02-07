import { Button } from "@mui/material";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { difficulties } from "../../const";
import { fetchAllCategories } from "../../services/trivia";
import { Loader, WrapperLoader } from "../../styles/global.style";

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

  const { data, isLoading, error } = useQuery("categories", () =>
    fetchAllCategories()
  );

  if (isLoading)
    return (
      <WrapperLoader>
        <Loader />
      </WrapperLoader>
    );

  if (data !== undefined) {
    return (
      <WrapperSections>
        <Categories
          data={data}
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
  }
};
