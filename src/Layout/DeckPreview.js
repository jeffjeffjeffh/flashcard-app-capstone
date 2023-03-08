import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";

export default function DeckPreview({ deck, setDeckChange }) {
  const history = useHistory();

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

  const viewHandler = (event) => {
    history.push(`/decks/${deck.id}`);
  };

  const studyHandler = (event) => {
    history.push(`/decks/${deck.id}/study`);
  };

  return (
    <li>
      <h1>{deck.name}</h1>
      <p class="cardCount">{deck.cards.length} cards</p>
      <p>{deck.description}</p>
      <button onClick={viewHandler}>
        <p>View</p>
      </button>
      <button onClick={studyHandler}>
        <p>Study</p>
      </button>
      <button className="delete" onClick={deleteHandler}>
        <p>Delete</p>
      </button>
      <hr></hr>
    </li>
  );
}
