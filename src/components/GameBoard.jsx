


export default function GameBoard({ onSelectSquare, board }) {
    

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
           {board.map((row, rowIndex) => 
           <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => (
                        <li key={colIndex}>
                            <button onClick={() => onSelectSquare(rowIndex, colIndex)} 
                                disabled={playerSymbol !==null}> 
                                {playerSymbol}
                            </button>
                        </li>//playerSymbol이 X나 O면 해당 버튼은 이미 클릭된것이므로 비활성화시켜야함 따라서 조건은 playerSymbol이됨!!!
                        //null이 아니라면 X나 O이기 때문
                    ))}
                </ol>
           </li>)}
        </ol>
    );
}