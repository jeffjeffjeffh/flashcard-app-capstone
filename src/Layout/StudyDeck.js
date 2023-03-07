import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { readDeck } from "../utils/api/index";

import NavBar from "./NavBar";
import StudyCard from "./StudyCard";

const loadDeck = async (deckId) => {
  const abortController = new AbortController();
  const deck = await readDeck(deckId, abortController.signal);
  return deck;
};

export default function StudyDeck() {
  const { deckId } = useParams();
  const [currentDeck, setCurrentDeck] = useState({});

  useEffect(() => {
    loadDeck(deckId).then(setCurrentDeck).catch(console.error);
  }, []);

  if (currentDeck.id) {
    return (
      <div>
        <NavBar />
        <h1>{currentDeck.name}</h1>
        <StudyCard deck={currentDeck} />
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}
