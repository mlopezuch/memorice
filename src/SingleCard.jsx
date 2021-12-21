import React from "react";

function SingleCard({ card, handleChoice, flipped }) {

  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <div className={`card${flipped ? " flipped" : ""}`} onClick={handleClick}>
      <img className="figure" src={card.src} alt="figure" />
      <img className="cover" src="/img/cover.png" alt="cover" />
    </div>
  );
}

export default SingleCard;
