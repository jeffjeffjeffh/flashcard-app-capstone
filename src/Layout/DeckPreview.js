import React from "react";
import { useHistory } from "react-router-dom";

import { deleteDeck } from "../utils/api/index";

export default function DeckPreview({ deck, setDeckChange }) {
  const history = useHistory();

  // Should this be refactored somehow to not produce every event listener for every deck?
  // Maybe add a window event listener on deckList instead? Idk

  // TODO: More clean delete experience - refresh "/" after assurance that delete finished
  const deleteHandler = async (event) => {
    const proceed = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it."
    );

    if (proceed) {
      const abortController = new AbortController();
      await deleteDeck(deck.id, abortController.signal);
      setDeckChange(new Date());
    }
  };

  // WARNING: Using the value of "deck.id" here might result in the wrong deck being viewed? Watch for it
  const viewHandler = (event) => {
    history.push(`/decks/${deck.id}`);
  };

  return (
    <li>
      <h1>{deck.name}</h1>
      <p>{deck.cards.length} cards</p>
      <p>{deck.description}</p>
      <button onClick={viewHandler}>View</button>
      <button>Study</button>
      <button onClick={deleteHandler}>Delete</button>
    </li>
  );
}
