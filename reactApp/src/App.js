import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./Game";
import Result from "./Result";
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={Game} />
            <Route path="/result" exact component={Result} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
