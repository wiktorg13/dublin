// Dependencies import
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Standard ES5 function
function sayHello() {
  console.log("Hello!");
}

// New fancy ES6 arrow function
const sayHelloArrow = () => console.log("Hello");

// Represent the Square
// The box the user will click on
class Square extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // We are printing a button with an event handler defined
    // event handler is handling onClick event
    return (
      <button
        className="square"
        onClick={() => {
          this.props.onClick();
        }}
      >
        {
          // check if this.props.value has a value !== null and print it
          // OR if this.props.value is null print <div>&nbsp;</div>
          this.props.value || <div>&nbsp;</div>
        }
      </button>
    );
  }
}

// Represents the game board
class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // I need to return Squares here
    // map: iterates over a given array
    // for (let index = 0; index < this.props.squares.length; index++) {
    //   let arrayElement = this.props.squares[index];
    //   console.log(`value ${arrayElement} index ${index}`);
    // }

    // this.props.squares.map((arrayElement, index) => {
    //   // String interpolation
    //   console.log(`value ${arrayElement} index ${index}`);
    // });

    return this.props.squares.map((arrayElement, index) => {
      // Key is an internal parameter needed to React in order to update
      // just what change in a list of element
      const arrowSquareFunction = () => this.props.handleSquareClick(index);

      return (
        <div key={index} className="square">
          <Square onClick={arrowSquareFunction} value={arrayElement} />
          {(index + 1) % 3 === 0 ? <br /> : <></>}
        </div>
      );
    });
  }
}

// Game component will manage the game logic
// game logic: when someone wins and the game board
class Game extends React.Component {
  // constructor
  constructor(props) {
    // Calling the React.Component constructor
    super(props);

    // Game dynamic properties
    this.state = {
      squares: Array(9).fill(null), // square: [null, null, ...]
      nextSymbol: "O",
      gameWon: false,
    };

    // Connect game component to the square component
    // If you need to use something from Game component in other components you need to bind
    this.handleSquareClick = this.handleSquareClick.bind(this);
  }

  checkWinning(squares) {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      // let a = winningCombinations[i][0];
      // let b = winningCombinations[i][1];
      // let c = winningCombinations[i][2];
      let [a, b, c] = winningCombinations[i];

      if (
        (squares[a] === "X" || squares[a] === "O") &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return winningCombinations[i];
      }
    }
  }

  // Function to handle user square click
  // Update the board with X or O
  // Determine if a user has win
  handleSquareClick(index) {
    // String interpolation
    console.log(`User click ${index}`);

    // I get the squares from my state
    const stateSquares = this.state.squares;

    // Check if the square has already a value
    if (stateSquares[index] !== null || this.state.gameWon) {
      return;
    }

    // Need to update the square clicked by the user
    stateSquares[index] = this.state.nextSymbol;

    let winningCombination = this.checkWinning(stateSquares);
    if (winningCombination) {
      // Expected output: Win [0, 1, 2]
      console.log(`Win ${winningCombination}`);
      // YOU CAN'T do this this.state.gameWon = true
      this.setState({ gameWon: true });
    }

    // Refresh application state
    // const nextSymbol = null;
    // if (this.state.nextSymbol === "X") {
    //   nextSymbol = "O";
    // } else {
    //   // if this.state.nextSymbol === "O"
    //   nextSymbol = "X";
    // }
    const nextSymbol = this.state.nextSymbol === "X" ? "O" : "X";

    this.setState({ squares: stateSquares, nextSymbol: nextSymbol });
  }

  // What the ReactDOM.render will call to obtain what to display
  // on my page
  render() {
    // The board component is provided with a property 'squares'
    return (
      <Board
        squares={this.state.squares}
        handleSquareClick={this.handleSquareClick}
      />
    );
    // var board = Board(this.state.squares);
    // return board.render();
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));