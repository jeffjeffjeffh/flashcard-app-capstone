import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function StudyCard({ deck: { cards } }) {
  const [currentCard, setCurrentCard] = useState(cards[0]);
  const [flipped, setFlipped] = useState(false);
  const history = useHistory();
  const currentCardIndex = cards.findIndex(
    (card) => card.id === currentCard.id
  );

  const flipHandler = () => {
    setFlipped(!flipped);
  };

  const nextHandler = () => {
    if (currentCardIndex + 1 < cards.length) {
      setCurrentCard(cards[currentCardIndex + 1]);
      setFlipped(false);
    } else {
      const restart = window.confirm(
        "Restart cards? \n\nClick 'cancel' to return to the home page."
      );
      if (restart) {
        setCurrentCard(cards[0]);
        setFlipped(false);
      } else {
        history.push("/");
      }
    }
  };

  return (
    <div>
      <h1>
        Card {currentCardIndex + 1} of {cards.length}
      </h1>
      {flipped ? <p>{currentCard.back}</p> : <p>{currentCard.front}</p>}
      <button onClick={flipHandler}>Flip</button>
      {flipped ? <button onClick={nextHandler}>Next</button> : null}
    </div>
  );
}
