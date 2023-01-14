import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import { Categories } from "./components/categories/categories";
import { Difficulties } from "./components/difficulties/difficulties";
import { WrapperSections, WrapperStart } from "./preparation.style";

export const Preparation = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>();

  const navigation = useNavigate();
  const { userId } = useParams();

  return (
    <WrapperSections>
      <Categories
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
