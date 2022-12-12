import { Configuration, OpenAIApi } from "openai";

import { createClient } from "@supabase/supabase-js";

export async function scriptFetchingAndInserting() {
  const supabaseUrl = "https://cwdvvgqegcucriiaapuq.supabase.co";
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const languages = ["French", "Spanish", "German", "English", "Italian"];
  const categories = [
    "culture générale",
    "science",
    "geographie",
    "histoire",
    "film",
  ];

  for (let category of categories) {
    for (let i = 0; i < 10; i++) {
      const request: string =
        "Donne moi une question sur" +
        category +
        " avec ce format : 'Question / reponse1 / reponse2 / reponse3 / reponse4 / reponse correcte'";

      await openai
        .createCompletion({
          model: "text-davinci-003",
          prompt: request,
          temperature: 1,
          max_tokens: 1000,
        })
        .then((data) => {
          let splittedData = data.data.choices[0].text?.split("/") || [];
          return splittedData;
        })
        .then((splittedData) =>
          supabase.from("QuestionsAndAnswers").insert({
            category,
            question: splittedData[0].slice(2),
            answer1: splittedData[1],
            answer2: splittedData[2],
            answer3: splittedData[3],
            answer4: splittedData[4],
            correctAnswer: splittedData[5],
            language: "French",
          })
        )
        .catch((error) => console.log(error));
    }
  }
}
