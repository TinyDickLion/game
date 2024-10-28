import "./index.css";
import { PeraWalletProvider } from "./components/PeraWalletProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Game from "./components/Game";
import HomePage from "./components/HomePage";

const App = () => (
  <Router>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route
        path="/Crystal-Swap"
        element={
          <PeraWalletProvider>
            <Game />
          </PeraWalletProvider>
        }
      />
    </Routes>
  </Router>
);

export default App;
