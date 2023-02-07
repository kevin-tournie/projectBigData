import { maxQuestions } from "../const";
import { shuffleArray } from "./utils";

type PreProcessedQuestion = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type TriviaAPIResponseStructure = {
  response_code: number;
  results: PreProcessedQuestion[];
};

type PostProcessedQuestion = PreProcessedQuestion & {
  shuffledAnswers: string[];
};

type TriviaAPICategoryResponseStructure = {
  trivia_categories: {
    id: number;
    name: string;
  }[];
};

export const fetchQuestionsAnswers = async (
  selectedCategoryId: number,
  selectedDifficulty: string
): Promise<PostProcessedQuestion[] | string> => {
  try {
    const questions = await fetch(
      `https://opentdb.com/api.php?amount=${maxQuestions}&category=${selectedCategoryId}&difficulty=${
        selectedDifficulty.toLowerCase() === "super easy"
          ? "easy"
          : selectedDifficulty.toLowerCase()
      }&type=${
        selectedDifficulty.toLowerCase() === "super easy"
          ? "boolean"
          : "multiple"
      }`
    );

    const questionsJSON: TriviaAPIResponseStructure = await questions.json();

    const processedQuestions: PostProcessedQuestion[] =
      questionsJSON.results.map((question) => {
        return {
          ...question,
          shuffledAnswers: shuffleArray([
            question.correct_answer,
            ...question.incorrect_answers,
          ]),
        };
      });

    return processedQuestions;
  } catch (error) {
    console.log(error);
    return "Can't fetch questions:" + error;
  }
};

export const fetchAllCategories = async (): Promise<
  TriviaAPICategoryResponseStructure | string
> => {
  try {
    const categories = await fetch("https://opentdb.com/api_category.php");
    const categoriesJSON: TriviaAPICategoryResponseStructure =
      await categories.json();
    return categoriesJSON;
  } catch (error) {
    console.log(error);
    return "Can't fetch categories:" + error;
  }
};
