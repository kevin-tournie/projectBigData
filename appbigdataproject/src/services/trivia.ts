import { maxQuestions } from "../const";
import { shuffleArray } from "./utils";

export interface IQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export const fetchQuestionsAnswers = async (
  selectedCategoryId: number,
  selectedDifficulty: string
) => {
  const result = await fetch(
    `https://opentdb.com/api.php?amount=${maxQuestions}&category=${selectedCategoryId}&difficulty=${
      selectedDifficulty.toLowerCase() === "super easy"
        ? "easy"
        : selectedDifficulty.toLowerCase()
    }&type=${
      selectedDifficulty.toLowerCase() === "super easy" ? "boolean" : "multiple"
    }`
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
    });
  return result;
};

export const fetchAllCategories = async () => {
  const result = await fetch("https://opentdb.com/api_category.php")
    .then((data) => data.json())
    .then((data) => {
      return data;
    });
  return result;
};
