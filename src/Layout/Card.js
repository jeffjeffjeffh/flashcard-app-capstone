import React from "react";
import { useHistory } from "react-router-dom";

import { deleteCard } from "../utils/api/index";

export default function Card({ card, setDeckChange }) {
  const history = useHistory();

  const editHandler = (event) => {
    history.push(`/decks/${card.deckId}/cards/${card.id}/edit`);
  };

  // TODO: Fix refresh after deleting
  const deleteHandler = async (event) => {
    const confirm = window.confirm(
      "Delete this card?\n\nYou will not be able to recover it."
    );

    if (confirm) {
      const abortController = new AbortController();
      await deleteCard(card.id, abortController.signal);
      setDeckChange(new Date());
    }
  };

  return (
    <li>
      <h5>Front:</h5>
      <p>{card.front}</p>
      <h5>Back:</h5>
      <p>{card.back}</p>
      <button onClick={editHandler}>
        <p>Edit</p>
      </button>
      <button className="delete" onClick={deleteHandler}>
        <p>Delete</p>
      </button>
      <hr></hr>
    </li>
  );
}
