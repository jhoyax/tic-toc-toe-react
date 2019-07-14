import React from 'react';
import Board from './Board';
import * as Utils from '../helpers/Utils';

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
        location: null,
			}],
			xIsNext: true,
			stepNumber: 0,
      sort: "asc",
		};
	}
	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if(Utils.calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history: history.concat([{
				squares: squares,
        location: i,
			}]),
			xIsNext: !this.state.xIsNext,
			stepNumber: history.length,
		});
	}
  handleClickSort(i) {
    this.setState({
      sort: this.state.sort === "desc" ? "asc" : "desc",
    });
  }
	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step %2) === 0,
		});
	}
  getMoveLocation(step) {
    if(step.location != null) {
      let col, row;

      col = (step.location % 3) + 1;
      row = Utils.findRow(step.location);

      return "(" + col + ", " + row + ")"
    }
    return "";
  }
  setActiveMove(step) {
    if(step === this.state.stepNumber)
      return "active";
    return "";
  }
  render() {
  	const history = this.state.history;
  	const current = history[this.state.stepNumber];
  	const winner = Utils.calculateWinner(current.squares);

    let historySort = history.slice();
    if(this.state.sort === "desc")
      historySort = historySort.reverse();

  	const moves = historySort.map((step, move) => {
      let moveSort = move;
      if(this.state.sort === "desc")
        moveSort = Math.abs((historySort.length - 1) - move);

  		const desc = moveSort ? 
  			'Go to move #' + moveSort + " - " + this.getMoveLocation(step):
  			'Go to game start';
  		return (
  			<li 
          key={moveSort} 
          className={this.setActiveMove(moveSort)} 
        >
  				<button onClick={() => this.jumpTo(moveSort)}>{desc}</button>
  			</li>
  		);
  	});

  	let status;
  	if(winner) {
  		status = 'Winner: ' + winner.player;
  	} else if(this.state.stepNumber === 9 && !winner) {
      status = 'Result: Draw';
    } else {
  		status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  	}
    return (
      <div className="game">
        <div className="game-board">
          <Board 
          	squares={current.squares}
          	onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div className="width-60">
            Sort:
            <a title={this.state.sort === "desc" ? "Ascending" : "Descending"}
              className={"sort sort-" + this.state.sort}
              onClick={(i) => this.handleClickSort(i)}
            >sort</a>
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;