import "./index.css";
import { PeraWalletProvider } from "./components/PeraWalletProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Game from "./components/Game";
import HomePage from "./components/HomePage";
import Leaderboard from "./components/Leaderboard";
import GameDescription from "./components/GameDescription";
import TriviaContainer from "./components/TriviaContainer";
import PeraWalletTutorial from "./components/PeraWalletTutorial";

const App = () => (
  <Router>
    <PeraWalletProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/match-3-mania" element={<Game />} />
        {/* <Route path="/trivia-takedown" element={<TriviaContainer />} /> */}
        <Route path="/rewards-game-guide" element={<GameDescription />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/onboard-pera-wallet" element={<PeraWalletTutorial />} />
      </Routes>
    </PeraWalletProvider>
  </Router>
);

export default App;
