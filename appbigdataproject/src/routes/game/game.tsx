import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router";
import {
  WrapperQuestion,
  WrapperCategory,
  WrapperGame,
  WrapperOverflow,
  WrapperSlider,
  WrapperAnswers,
  WrapperAnswer,
  WrapperCard,
  WrapperPostGame,
  WrapperScore,
} from "./game.style";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { computeScore, shuffleArray } from "../../services/utils";

export const Game = () => {
  const [translation, setTranslation] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const location = useLocation();
  const navigation = useNavigate();

  useEffect(() => {
    if (translation === -100) {
      console.log("answers", answers);
    }
  }, [translation]);

  const { data, isLoading, error } = useQuery("questions", () =>
    fetch(
      "https://opentdb.com/api.php?amount=10&category=" +
        location.state.selectedCategoryId +
        "&difficulty=" +
        location.state.selectedDifficulty.toLowerCase() +
        "&type=multiple"
    )
      .then((data) => data.json())
      .then((data) => {
        data.results.forEach((question: any) => {
          question.shuffledAnswers = shuffleArray([
            question.correct_answer,
            ...question.incorrect_answers,
          ]);
        });
        return data;
      })
  );

  if (isLoading) return <div>Loading</div>;

  console.log(data);

  if (translation == -100)
    return (
      <WrapperPostGame>
        <WrapperScore>
          Score : {computeScore(data.results, answers)}
        </WrapperScore>
        <Button
          variant="outlined"
          onClick={(e) => {
            e.preventDefault();

            navigation("/preparation");
          }}
        >
          Replay
        </Button>
      </WrapperPostGame>
    );

  return (
    <WrapperGame>
      <WrapperCategory>{data.results[0].category}</WrapperCategory>
      <WrapperOverflow>
        <WrapperSlider translation={translation}>
          {data.results.map((question: any) => {
            return (
              <WrapperCard>
                <WrapperQuestion>
                  {question.question
                    .replaceAll(/&quot;/g, '"')
                    .replaceAll(/&#039;/g, "'")}
                </WrapperQuestion>
                <WrapperAnswers>
                  {question.shuffledAnswers.map(
                    (answer: string, index: number) => (
                      <WrapperAnswer>
                        <Button
                          variant="outlined"
                          onClick={(e) => {
                            e.preventDefault();

                            setTranslation((state) => (state -= 10));
                            setAnswers((state: string[]) => [...state, answer]);
                          }}
                        >
                          {index + 1}){" "}
                          {answer
                            .replaceAll(/&quot;/g, '"')
                            .replaceAll(/&#039;/g, "'")}
                        </Button>
                      </WrapperAnswer>
                    )
                  )}
                </WrapperAnswers>
              </WrapperCard>
            );
          })}
        </WrapperSlider>
      </WrapperOverflow>
    </WrapperGame>
  );
};
