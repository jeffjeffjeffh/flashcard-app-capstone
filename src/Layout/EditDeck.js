import React, { useState, useEffect } from "react";
import { Link, useHistory, useRouteMatch, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";

export default function EditDeck({ setDeckChange }) {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { deckId } = useParams();

  const [formData, setFormData] = useState({});
  const [deck, setDeck] = useState({});

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      const deck = await readDeck(deckId, abortController.signal);
      setDeck(deck);
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
    };

    const abortController = new AbortController();
    await updateDeck(deckData, abortController.signal);

    setDeckChange(new Date());
    history.push(`decks/${deckId}`);
  };

  const changeHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    history.push(`decks/${deckId}`);
  };

  return (
    <div>
      <div className="navBar">
        <i className="material-icons">home</i>
        <p>
          <Link to="/">Home</Link> /{" "}
          <Link to={`decks/${deck.id}`}>{deck.name}</Link> / Edit
        </p>
      </div>
      <h1>Edit Deck</h1>
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
            <button className="submit" type="submit">
              <p>Submit</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
