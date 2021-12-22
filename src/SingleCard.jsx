import React from "react";
import './SingleCard.css'

function SingleCard({ card, handleChoice, flipped, disabled }) {

  const handleClick = () => {
    if(!disabled){
      handleChoice(card);
    }
    
  };

  return (
    <div className={`card${flipped ? " flipped" : ""}`} >
      <img className="figure" src={card.src} alt="figure" />
      <img className="cover" src="/img/cover.jpg" alt="cover" onClick={handleClick} />
    </div>
  );
}

export default SingleCard;
