import React, { Component } from "react";

class Result extends Component {
  render() {
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
            <tr>
              <td className="date-score">22/01/2021</td>
              <td className="text-center v-middle game-error">3</td>
              <td className="text-center game-finish">
                <input type="checkbox" name />
              </td>
              <td className="text-center">
                <button
                  className="play-btn"
                  onClick={() => this.props.history.push("/")}
                >
                  <i className="fas fa-play-circle" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Result;
