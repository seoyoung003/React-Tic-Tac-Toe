import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard() {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleSelectSquare(rowIndex, coIndex) {
        // setGameBoard(<li key={colIndex}><button>{playerSymbol}</button></li>); 내가 생각한것
        setGameBoard((prevGameBoard) => {
            // prevGameBoard[rowIndex] [colIndex] = 'X'  추천하지 않는 방법
            // return prevGameBoard;
            const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];//두번 복사하는 이유는 prevGameBoard가 중첩 배열이라 완전히 복사하기 위해
            updatedBoard [rowIndex] [coIndex] = 'X';
            return updatedBoard;
        });
    }

    return (
        <ol id="game-board">
           {gameBoard.map((row, rowIndex) => 
           <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => (
                        <li key={colIndex}>
                            <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                        </li>
                    ))}
                </ol>
           </li>)}
        </ol>
    );
}