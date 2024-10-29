import "./index.css";
import { PeraWalletProvider } from "./components/PeraWalletProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Game from "./components/Game";
import HomePage from "./components/HomePage";
import Leaderboard from "./components/Leaderboard";

const App = () => (
  <Router>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/crystal-swap"
        element={
          <PeraWalletProvider>
            <Game />
          </PeraWalletProvider>
        }
      />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  </Router>
);

export default App;
