import axios from "axios";
import { useState } from "react";
import "./App.css";
import Question from "./components/Question";
import DataContext from "./components/dataContext";

/*
uspia sam da mi rade lipo sve funkcionalnosti al mi nije islo kad sam pokusa rasporedit kod na vise komponenti(da nije 
sve u appu i questionu i da answer komponenta zapravo sluzi necemu)
problem je nasta kad sam mora upravljat varijablama u parent komponenti ili drugim komponentama na istoj razini (kad 
se pritisne netocan odgovor da zazeleni tocan i ponovno pokretanje kviza na kraju) 
ovo mi je bilo najsmislenije rjesenje al sad imam dvi komponente sa 100 linija i gubi se cili smisao reacta
nemam neko konkretno pitanje osim kako da kod 'izgleda lipse'
*/

function App() {
  const [start, setStart] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [data, setData] = useState([
    {
      category: "",
      correct_answer: "",
      difficulty: "",
      incorrect_answers: "",
      question: "",
      type: "",
    },
  ]);

  function fetchData() {
    axios
      .get(
        "https://opentdb.com/api.php?amount=" +
          numberOfQuestions +
          (category ? "&" + "category=" + category : "") +
          (difficulty ? "&" + "difficulty=" + difficulty : "")
      )
      .then((res) => {
        setData(res.data.results);
        console.log(res.data.results);
        setStart(1);
      })
      .catch((err) => alert(err));
  }

  return (
    <DataContext.Provider value={data}>
      <div className="App">
        {!start && (
          <div>
            <div className="option">
              <p>Number of questions: </p>
              <input
                type="number"
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(e.target.value)}
              ></input>
            </div>

            <div className="option">
              <p>Category:</p>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Any</option>
                <option value="9">General Knowledge</option>
                <option value="10">Books</option>
                <option value="11">Film</option>
                <option value="12">Music</option>
                <option value="13">Musicals & Theatres</option>
                <option value="14">Television</option>
                <option value="15">Video Games</option>
                <option value="16">Board Games</option>
                <option value="17">Science & Nature</option>
                <option value="18">Computers</option>
                <option value="19">Mathematics</option>
                <option value="20">Mythology</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
                <option value="26">Celebrities</option>
                <option value="27">Animals</option>
                <option value="28">Vehicles</option>
                <option value="29">Comics</option>
                <option value="30">Gadgets</option>
                <option value="31">Japanese Anime & Manga</option>
                <option value="32">Cartoon & Animations</option>
              </select>
            </div>
            <div className="option">
              <p>Difficulty:</p>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="">Any</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <button onClick={fetchData}>Start</button>
          </div>
        )}
        {start && <Question function={() => setStart(0)} />}
      </div>
    </DataContext.Provider>
  );
}
export default App;
