import React, { useState } from "react";
import NavBar from "./NavBar";

export default function CreateDeck({ setDecks }) {
  const initialFormData = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formData);
    setFormData(initialFormData);
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
