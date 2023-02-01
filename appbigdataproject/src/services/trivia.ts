import { maxQuestions } from "../const";
import { shuffleArray } from "./utils";

export const fetchQuestionsAnswers = async (location: any) => {
  const result = await fetch(
    `https://opentdb.com/api.php?amount=${maxQuestions}&category=` +
      location.state.selectedCategoryId +
      "&difficulty=" +
      location.state.selectedDifficulty.toLowerCase() +
      "&type=boolean"
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
