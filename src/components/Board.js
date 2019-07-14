import React from 'react';
import Square from './Square';
import * as Utils from '../helpers/Utils';

class Board extends React.Component {

  renderSquare(i) {
    const current = this.props.squares[i];
    const winner = Utils.calculateWinner(this.props.squares);
    
    let isWin = "";
    if(winner)
      isWin = winner.line.indexOf(i) > -1 ? "win" : "";

    return (
      <Square 
        value={current} 
        onClick={() => this.props.onClick(i)}
        key={i}
        isWin={isWin}
        />
    );
  }

  render() {
    let items = [];
    for (let i = 0; i < 3; i++) {
      let item = [];
      for (let j = 0; j < 3; j++) {
        let index = (i * 3) + j;
        item.push(this.renderSquare(index));
      }
      items.push(<div className="board-row" key={i} >{item}</div>);
    }
    return (
      <div>
        {items}
      </div>
    );
  }
}

export default Board;