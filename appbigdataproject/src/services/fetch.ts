import { Configuration, OpenAIApi } from "openai";

export async function fetchingQuestionsAndAnswersFromOpenAI(setQRarray: any) {
  const request: string =
    "Je veux un ensemble de 10 questions aléatoires avec 4 choix possibles.";

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  await openai
    .createCompletion({
      model: "text-davinci-003",
      prompt: request,
      temperature: 0,
      max_tokens: 1000,
    })
    .then((response) => {
      setQRarray(response.data.choices);
    });
}
