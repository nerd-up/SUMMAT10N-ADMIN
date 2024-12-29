// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NewsFeed from "./components/NewsFeed";
import PeaceTreaty from "./components/Peacetreaty";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/news-feed" component={NewsFeed} />
          <Route path="/peace-treaty" component={PeaceTreaty} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
