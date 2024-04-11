import { useContext, useState } from "react";
import Answer from "./Answer";
import DataContext from "./dataContext";

function Question(prop) {
  const data = useContext(DataContext);
  let allAnswers = [];
  let shuffled = [];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [colors, setColors] = useState([]);
  const [score, setScore] = useState(0);

  for (let i = 0; i < data.length; i++) {
    allAnswers = data[i].incorrect_answers.map((x) => x);
    allAnswers.push(data[i].correct_answer);
    shuffled.push(allAnswers.sort());
  }

  function handleClick(index) {
    const nextColors = [];

    if (
      shuffled[currentQuestion][index] == data[currentQuestion].correct_answer
    ) {
      nextColors[index] = "green";
      setScore((current) => current + 1);
    } else {
      nextColors[index] = "red";
      for (let i = 0; i < 4; i++) {
        if (
          shuffled[currentQuestion][i] == data[currentQuestion].correct_answer
        )
          nextColors[i] = "green";
      }
    }

    setColors(nextColors);
    setTimeout(() => {
      setCurrentQuestion((current) => current + 1);
      setColors([]);
    }, 1500);
  }
  

  return (
    <div>
      {currentQuestion != data.length && (
        <div id="q">
          <h2>
            Question {currentQuestion + 1}/{data.length}
          </h2>
          <h2>{data[currentQuestion].question}</h2>
          <div id="answers">
            <Answer
              text={shuffled[currentQuestion][0]}
              function={() => handleClick(0)}
              color={colors[0]}
            />
            <Answer
              text={shuffled[currentQuestion][1]}
              function={() => handleClick(1)}
              color={colors[1]}
            />
            {shuffled[currentQuestion][2] && (
              <Answer
                text={shuffled[currentQuestion][2]}
                function={() => handleClick(2)}
                color={colors[2]}
              />
            )}
            {shuffled[currentQuestion][3] && (
              <Answer
                text={shuffled[currentQuestion][3]}
                function={() => handleClick(3)}
                color={colors[3]}
              />
            )}
          </div>
          <br></br>
          <h2>Score: {score}</h2>
        </div>
      )}
      {currentQuestion == data.length && (
        <div>
          <h1>
            Score: {score}/{data.length}
          </h1>
          <button onClick={prop.function}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default Question;
