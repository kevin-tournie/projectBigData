import { Button } from "@mui/material";
import { useQuery } from "react-query";
import {
  Title,
  WrapperButton,
  WrapperDifficulties,
} from "./difficulties.style";

const difficulties = ["Easy", "Medium", "hard"];

export const Difficulties = ({
  selectedDifficulty,
  setSelectedDifficulty,
}: any) => {
  return (
    <WrapperDifficulties>
      <Title>Select a difficulty!</Title>

      {difficulties.map((difficulty: string, index: number) => (
        <WrapperButton key={index}>
          <Button
            variant={
              selectedDifficulty === difficulty ? "contained" : "outlined"
            }
            onClick={(e) => {
              e.preventDefault();
              setSelectedDifficulty(difficulty);
            }}
          >
            {difficulty}
          </Button>
        </WrapperButton>
      ))}
    </WrapperDifficulties>
  );
};
