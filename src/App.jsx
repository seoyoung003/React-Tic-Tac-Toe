import { useState } from "react";

import Player from "./components/player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');//X면 O로 O면 X로 바꾸는 기능 구현
    setGameTurns(prevTurns => {
      let currentPlayer = 'X';

      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = 'O';
      }

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
  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player1" symbol="X" isActive={activePlayer === 'X'}/>
          <Player initialName="Player2" symbol="O" isActive={activePlayer === 'O'}/>
        </ol>
        <GameBoard 
          onSelectSquare={handleSelectSquare} 
          turns={gameTurns}
          
          />
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
