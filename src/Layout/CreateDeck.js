import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { createDeck } from "../utils/api/index";
import NavBar from "./NavBar";

// This function find the first ID available in the API and returns it.
const getNewId = (decks) => {
  // Map the decks to an array of their IDs.
  const ids = decks.map((deck) => deck.id);

  // Find the highest ID in the array
  let highest = -Infinity;
  ids.forEach((id) => {
    if (id > highest) {
      highest = id;
    }
  });

  // Use an ID equal to the highest + 1
  const availableId = highest + 1;
  return availableId;
};

export default function CreateDeck({ decks, setDeckChange }) {
  const history = useHistory();
  const initialFormData = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const submitHandler = async (event) => {
    event.preventDefault();

    const newId = getNewId(decks);
    const deckData = {
      ...formData,
      id: newId,
    };

    const abortController = new AbortController();
    await createDeck(deckData, abortController.signal);

    setDeckChange(new Date());
    history.push("/");
  };

  const changeHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    history.push("/");
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
          <button onClick={cancelHandler}>Cancel</button>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
