import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={() => this.props.action()}>
                {this.props.val}
            </button>
        );
    }
}

class Board extends React.Component {

    renderSquare(i) {
        return <Square val={this.props.squares[i]} action={() => this.props.action(i)} />;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [

            ],
            board: Array(9).fill(null),
            xIsPlaying: true,
            currentStepNumber: 0
        }
    }

    handleClick(i) {
        const history = this.state.history;

        if (calculateWinner(this.state.board) || this.state.currentStepNumber < this.state.history.length || this.state.board[i]) {
            return;
        }
        const squares = this.state.board.slice();
        squares[i] = this.state.xIsPlaying ? 'X' : 'O';
        this.setState({ 
            board: squares, 
            xIsPlaying: !this.state.xIsPlaying, 
            history: history.concat([{board: squares}]), 
            currentStepNumber: this.state.currentStepNumber + 1
        });
    }

    goToMove(i){
        console.log('go to move #' + (i + 1));
        const history = this.state.history;
        this.setState({
            board: history[i].board,
            xIsPlaying: this.state.xIsPlaying,
            history: this.state.history,
            currentStepNumber: (i + 1),
        });
    }

    render() {
        const winner = calculateWinner(this.state.board);
        const history = this.state.history;

        let status = 'Next player: ' + (this.state.xIsPlaying ? 'X' : 'O');
        if (winner) {
            status = 'Winner: ' + winner;
        }

        let listItems = [];
        listItems = history.map((value, index) => {
            return(
                <li key={index}>
                    <button onClick={() => this.goToMove(index)}>Go to move #{index + 1}</button>
                </li>
            )
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={this.state.board}
                        action={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{listItems}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}