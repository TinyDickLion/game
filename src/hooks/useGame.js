// import { useEffect, useState, useRef } from "react"

// import generateBoard from "../business/boardGenerator";
// import monitorMatches from "../business/monitorMatches"
// import refillBoard from "../business/refillBoard"

// const useGame = () => {

//     const [board, setBoard] = useState(() => {
//         return JSON.parse(localStorage.getItem("board")) || generateBoard()
//     })

//     const [score, setScore] = useState(() => {
//         return JSON.parse(localStorage.getItem("score")) || 0
//     })

//     const previousBoard = useRef(board)

//     useEffect(() => {
//         const timer = setInterval(() => {

//                 localStorage.setItem("board", JSON.stringify(board))
//                 localStorage.setItem("score", JSON.stringify(score))

//             if (board.every(element => element.color !== "")) {

//                 const [currentBoard, scoreAccumulator] = monitorMatches(board, previousBoard.current)
//                 setBoard(currentBoard)
//                 setScore(previousScore => previousScore + scoreAccumulator)

//             }
//             setBoard(prev => refillBoard(prev))
//         }, 100);

//         return () => clearInterval(timer)
//     }, [board, score])

//     return [board, setBoard, score, setScore]
// }

// export default useGame

import { useEffect, useState, useRef } from "react";

import generateBoard from "../business/boardGenerator";
import monitorMatches from "../business/monitorMatches";
import refillBoard from "../business/refillBoard";

const useGame = () => {
  // Initialize board from localStorage or generate a new board
  const [board, setBoard] = useState(() => {
    return JSON.parse(generateBoard());
  });

  // Set initial score to 0 (no longer loading from localStorage)
  const [score, setScore] = useState(0);

  const previousBoard = useRef(board);

  useEffect(() => {
    const timer = setInterval(() => {
      // Save the current board to localStorage
      // localStorage.setItem("board", JSON.stringify(board));

      // Update the board and score if matches are found
      if (board.every((element) => element.color !== "")) {
        const [currentBoard, scoreAccumulator] = monitorMatches(
          board,
          previousBoard.current
        );
        setBoard(currentBoard);
        setScore((previousScore) => previousScore + scoreAccumulator);
      }

      // Refill the board if needed
      setBoard((prev) => refillBoard(prev));
    }, 100);

    return () => clearInterval(timer);
  }, [board]);

  return [board, setBoard, score, setScore];
};

export default useGame;
