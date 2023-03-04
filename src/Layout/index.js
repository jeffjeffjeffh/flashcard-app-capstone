import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./DeckList";
import CreateDeck from "./CreateDeck";
import { listDecks } from "../utils/api/index";

// BrowserRouter is already wrapping <App />

function Layout() {
  const [decks, setDecks] = useState([]);
  const [currentDeck, setCurrentDeck] = useState({});

  // An API hook for the list of decks
  useEffect(() => {
    const abortController = new AbortController();

    async function getDecks() {
      const retrievedDecks = await listDecks(abortController.signal);
      setDecks(retrievedDecks);
    }

    getDecks();

    return () => {
      console.log("cleanup", decks);
      setDecks([]);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DeckList decks={decks} />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
