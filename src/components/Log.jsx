
export default function Log({ turns }) {
    return(
        <ol id="log">
            {turns.map(turn => <li key={`${turn.square.row}${turn.square.col}`}>{turn.player} selected {turn.square.row}, {turn.square.col}</li>)} 
        </ol>//동적 목록을 반활할 때는 반드시 key가 필요하다. key는 고유한 내용이어야하므로 row와 col이 된다. 콤마는 코드상 의미없고 화면상으로 보이라고 쓴 것.
    );//백틱은 자바스크립트 엔진에게 해당 문자열이 템플릿 리터럴임을 명확하게 알려준다.
}