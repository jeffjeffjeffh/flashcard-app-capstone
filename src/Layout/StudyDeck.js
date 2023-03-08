import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import StudyCard from "./StudyCard";

const loadDeck = async (deckId) => {
  const abortController = new AbortController();
  const deck = await readDeck(deckId, abortController.signal);
  return deck;
};

// TODO: ADD DECK TITLE TO SCREEN EVEN IF NOT ENOUGH CARDS

export default function StudyDeck() {
  const { deckId } = useParams();
  const [currentDeck, setCurrentDeck] = useState({});
  const history = useHistory();

  useEffect(() => {
    loadDeck(deckId).then(setCurrentDeck).catch(console.error);
  }, []);

  const addCardHandler = () => {
    history.push(`/decks/${deckId}/cards/new`);
  };

  if (currentDeck.id) {
    if (currentDeck.cards.length <= 2) {
      return (
        <div>
          <div className="navBar">
            <p>
              <Link to="/">Home</Link> /{" "}
              <Link to={`/decks/${deckId}`}>{currentDeck.name}</Link> / Study
            </p>
          </div>

          <h1>Study: {currentDeck.name}</h1>
          <h2>Not enough cards.</h2>
          <p>
            You need at least 3 cards to study. There are{" "}
            {currentDeck.cards.length} cards in this deck.
          </p>
          <button onClick={addCardHandler}>+ Add Cards</button>
        </div>
      );
    } else {
      return (
        <div>
          <div className="navBar">
            <p>
              <Link to="/">Home</Link> /{" "}
              <Link to={`/decks/${deckId}`}>{currentDeck.name}</Link> / Study
            </p>
          </div>
          <h1>Study: {currentDeck.name}</h1>
          <StudyCard deck={currentDeck} />
        </div>
      );
    }
  } else {
    return <p>Loading...</p>;
  }
}
