import { useEffect, useState } from "react";
import "./App.css";
import { fetchingQuestionsAndAnswersFromOpenAI } from "./services/fetch";

function App() {
  const [QRArray, setQRArray] = useState([]);
  useEffect(() => {
    fetchingQuestionsAndAnswersFromOpenAI(setQRArray);
  }, []);
  return <div className="App"></div>;
}

export default App;
