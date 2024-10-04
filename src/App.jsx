import Player from "./components/player";
import { useState } from "react";

function App() {
  const [name, setName] = useState();
  function handleOnclick() {
    

  }
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player 
            name="Player1" 
            symbol="X" 
            Onclick = {() => handleOnclick(<input type="text"></input>)}
          />
          <Player 
            name="Player2" 
            symbol="O"
            Onclick = {() => handleOnclick()}
          />
        </ol>
      </div>
    </main>
  );
}

export default App;
