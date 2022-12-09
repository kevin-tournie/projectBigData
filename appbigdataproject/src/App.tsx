import { useEffect, useState } from "react";
import "./App.css";
import { fetchingQuestionsAndAnswersFromOpenAI } from "./services/fetch";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetchingQuestionsAndAnswersFromOpenAI();
  }, []);
  return <div className="App"></div>;
}

export default App;
