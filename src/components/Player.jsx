import { useState } from "react";

export default function Player({initialName, symbol, isActive}) {
  const [playerName, setPlyerName] = useState(initialName);
  const [ isEditing, setIsEditing ] = useState(false);

  function handleEditingClick() {

    // setIsEditing(isEditing ? false : true); 이 코드를 더 간결하게 바꿀 수 있다
    // setIsEditing(!isEditing);  비동기 처리로 인해 이전 상태 값을 참조할 수 있음
    setIsEditing((editing) => !editing);//이 방법은 업데이트 함수를 사용하여 상태를 업데이트합니다. React는 이 함수를 호출할 때 현재 상태 값을 인수로 전달합니다.
    //따라서, 이 함수는 항상 최신 상태 값을 참조하므로, 여러 개의 상태 업데이트가 동시에 발생하더라도 항상 정확한 값을 사용할 수 있습니다.

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
