import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import NavBar from "./NavBar";

export default function CreateCard({ setDeckChange }) {
  // SETUP
  const history = useHistory();
  const initialFormData = {
    front: "",
    back: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [currentDeck, setCurrentDeck] = useState({});
  const { deckId } = useParams();

  // Load the current deck from the API
  useEffect(() => {
    async function loadDeck() {
      const abortController = new AbortController();
      const deck = await readDeck(deckId, abortController.signal);
      setCurrentDeck({ ...deck });
    }
    loadDeck();

    return () => {
      setCurrentDeck({});
    };
  }, []);

  // HANDLERS
  const submitHandler = async (event) => {
    event.preventDefault();

    const cardData = {
      ...formData,
    };

    const abortController = new AbortController();
    await createCard(currentDeck.id, cardData, abortController.signal);

    setDeckChange(new Date());
    history.push(`/decks/${currentDeck.id}`);
  };

  //
  const changeHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  //
  const cancelHandler = (event) => {
    event.preventDefault();
    history.push(`/decks/${currentDeck.id}`);
  };

  //
  if (!currentDeck.id) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <NavBar />
      <h1>React Router: Add Card</h1>
      <div>
        <form onSubmit={submitHandler}>
          <label htmlFor="front">
            Front
            <textarea
              id="front"
              name="front"
              placeholder="Front side of card"
              onChange={changeHandler}
              value={formData.front}
            ></textarea>
          </label>
          <label htmlFor="back">
            Back
            <textarea
              id="back"
              name="back"
              placeholder="Back side of card"
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
