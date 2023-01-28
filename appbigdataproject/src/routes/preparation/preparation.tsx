import { Button } from "@mui/material";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router";
import { Loader, WrapperLoader } from "../../styles/global.style";

import { Categories } from "./components/categories/categories";
import { Difficulties } from "./components/difficulties/difficulties";
import { WrapperSections, WrapperStart } from "./preparation.style";

export const Preparation = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>();

  const location = useLocation();
  const navigation = useNavigate();
  const { userId } = useParams();
  const queryClient = useQueryClient();
  queryClient.removeQueries("questions");

  const { data, isLoading, error } = useQuery("categories", () =>
    fetch("https://opentdb.com/api_category.php").then((data) => data.json())
  );

  if (isLoading)
    return (
      <WrapperLoader>
        <Loader />
      </WrapperLoader>
    );

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
            navigation(`/game/${userId}/play`, {
              state: {
                ...location.state,
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
