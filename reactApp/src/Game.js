import React, { Component } from "react";
const words = [
  {
    Food: ["PIZZA", "BURGER", "PATTY", "RICE", "PULSES"],
  },
  { Fruit: ["APPLE", "BANANA", "MANGO", "ORANGE", "GUAVA"] },
  { Country: ["USA", "INDIA", "UK", "PAKISTAN", "JAPAN"] },
];

let letterstext = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_category: {},
      selected_word: "",
      retries: 5,
      timer: 100,
      letters: [],
      gussedWord: [],
      gameState: "start",
    };
  }

  componentDidMount() {
    let selectedgamedata =
      localStorage.getItem("selectedgamedata") !== null
        ? JSON.parse(localStorage.getItem("selectedgamedata"))
        : "";
    console.log("selectedgamedata", selectedgamedata);
    if (selectedgamedata !== "") {
      this.setState({
        selected_category: selectedgamedata.selected_category,
        selected_word: selectedgamedata.selected_word,
        retries: selectedgamedata.retries,
        timer: selectedgamedata.timer,
        letters: selectedgamedata.letters,
        gussedWord: selectedgamedata.gussedWord,
        gameState: selectedgamedata.gameState,
      });
      localStorage.removeItem("selectedgamedata");
    } else {
      let category = words[Math.floor(Math.random() * words.length)];
      let cat_words = Object.values(category);
      let word = cat_words[0][Math.floor(Math.random() * cat_words[0].length)];
      this.setState({
        selected_category: category,
        selected_word: word,
        letters: word.split("").map((letter) => ({
          value: letter,
          guessed: false,
        })),
      });
    }
    setInterval(() => {
      if (this.state.timer > 0) {
        this.setState({ timer: this.state.timer - 1 });
      } else {
        this.setState({ gameState: "over" });
      }
    }, 1000);
  }

  shuffleWord = () => {
    let category = words[Math.floor(Math.random() * words.length)];
    let word = category[Math.floor(Math.random() * category.length)];
    this.setState({
      selected_category: category,
      selected_word: word,
      timer: 100,
      gameState: "start",
    });
  };

  saveGame = () => {
    let param = {
      selected_category: this.state.selected_category,
      selected_word: this.state.selected_word,
      retries: this.state.retries,
      timer: this.state.timer,
      letters: this.state.letters,
      gussedWord: this.state.gussedWord,
      gameState: this.state.gameState,
      date: new Date(),
    };
    let gamedata =
      localStorage.getItem("gamedata") !== null
        ? JSON.parse(localStorage.getItem("gamedata"))
        : [];
    gamedata.push(param);
    localStorage.setItem("gamedata", JSON.stringify(gamedata));
    this.props.history.push("/result");
  };
  onLetterCLick(letter, e) {
    e.preventDefault();
    const firstIndex =
      this.state.selected_word && this.state.selected_word.indexOf(letter);
    if (firstIndex !== -1) {
      const letters = this.state.letters.map((dat) => {
        if (dat.value === letter) {
          return Object.assign({}, dat, {
            guessed: true,
          });
        }

        return dat;
      });

      // Check if the game has been won
      const gameWon = letters.reduce((winState, currentObject) => {
        return winState && currentObject.guessed;
      }, true);

      this.setState((prevState, props) => {
        return {
          letters,
          gussedWord: [letter].concat(prevState.gussedWord),
          gameState: gameWon ? "won" : "start",
        };
      });
    } else {
      this.setState((prevState, props) => {
        // Update number of attempts left
        const guessesLeft = prevState.retries - 1;
        // Kill the game if needed
        if (guessesLeft === 0) {
          this.setState({ gameState: "over" });
        }

        this.setState({
          retries: guessesLeft,
          gussedWord: [letter].concat(prevState.gussedWord),
        });
      });
    }
    this.setState({ timer: 100 });
  }
  render() {
    return (
      <div className="main-area">
        <h2 className="text-center mb-2">The Hangman Game</h2>
        <div className="main-layout">
          <div className="game-display">
            <div className="timer">
              <i className="far fa-clock" />
              <span className="time"> {this.state.timer}</span>
            </div>
            <div className="hang-person">
              <div className="stand" />
              <div className="ground" />
              <div className="person">
                {this.state.retries < 5 && (
                  <>
                    <div className="head" />
                    <div className="body" />
                  </>
                )}
                {this.state.retries < 4 && <div className="leftarm" />}
                {this.state.retries < 3 && <div className="rightarm" />}
                {this.state.retries < 2 && <div className="leftfoot" />}
                {this.state.retries < 1 && <div className="rightfoot" />}
              </div>
            </div>
            {this.state.gameState === "start" && (
              <div className="new-word">
                <button
                  className="newword-btn"
                  onClick={() => this.shuffleWord()}
                >
                  <i className="fas fa-redo-alt" /> <span>New Word</span>
                </button>
              </div>
            )}
          </div>
          <div className="word-field">
            <p>
              <span>CATEGORY: {Object.keys(this.state.selected_category)}</span>
            </p>
            {this.state.letters.map((letter, i) => (
              <input
                type="text"
                minLength={1}
                maxLength={1}
                value={
                  this.state.gameState === "over" || letter.guessed
                    ? letter.value
                    : " "
                }
              />
            ))}
          </div>
          {this.state.gameState === "start" ? (
            <>
              <div className="button-wrap">
                {letterstext.map((letter) => (
                  <div
                    onClick={(e) =>
                      this.state.gussedWord.includes(letter)
                        ? null
                        : this.onLetterCLick(letter, e)
                    }
                    className={
                      this.state.gussedWord.includes(letter)
                        ? "crossLetter LetterBlock"
                        : "LetterBlock"
                    }
                  >
                    <span>{letter}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {this.state.gameState === "over" ? (
                <div className="game_lose_status">
                  <span>You Lose</span>
                </div>
              ) : (
                <div className="game_win_status">
                  <span>Congratulations! you have won a game</span>
                </div>
              )}
            </>
          )}
          <div className="text-center">
            <button className="save-btn" onClick={() => this.saveGame()}>
              Save Game
            </button>
            <button
              className="save-btn"
              onClick={() => this.props.history.push("/result")}
            >
              View Records
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
