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
  WrapperQuizProgress,
} from "./game.style";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { computeScore } from "../../services/utils";
import { sendEndgameResultsSupabase } from "../../services/supabase";
import { MyMicrophone } from "./components/microphone";
import { Loader, WrapperLoader } from "../../styles/global.style";
import { fetchQuestionsAnswers } from "../../services/trivia";
import { maxQuestions, slideValue } from "../../const";

export const Game = () => {
  const [translation, setTranslation] = useState<number>(0);
  const [showEndgame, setShowEndgame] = useState<boolean>(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [answeredButton, setAnsweredButton] = useState<any>("");

  const location = useLocation();
  const navigation = useNavigate();
  const { userId } = useParams();

  const { data, isLoading, error } = useQuery("questions", () =>
    fetchQuestionsAnswers(location)
  );

  useEffect(() => {
    if (translation === slideValue * -1 * maxQuestions) {
      const endgameScore = computeScore(data.results, answers);
      setScore(endgameScore);

      sendEndgameResultsSupabase(
        userId || "unknown",
        location.state.selectedCategoryId,
        location.state.selectedDifficulty,
        endgameScore
      );
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
            navigation("../game/preparation");
          }}
        >
          Replay
        </Button>
      </WrapperPostGame>
    );

  return (
    <WrapperGame>
      <WrapperCategory>{data.results[0].category}</WrapperCategory>
      <WrapperQuizProgress>{`${
        translation * -0.1 + 1
      } / ${maxQuestions}`}</WrapperQuizProgress>
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
                    (answer: string, index: number) => {
                      const buttonText =
                        answer === "True"
                          ? "Yes"
                          : answer === "False"
                          ? "No"
                          : index +
                            1 +
                            ") " +
                            answer
                              .replaceAll(/&quot;/g, '"')
                              .replaceAll(/&#039;/g, "'");
                      return (
                        <WrapperAnswer>
                          <Button
                            variant={
                              answeredButton ===
                              buttonText.trim().toUpperCase() + "button"
                                ? "contained"
                                : "outlined"
                            }
                          >
                            {buttonText}
                          </Button>
                        </WrapperAnswer>
                      );
                    }
                  )}
                </WrapperAnswers>
              </WrapperCard>
            );
          })}
        </WrapperSlider>
      </WrapperOverflow>
      <MyMicrophone
        setTranslation={setTranslation}
        setAnswers={setAnswers}
        setAnsweredButton={setAnsweredButton}
      />
    </WrapperGame>
  );
};
