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
import { computeButtonVariant, computeScore } from "../../libs/utils";
import { sendEndgameResultsSupabase } from "../../services/supabase";
import { MyMicrophone } from "./components/microphone";
import { Loader, WrapperLoaderOrError } from "../../styles/global.style";
import {
  fetchQuestionsAnswers,
  PostProcessedQuestion,
} from "../../services/trivia";
import { maxQuestions, slideValue } from "../../libs/const";

export const Game = () => {
  const [translation, setTranslation] = useState<number>(0);
  const [showEndgame, setShowEndgame] = useState<boolean>(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [answeredButton, setAnsweredButton] = useState<any>("");

  const location = useLocation();
  const navigation = useNavigate();
  const { userId } = useParams();

  const { data, isLoading, error } = useQuery<PostProcessedQuestion[], Error>(
    "questions",
    () =>
      fetchQuestionsAnswers(
        location.state.selectedCategoryId,
        location.state.selectedDifficulty
      )
  );

  useEffect(() => {
    if (translation === slideValue * -1 * maxQuestions && data !== undefined) {
      const endgameScore = computeScore(data, answers);
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
      <WrapperLoaderOrError>
        <Loader />
      </WrapperLoaderOrError>
    );

  if (error)
    return <WrapperLoaderOrError>{error.message}</WrapperLoaderOrError>;

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

  if (data !== undefined)
    return (
      <WrapperGame>
        <WrapperCategory>{data[0].category}</WrapperCategory>
        <WrapperQuizProgress>{`${
          translation * -0.1 + 1
        } / ${maxQuestions}`}</WrapperQuizProgress>
        <WrapperOverflow>
          <WrapperSlider translation={translation}>
            {data.map((question, index) => {
              return (
                <WrapperCard key={index}>
                  <WrapperQuestion>{question.question}</WrapperQuestion>
                  <WrapperAnswers>
                    {question.shuffledAnswers.map((answer, index) => {
                      return (
                        <WrapperAnswer key={index}>
                          <Button
                            variant={
                              answeredButton === computeButtonVariant(answer)
                                ? "contained"
                                : "outlined"
                            }
                          >
                            {answer}
                          </Button>
                        </WrapperAnswer>
                      );
                    })}
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
