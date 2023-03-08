import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";

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
      <div className="navBar">
        <i className="material-icons">home</i>
        <p>
          <Link to="/">Home</Link> / Create Deck
        </p>
      </div>
      <h1>Create Deck</h1>
      <hr></hr>
      <div>
        <form onSubmit={submitHandler}>
          <div className="fields">
            <label htmlFor="name">
              <h5>Name</h5>
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
              <h5>Description</h5>
              <textarea
                id="description"
                name="description"
                placeholder="Brief description of the deck"
                onChange={changeHandler}
                value={formData.description}
              ></textarea>
            </label>
          </div>
          <div className="buttons">
            <button onClick={cancelHandler}>
              <p>Cancel</p>
            </button>
            <button type="submit">
              <p>Submit</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
