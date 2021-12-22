import { useState, useEffect } from "react";
import "./App.css";
import SingleCard from "./SingleCard";

const initcards = [
  { src: "/img/diablos.jpg", matched: false },
  { src: "/img/entenderias.jpg", matched: false },
  { src: "/img/moe.jpg", matched: false },
  { src: "/img/sabroso.jpg", matched: false },
  { src: "/img/tenemos.jpg", matched: false },
  { src: "/img/tudime.jpg", matched: false },
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
  const [disabled, setDisabled] = useState(false)

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  useEffect(() => {
    //choiceOne && !choiceTwo && console.log('choiceOne vale: ',choiceOne);
    //choiceTwo && console.log('choiceTwo vale: ',choiceTwo);

    if (choiceOne && choiceTwo) {
      setDisabled(true)
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
    const obj = { src: "/img/potion.png", matched: false, id: 0.5777705549368921 };
    const obj2 = { src: "/img/potion.png", matched: false, id: 0.5777705549368921 };
    console.log("Valor de obj: ", obj);
    console.log("Valor de obj2: ", obj2);
    console.log("Respuesta: ", obj.src === obj2.src);
  }, []);

  return (
    <div className="App">
      <h1>Memorice</h1>
      <div className="container">
        {cards.map((card, index) => {
          if (card === choiceOne) {
            console.log("Valor de card: ", card);
            console.log("Valor de choiceOne: ", choiceOne);
            console.log("Sus valores: ", card === choiceOne);
          }

          /* console.log(`${index+1}.- `);
          console.log("card vale: ",card);
          console.log("choiceOne vale: ",choiceOne);
          console.log("card === choiceOne: ",card === choiceOne);
          console.log("----------------------------------"); */

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
