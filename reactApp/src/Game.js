import React, { Component } from "react";
const words = [
  {
    Food: ["Pizza", "Burger", "Patty", "Rice", "Pulses"],
  },
  { Fruit: ["Apple", "Banana", "Mango", "Orange", "Pomegranate"] },
  { Country: ["USA", "India", "UK", "Pakistan", "Japan"] },
];
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_category: {},
      selected_word: "",
      retries: 0,
    };
  }

  componentDidMount() {
    let category = words[Math.floor(Math.random() * words.length)];
    let word = category[Math.floor(Math.random() * category.length)];
    this.setState({ selected_category: category, selected_word: word });
  }
  render() {
    return (
      <div className="main-area">
        <h2 className="text-center mb-2">The Hangman Game</h2>
        <div className="main-layout">
          <div className="game-display">
            <div className="timer">
              <i className="far fa-clock" />
              <span className="time"> 91</span>
            </div>
            <div className="hang-person">
              <div className="stand" />
              <div className="ground" />
              <div className="person">
                <div className="head" />
                <div className="body" />
              </div>
            </div>
            <div className="new-word">
              <button className="newword-btn">
                <i className="fas fa-redo-alt" /> <span>New Word</span>
              </button>
            </div>
          </div>
          <div className="word-field">
            <input type="text" minLength={1} maxLength={1} name />
            <input type="text" minLength={1} maxLength={1} name />
            <input type="text" minLength={1} maxLength={1} name />
            <input type="text" minLength={1} maxLength={1} name />
            <input type="text" minLength={1} maxLength={1} name />
          </div>
          <div className="text-center">
            <button className="save-btn">Save Game</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
