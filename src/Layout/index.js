import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./DeckList";
import CreateDeck from "./CreateDeck";
import DeckView from "./DeckView";
import EditDeck from "./EditDeck";
import StudyDeck from "./StudyDeck";
import EditCard from "./EditCard";
import CreateCard from "./CreateCard";
import { listDecks } from "../utils/api/index";
import "./index.css";

async function loadDecks() {
  const abortController = new AbortController();
  const retrievedDecks = await listDecks(abortController.signal);
  return retrievedDecks;
}

export default function Layout() {
  const [decks, setDecks] = useState([]);
  const [deckChange, setDeckChange] = useState(new Date());

  useEffect(() => {
    loadDecks().then(setDecks);

    return () => {
      setDecks([]);
    };
  }, [deckChange]);

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DeckList decks={decks} setDeckChange={setDeckChange} />
          </Route>
          <Route path="/decks/new">
            <CreateDeck decks={decks} setDeckChange={setDeckChange} />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck setDeckChange={setDeckChange} />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CreateCard setDeckChange={setDeckChange} />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard setDeckChange={setDeckChange} />
          </Route>
          <Route path="/decks/:deckId">
            <DeckView setDeckChange={setDeckChange} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}
