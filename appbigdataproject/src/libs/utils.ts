import { numberMap } from "./const";
import { PostProcessedQuestion } from "../services/trivia";

export function shuffleArray(array: string[]) {
  return array.sort(() => 0.5 - Math.random());
}

export function computeSingleQuestionScore(
  answer: string,
  question: PostProcessedQuestion
) {
  if (question.type === "boolean") {
    return question.correct_answer ===
      (answer.toLowerCase() === "yes" ? "True" : "False")
      ? "success"
      : "error";
  } else {
    return answer.includes(question.correct_answer) ? "success" : "error";
  }
}

export function computeScore(
  questions: PostProcessedQuestion[],
  answers: string[]
) {
  let score = 0;
  if (questions[0].type === "boolean") {
    questions.forEach((question, index) => {
      if (
        question.correct_answer ===
        (answers[index].toLowerCase() === "yes" ? "True" : "False")
      ) {
        score += 1;
      }
    });
  } else {
    const mappedAnswers = answers.map((answer) =>
      numberMap.find((textNumber) => textNumber[0] === answer)
    );
    questions.forEach((question, index) => {
      const answer = mappedAnswers[index];
      if (answer === undefined) {
        score += 0;
      } else {
        const correspondingAnswer = question.shuffledAnswers.find((answer) =>
          answer.startsWith(answer[1])
        );
        if (correspondingAnswer?.includes(question.correct_answer)) {
          score += 1;
        }
      }
    });
  }

  return score;
}

export function computeButtonVariant(buttonText: string) {
  let result = "";
  if (buttonText === "Yes" || buttonText === "No") {
    result = buttonText.toUpperCase();
  } else if (buttonText.startsWith("1")) {
    result = "ONE";
  } else if (buttonText.startsWith("2")) {
    result = "TWO";
  } else if (buttonText.startsWith("3")) {
    result = "THREE";
  } else if (buttonText.startsWith("4")) {
    result = "FOUR";
  }
  return result + "button";
}
