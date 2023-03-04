import React from "react";

export default function DeckPreview({ deck }) {
  return (
    <li>
      <h1>{deck.name}</h1>
      <p>{deck.cards.length} cards</p>
      <p>{deck.description}</p>
      <button>View</button>
      <button>Study</button>
      <button>Delete</button>
    </li>
  );
}
