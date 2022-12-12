import {
  Configuration,
  CreateCompletionResponseChoicesInner,
  OpenAIApi,
} from "openai";
import { useEffect, useState } from "react";
import "./App.css";
import { scriptFetchingAndInserting } from "./services/fetch";

function App() {
  const [QRArray, setQRArray] = useState<
    CreateCompletionResponseChoicesInner[]
  >([]);
  useEffect(() => {
    // async function fetchingQuestionsAndAnswersFromOpenAI() {
    //   const request: string =
    //     "Give me a geography question in french in this template : 'Question /n Answer1 /n Answer2 /n Answer3 /n Answer4 /n CorrectAnswer'";

    //   const configuration = new Configuration({
    //     apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    //   });
    //   const openai = new OpenAIApi(configuration);
    //   await openai
    //     .createCompletion({
    //       model: "text-davinci-003",
    //       prompt: request,
    //       temperature: 0,
    //       max_tokens: 1000,
    //     })
    //     .then((data) => {
    //       let splittedData = data.data.choices[0].text?.split("/n") || [];
    //       let cleanQuestion = splittedData[0].slice(2);
    //       console.log(splittedData, cleanQuestion);
    //       setQRArray(data.data.choices);
    //     });
    // }
    // fetchingQuestionsAndAnswersFromOpenAI();
    scriptFetchingAndInserting();
  }, []);
  return <div className="App"></div>;
}

export default App;
