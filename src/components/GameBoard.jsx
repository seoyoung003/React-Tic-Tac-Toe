

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns }) {
    let gameBoard = initialGameBoard;

    for (const turn of turns) { //for 과 of문을 사용해서 turns 속의 turns 즉 중첩 구조를 만든다
        const { square, player } =  turn;
        const {row, col} = square;
        
        gameBoard [row] [col] = player;
    } 
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handleSelectSquare(rowIndex, coIndex) {
    //     // setGameBoard(<li key={colIndex}><button>{playerSymbol}</button></li>); 내가 생각한것
    //     setGameBoard((prevGameBoard) => {
    //         // prevGameBoard[rowIndex] [colIndex] = 'X'  추천하지 않는 방법
    //         // return prevGameBoard;
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];//두번 복사하는 이유는 prevGameBoard가 중첩 배열이라 완전히 복사하기 위해
    //         updatedBoard [rowIndex] [coIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });

    //     //handleSelectSquare 함수가 동작할 때 즉 버튼이 눌러졌을 때 작동해야하므로 이 함수 안에다 써야함
        
    //     onSelectSquare();
    // }

    return (
        <ol id="game-board">
           {gameBoard.map((row, rowIndex) => 
           <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => (
                        <li key={colIndex}>
                            <button onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                        </li>
                    ))}
                </ol>
           </li>)}
        </ol>
    );
}