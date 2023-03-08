import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api/index";

export default function EditCard({ setDeckChange }) {
  // Setup
  const initialFormData = {
    front: "",
    back: "",
  };
  const [formData, setFormData] = useState({ ...initialFormData });
  const [card, setCard] = useState({});
  const [deck, setDeck] = useState({});
  const { deckId, cardId } = useParams();
  const history = useHistory();

  // API hooks for the current deck and card
  useEffect(() => {
    async function loadDeck() {
      const abortController = new AbortController();
      const deck = await readDeck(deckId, abortController.signal);
      setDeck(deck);
    }
    loadDeck();

    return () => {
      setDeck({});
    };
  }, []);

  useEffect(() => {
    async function loadCard() {
      const abortController = new AbortController();
      const card = await readCard(cardId, abortController.signal);
      setCard(card);
      setFormData({ front: card.front, back: card.back });
    }
    loadCard();

    return () => {
      setCard({});
    };
  }, []);

  // Handlers
  const changeHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const abortController = new AbortController();
    await updateCard(
      { ...formData, id: card.id, deckId: deck.id },
      abortController.signal
    );

    setDeckChange(new Date());
    history.push(`/decks/${deckId}`);
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    history.push(`/decks/${deckId}`);
  };

  // Return
  if (card.id === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="navBar">
        <p>
          <Link to="/">Home</Link> /{" "}
          <Link to={`decks/${deck.id}`}>{deck.name}</Link> / Edit Card {card.id}
        </p>
      </div>
      <h1>Edit Card</h1>
      <div>
        <form onSubmit={submitHandler}>
          <label htmlFor="front">
            Name
            <textarea
              id="front"
              name="front"
              placeholder="Front text"
              onChange={changeHandler}
              value={formData.front}
            ></textarea>
          </label>
          <label htmlFor="back">
            <textarea
              id="back"
              name="back"
              placeholder="Back text"
              onChange={changeHandler}
              value={formData.back}
            ></textarea>
          </label>
          <button onClick={cancelHandler}>Cancel</button>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
