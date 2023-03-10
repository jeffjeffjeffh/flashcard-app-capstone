import React from "react";
import { useHistory } from "react-router-dom";
import DeckPreview from "./DeckPreview";
import "./DeckList.css";

export default function DeckList({ decks, setDeckChange }) {
  const history = useHistory();

  if (decks.length === 0) {
    return <p>Loading...</p>;
  }

  const list = decks.map((deck, index) => {
    return (
      <DeckPreview deck={deck} key={index} setDeckChange={setDeckChange} />
    );
  });

  const HandleAddDeck = () => {
    history.push("/decks/new");
  };

  return (
    <div className="deckList">
      <button onClick={HandleAddDeck}>
        <p>+ Add Deck</p>
      </button>
      <hr></hr>
      <ul className="DeckList">{list}</ul>
    </div>
  );
}
