import React from "react";
import { useHistory } from "react-router-dom";
import DeckPreview from "./DeckPreview";

export default function DeckList({ decks }) {
  const history = useHistory();

  if (decks.length === 0) {
    return <p>Loading...</p>;
  }

  const list = decks.map((deck, index) => {
    return <DeckPreview deck={deck} key={index} />;
  });

  const HandleAddDeck = () => {
    history.push("/decks/new");
  };

  return (
    <div>
      <button onClick={HandleAddDeck}>+ Add Deck</button>
      <ul>{list}</ul>
    </div>
  );
}
