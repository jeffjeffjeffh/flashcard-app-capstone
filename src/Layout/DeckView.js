import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom";
import Card from "./Card";
import { readDeck, deleteDeck } from "../utils/api/index";

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

  const deleteDeckHandler = async (event) => {
    const confirm = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it."
    );

    if (confirm) {
      const abortController = new AbortController();
      await deleteDeck(currentDeck.id, abortController.signal);
      setDeckChange(new Date());
      history.push("/");
    }
  };

  const studyHandler = (event) => {
    history.push(`/decks/${currentDeck.id}/study`);
  };

  const addCardHandler = (event) => {
    history.push(`/decks/${currentDeck.id}/cards/new`);
  };

  if (currentDeck.id) {
    return (
      <div>
        <div className="navBar">
          <i className="material-icons">home</i>
          <p>
            <Link className="navLink" to="/">
              Home
            </Link>{" "}
            / {currentDeck.name}
          </p>
        </div>
        <div>
          <h1>{currentDeck.name}</h1>
          <hr></hr>
          <p>{currentDeck.description}</p>
          <button onClick={editHandler}>
            <p>Edit</p>
          </button>
          <button onClick={studyHandler}>
            <p>Study</p>
          </button>
          <button onClick={addCardHandler}>
            <p>+ Add Cards</p>
          </button>
          <button className="delete" onClick={deleteDeckHandler}>
            <p>Delete</p>
          </button>
        </div>
        <hr></hr>
        <h1 style={{ paddingBottom: "1rem" }}>Cards</h1>
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
