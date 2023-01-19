import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router";
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
import { supabase } from "../../supabaseClient";
import { MyMicrophone } from "../../components/microphone";
import { Loader, WrapperLoader } from "../../styles/global.style";

const slideValue = 10;

export const Game = () => {
  const [translation, setTranslation] = useState<number>(0);
  const [showEndgame, setShowEndgame] = useState<boolean>(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);

  const location = useLocation();
  const navigation = useNavigate();
  const { userId } = useParams();

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

  const handleSubmit = async () => {
    const { error } = await supabase.from("Games").insert([
      {
        user_id: userId,
        category: location.state.selectedCategoryId,
        difficulty: location.state.selectedDifficulty.toLowerCase(),
        score: computeScore(data.results, answers),
      },
    ]);
    console.log(error);
  };

  useEffect(() => {
    if (translation === slideValue * -10) {
      setScore(computeScore(data.results, answers));
      handleSubmit();
      setShowEndgame(true);
    }
  }, [translation]);

  if (isLoading)
    return (
      <WrapperLoader>
        <Loader />
      </WrapperLoader>
    );

  if (error) return <div>Error</div>;

  if (showEndgame)
    return (
      <WrapperPostGame>
        <WrapperScore>Score : {score}</WrapperScore>
        <Button
          variant="outlined"
          onClick={(e) => {
            e.preventDefault();

            navigation("/game/" + userId + "/preparation");
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

                            setTranslation((state) => (state -= slideValue));
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
      <MyMicrophone />
    </WrapperGame>
  );
};
