import { useState, useEffect } from "react";
import "./App.css";
import SingleCard from "./SingleCard";

const initcards = [
  { src: "/img/potion.png", matched: false },
  { src: "/img/helmet.png", matched: false },
  { src: "/img/ring.png", matched: false },
  { src: "/img/sword.png", matched: false },
];

function App() {
  const barajaTarjetas = () => {
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

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  useEffect(() => {
    choiceOne && !choiceTwo && console.log('choiceOne vale: ',choiceOne);
    choiceTwo && console.log('choiceTwo vale: ',choiceTwo);

    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        console.log("Hay match! 😉");
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
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    barajaTarjetas();
  }, []);

  return (
    <div className="App">
      <h1>Memorice</h1>
      <div className="container">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
