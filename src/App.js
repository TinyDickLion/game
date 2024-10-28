import "./index.css";
import { PeraWalletProvider } from "./components/PeraWalletProvider";
import Game from "./components/Game";

const App = () => (
  <PeraWalletProvider>
    <Game />
  </PeraWalletProvider>
);

export default App;
