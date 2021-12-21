import React from "react";
import './SingleCard.css'

function SingleCard({ card, handleChoice, flipped }) {

  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <div className={`card${flipped ? " flipped" : ""}`} >
      <img className="figure" src={card.src} alt="figure" />
      <img className="cover" src="/img/cover.png" alt="cover" onClick={handleClick} />
    </div>
  );
}

export default SingleCard;
