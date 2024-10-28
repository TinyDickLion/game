// COMPONENTS
import GameWrapper from "./GameWrapper";
import HeaderPanel from "./HeaderPanel";
import Board from "./Board";
import ButtonPanel from "./ButtonPanel";
import Score from "./Score";
import RestartGame from "./RestartGame";
import PeraWalletButton from "./PeraWalletButton";
import { PeraWalletContext } from "./PeraWalletContext";
import { optIn } from "../algorand/opt-in.js";
import { send } from "../algorand/transactionHelpers/send.js";
import { algodClient } from "../algorand/config.js";
import RestartGameStyles from "./css_modules/RestartGameStyles.module.css";
import axios from "axios";

// CUSTOM HOOKS
import useGame from "../hooks/useGame";
import useGameOver from "../hooks/useGameOver";

// BUILT IN HOOKS
import { useReducer, useContext, useState, useEffect } from "react";

// REDUCER FUNCTION & STATE
import { initialState, handleState } from "../business/jokerState";

const Game = () => {
  const [board, setBoard, score, setScore] = useGame();
  const [jokerState, dispatchJokerAction] = useReducer(
    handleState,
    JSON.parse(localStorage.getItem("jokerState")) || initialState
);
  const [gameOver, setGameOver] = useGameOver(board, jokerState);
  const [connectedAccountAddress, setConnectedAccountAddress] = useState(null);
  const [disable, setDisable] = useState(false);
  const peraWallet = useContext(PeraWalletContext);
  useEffect(() => {
    setConnectedAccountAddress(peraWallet?.connector?.accounts[0]);
  }, [peraWallet]);
  const winningScore = 100;
  const API_BASE_URL = "https://tdld-api.onrender.com/api/v1";

  const handleTX = async () => {
    if (connectedAccountAddress?.length > 0) {
      try {
        let optInTxn = await optIn(connectedAccountAddress, "2176744157");

        const signedTx = await peraWallet.signTransaction([optInTxn]);
        for (const signedTxnGroup of signedTx) {
          const { txId } = await algodClient
            .sendRawTransaction(signedTxnGroup)
            .do();

          console.log(`txns signed successfully! - txID: ${txId}`);
        }
        console.log(score)
        const response = await axios.post(`${API_BASE_URL}/send-rewards`, {
          to: connectedAccountAddress,
          score,
        });
        console.log(response);
      } catch (error) {
        console.error("Error handling game win:", error);
      }
    }
  };
  return (
    <>
      <GameWrapper gameState={gameOver}>
        {score < winningScore ? (
          <h1 style={{ color: "white" }}>Score 100 points to Win</h1>
        ) : (
          <h1 style={{ color: "white" }}>You Win!</h1>
        )}
        <br></br>
        <HeaderPanel>
          <Score score={score} />
          <ButtonPanel
            jokers={jokerState}
            dispatchJokerAction={dispatchJokerAction}
          />
          <PeraWalletButton />
        </HeaderPanel>
        {score < winningScore ? (
          <Board
            board={board}
            setBoard={setBoard}
            jokers={jokerState}
            dispatchJokerAction={dispatchJokerAction}
            gameOver={gameOver}
          />
        ) : (
          <>
            <div className={RestartGameStyles.restartGameWrapper}>
              {(
                <button
                  className={RestartGameStyles.restartGame}
                  disabled={disable}
                  onClick={() => {
                    if (score >= winningScore) {
                      setDisable(true);
                      handleTX();
                    }
                  }}
                >
                  Claim Reward
                </button>
              )}
            </div>
            <RestartGame
              resetBoard={setBoard}
              resetScore={setScore}
              resetJokers={dispatchJokerAction}
              resetGameOver={setGameOver}
            />
          </>
        )}
      </GameWrapper>
    </>
  );
};

export default Game;
