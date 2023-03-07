import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { createDeck } from "../utils/api/index";
import NavBar from "./NavBar";

export default function CreateDeck({ decks, setDeckChange }) {
  const history = useHistory();
  const initialFormData = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const submitHandler = async (event) => {
    event.preventDefault();

    const deckData = {
      ...formData,
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
