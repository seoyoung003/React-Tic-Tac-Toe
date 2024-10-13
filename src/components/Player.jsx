import { useState } from "react";

export default function Player({initialName, symbol, isActive}) {
  const [playerName, setPlyerName] = useState(initialName);
  const [ isEditing, setIsEditing ] = useState(false);

  function handleEditingClick() {

    // setIsEditing(isEditing ? false : true); 이 코드를 더 간결하게 바꿀 수 있다
    // setIsEditing(!isEditing);
    setIsEditing((editing) => !editing);

  }

  function handleChange(event) {
   
    setPlyerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  // let btnCaption = 'Edit';

  if(isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange}/>
    );
    
    // btnCaption = 'Save';
  }
    return(
        <li className={isActive ? 'active' : undefined}>
        <span className="player">
          {editablePlayerName}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={ handleEditingClick }>{isEditing ? 'Save' : 'Edit'}</button>
      </li>
     
    );
}
