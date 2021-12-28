import { useState, useEffect } from "react";
import "./App.css";
import SingleCard from "./SingleCard";

const initcards = [
  { src: "./img/diablos.jpg", matched: false },
  { src: "./img/entenderias.jpg", matched: false },
  { src: "./img/moe.jpg", matched: false },
  { src: "./img/sabroso.jpg", matched: false },
  { src: "./img/tenemos.jpg", matched: false },
  { src: "./img/tudime.jpg", matched: false },
];

function App() {
  const barajaTarjetas = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setIntentos(0);
    setMatches(0);

    let newCards = [...initcards, ...initcards];
    let sortedCards = newCards.sort(() => Math.random() - 0.5);
    let finalcards = sortedCards.map((card) => {
      return { ...card, id: Math.random() };
    });
    setCards(finalcards);
  };

  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [intentos, setIntentos] = useState(0);
  const [matches, setMatches] = useState(0);
  const [mejorMarca, setmejorMarca] = useState(
    window.localStorage.getItem("mejorMarca")
  );

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setIntentos((prev) => prev + 1);
  };

  useEffect(() => {
    //choiceOne && !choiceTwo && console.log("choiceOne vale: ", choiceOne);
    //choiceTwo && choiceOne && console.log("choiceTwo vale: ", choiceTwo);

    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.id !== choiceTwo.id) {
        if (choiceOne.src === choiceTwo.src) {
          console.log("Hay match! 😉");
          setMatches((prev) => prev + 1);
          setCards((prev) => {
            return prev.map((card) => {
              if (card.src === choiceOne.src) {
                return { ...card, matched: true };
              } else {
                return card;
              }
            });
          });
          resetTurn();
        } else {
          setTimeout(() => {
            resetTurn();
          }, 500);
        }
      } else {
        setChoiceTwo(null);
        setDisabled(false);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    barajaTarjetas();
  }, []);

  useEffect(() => {
    if (matches === 6) {
      console.log("Se terminó la partida");
      if ((mejorMarca && intentos < mejorMarca) || !mejorMarca) {
        window.localStorage.setItem("mejorMarca", intentos);
        setmejorMarca(intentos);
      }
    }
  }, [matches, intentos, mejorMarca]);

  return (
    <div className="App">
      <h2>Juego de memoria</h2>
      <div className="panel">
        <button onClick={barajaTarjetas}>Nuevo juego</button>
        <p>
          Intentos: {intentos} / Mejor marca: {mejorMarca}
        </p>
      </div>

      <div className="container">
        {cards.map((card) => {
          return (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;