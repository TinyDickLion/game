import RestartGameStyles from "./css_modules/RestartGameStyles.module.css"
import generateBoard from "../business/boardGenerator";


const RestartGame = ({ resetBoard, resetScore, resetJokers, resetGameOver }) => {

    const newGame = () => {
        resetBoard(generateBoard())
        resetScore(0)
        resetJokers({ type: "RESET" })
        resetGameOver(false);
        window.location.reload();
    }

    return (
        <div className={RestartGameStyles.restartGameWrapper}>
            <button className={RestartGameStyles.restartGame} onClick={newGame}>
                CLICK HERE FOR NEW GAME
            </button>
        </div>
    )

}

export default RestartGame