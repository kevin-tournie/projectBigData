import { Button } from "@mui/material";
import { difficulties } from "../../../../const";
import {
  Title,
  WrapperButton,
  WrapperDifficulties,
} from "./difficulties.style";

type DifficultiesProps = {
  selectedDifficulty: string;
  setSelectedDifficulty: (difficulty: string) => void;
};

export const Difficulties = ({
  selectedDifficulty,
  setSelectedDifficulty,
}: DifficultiesProps) => {
  return (
    <WrapperDifficulties>
      <Title>Select a difficulty!</Title>
      {difficulties.map((difficulty, index) => (
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
