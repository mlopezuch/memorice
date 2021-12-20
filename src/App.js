import { useState, useEffect } from "react";
import "./App.css";
import SingleCard from "./SingleCard";

const initcards = [
  { src: "/img/potion.png" },
  { src: "/img/helmet.png" },
  { src: "/img/ring.png" },
  { src: "/img/sword.png" },
];

function App() {
  const barajaTarjetas = () => {
    let newCards = [...initcards, ...initcards];
    let sortedCards = newCards.sort(() => Math.random() - 0.5);
    setCards(sortedCards);
  };

  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);



  const VerificaMatch = () => {

  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      VerificaMatch()
    }

  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    barajaTarjetas();
  }, []);

  return (
    <div className="App">
      <div className="container">
        {cards.map((card) => (
          <SingleCard
            key={Math.random()}
            card={card}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
