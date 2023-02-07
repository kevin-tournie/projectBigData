import { numberMap } from "../const";
import { IQuestion } from "./trivia";

export function shuffleArray(array: string[]) {
  return array
    .sort(() => 0.5 - Math.random())
    .map((a, index) => index + 1 + ")" + a);
}

export function computeScore(questions: IQuestion[], answers: string[]) {
  let score = 0;
  if (answers[0].toLowerCase() === ("yes" || "no")) {
    questions.forEach((question, index) => {
      if (
        question.correct_answer.toLowerCase() ===
        (answers[index].toLowerCase() === "yes" ? "true" : "false")
      ) {
        score += 1;
      }
    });
  } else {
    questions.forEach((question, index) => {
      if (
        question.correct_answer.toLowerCase() === question.incorrect_answers
      ) {
        score += 1;
      }
    });
  }

  return score;
}

export function computeButtonText(index: number, answer: string) {
  if (answer.toLowerCase() === "true") {
    return "Yes";
  } else if (answer.toLowerCase() === "false") {
    return "No";
  } else {
    return `${index + 1} )${answer
      .replaceAll(/&quot;/g, '"')
      .replaceAll(/&#039;/g, "'")}button`;
  }
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
