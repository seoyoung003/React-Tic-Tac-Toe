import { useState } from "react";

import Player from "./components/player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];


function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {//함수 내용만 헬퍼함수에 빼버리고
    currentPlayer = 'O';
  }

  return currentPlayer;
}
  
//setPlayers는 저장버튼을 눌러서 이름이 변경될 때에만 호출되어야함. Player에서 playerName 값을 사용하지 않고 이렇게 하는 이유는
//playerName이 input태그에서 사용되서 타이핑 할 때 마다 재로딩되서 비효율적이고 playerName을 끌어오는 것이 복잡하기 때문이다.
function App() {
  const [players, setPlayers]= useState({  
    'X' : 'Player1',
    'O' : 'Player2'
  })
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X');
  
  const activePlayer = deriveActivePlayer(gameTurns);//drieveAcitvePlayer 호출의 결과를 저장함.


  
  let gameBoard = [...initialGameBoard.map(array => [...array])];//원본을 복사해야 원본의 값을 수정하지 않는다. 단 이차원 배열이므로 깊은 복사를 해야한다.

  for (const turn of gameTurns) {
      const {square, player} = turn;
      const {row, col} = square;
      gameBoard [row] [col] = player;
  }

  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol  = gameBoard[combination[0].row] [combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row] [combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row] [combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol=== secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {//firstSqureSymbol이 null값이면 false가 되므로 먼저 조건에서 확인한다
      winner = firstSquareSymbol;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner 
  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');//X면 O로 O면 X로 바꾸는 기능 구현
    setGameTurns(prevTurns => {
      // let currentPlayer = 'X';

      // if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
      //   currentPlayer = 'O';
      // }

      const currentPlayer =  deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer}, 
        ...prevTurns,
      ];

      return updatedTurns;
      //  player: 값으로 activePlayer 사용하면 안되는 이유는 setActivePlayer 실행시 
      //activePlayer를 전환하도록 React에 지시하지만, 즉시 activePlayer 값이 변경되지는 않다.
      // 따라서 바로 다음에 호출되는 setGameTurns에서는 여전히 이전의 activePlayer 값을 참조하게 된다.

      //맨 처음 배열 값에는 최근 정보가 들어간다. 1) 선택한 격자의 위치 2) 어떤 플레이어가 눌렀는지

    });//기존에 있던 수 기반으로 하는 것 이기때문에 기존 데이터를 건들면 안되므로 복사해서 사용한다.
  }

  function handleRestart() {
    setGameTurns([]);
  }

  // function handlePlayerNameChange(symbol, newName) {//이름이 변경된 player와 변경된 이름 즉 두가지 값을 매개변수로 받음.  내가 쓴 코드
  //   setPlayers((symbol) => symbol === 'X' ? {'X' : 'newName'} : {'O' : 'newName'});
  // }
  
  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {//...prevPlayers를 통해서 이전 내용을 펼치고 얕은 복사를 한다.
        ...prevPlayers,
        [symbol] : newName //JavaScript에서 객체의 특정 속성 값을 동적으로 바꾸거나 추가할 때는 대괄호([]) 표기법을 사용한다. 
      }
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player1" symbol="X" isActive={activePlayer === 'X'}/>
          <Player initialName="Player2" symbol="O" isActive={activePlayer === 'O'}/>
        </ol>
        {/* JavaScript에서 && 연산자는 **단축 평가(short-circuit evaluation)**를 수행하므로 왼쪽 피연산자가 falsy하면, 오른쪽 피연산자는 평가되지 않고, 전체 표현식은 falsy 값을 반환합니다. */}
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>} 
        <GameBoard 
          onSelectSquare={handleSelectSquare} 
          board={gameBoard}
          
          />
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
