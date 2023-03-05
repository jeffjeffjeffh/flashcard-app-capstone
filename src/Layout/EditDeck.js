import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";

import NavBar from "./NavBar";

import { readDeck, updateDeck } from "../utils/api/index";

export default function EditDeck({ setDeckChange }) {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { deckId } = useParams();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      const deck = await readDeck(deckId, abortController.signal);
      setFormData({
        name: deck.name,
        description: deck.description,
      });
    }

    loadDeck();
  }, []);

  // Use the provided API util to update the list of decks with the new deck
  const submitHandler = async (event) => {
    event.preventDefault();
    const deckData = {
      ...formData,
      id: deckId,
    };

    const abortController = new AbortController();
    await updateDeck(deckData, abortController.signal);

    setDeckChange(new Date());
    history.push(`decks/${deckId}`);
  };

  const changeHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  return (
    <div>
      <NavBar />
      <div>
        <form onSubmit={submitHandler}>
          <label htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Deck Name"
              onChange={changeHandler}
              value={formData.name}
            ></input>
          </label>
          <label htmlFor="description">
            Description
            <textarea
              id="description"
              name="description"
              placeholder="Brief description of the deck"
              onChange={changeHandler}
              value={formData.description}
            ></textarea>
          </label>
          <button>Cancel</button>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
