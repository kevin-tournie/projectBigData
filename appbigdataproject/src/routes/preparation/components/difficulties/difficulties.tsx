import { Button } from "@mui/material";
import { difficulties } from "../../../../const";
import {
  Title,
  WrapperButton,
  WrapperDifficulties,
} from "./difficulties.style";

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
