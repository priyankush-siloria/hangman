import React, { Component } from "react";

class Result extends Component {
  goBack = (item) => {
    localStorage.setItem("selectedgamedata", JSON.stringify(item));
    this.props.history.push("/");
  };
  render() {
    let dat =
      localStorage.getItem("gamedata") !== undefined
        ? JSON.parse(localStorage.getItem("gamedata"))
        : [];
    return (
      <div className="main-table">
        <h2 className="text-center mb-2">The Hangman Game</h2>
        <table className="score-table" border cellSpacing={0}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Errors</th>
              <th>Finished</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dat &&
              dat.map((item) => (
                <tr>
                  <td className="date-score">{item.date}</td>
                  <td className="text-center v-middle game-error">
                    {5 - item.retries}
                  </td>
                  <td className="text-center game-finish">
                    <input
                      type="checkbox"
                      name
                      checked={item.gameState !== "start"}
                    />
                  </td>

                  <td className="text-center">
                    {item.gameState === "start" && (
                      <button
                        className="play-btn"
                        onClick={() => this.goBack(item)}
                      >
                        <i className="fas fa-play-circle" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="text-center">
          <button
            className="save-btn"
            onClick={() => this.props.history.push("/")}
          >
            Play Game
          </button>
        </div>
      </div>
    );
  }
}

export default Result;
