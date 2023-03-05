import React, { useState, useEffect } from "react";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";

import NavBar from "./NavBar";
import Card from "./Card";
import { readDeck } from "../utils/api/index";

export default function DeckView({ setDeckChange }) {
  const [currentDeck, setCurrentDeck] = useState({});
  const { deckId } = useParams();
  const history = useHistory();
  const { url } = useRouteMatch();

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      const deck = await readDeck(deckId, abortController.signal);
      setCurrentDeck(deck);
    }

    loadDeck();

    return () => {
      setCurrentDeck({});
    };
  }, []);

  const editHandler = (event) => {
    history.push(`${url}/edit`);
  };

  if (currentDeck.id) {
    return (
      <div>
        <NavBar />
        <div>
          <h1>{currentDeck.name}</h1>
          <p>{currentDeck.description}</p>
          <button onClick={editHandler}>Edit</button>
          <button>Study</button>
          <button>+ Add Cards</button>
          <button>Delete</button>
        </div>
        <div>
          <ul>
            {currentDeck.cards.map((card, index) => {
              return (
                <Card card={card} key={index} setDeckChange={setDeckChange} />
              );
            })}
          </ul>
        </div>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}