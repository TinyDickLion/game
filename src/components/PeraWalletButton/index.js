import { useEffect, useState, useContext } from "react";
import { PeraWalletContext } from "../PeraWalletContext"; // Import the context
import ButtonPanelStyles from "../css_modules/ButtonPanelStyles.module.css";

export default function PeraWalletButton({ onConnect }) {
  const [accountAddress, setAccountAddress] = useState(null);
  const isConnectedToPeraWallet = !!accountAddress;

  const peraWallet = useContext(PeraWalletContext);

  useEffect(() => {
    try {
      peraWallet
        .reconnectSession()
        .then((accounts) => {
          peraWallet?.connector?.on("disconnect", handleDisconnectWalletClick);

          if (accounts.length) {
            const address = accounts[0];
            setAccountAddress(address);
            onConnect(address);
          }
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  }, []);

  function handleConnectWalletClick() {
    peraWallet
      .connect()
      .then((newAccounts) => {
        peraWallet?.connector?.on("disconnect", handleDisconnectWalletClick);

        const address = newAccounts[0];
        setAccountAddress(address);
        onConnect(address);
      })
      .catch((error) => {
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          console.log(error);
        }
      });
  }

  function handleDisconnectWalletClick() {
    peraWallet.disconnect();
    setAccountAddress(null);
    onConnect(null);
  }

  return (
    <button
      className={ButtonPanelStyles.buttonPanelWrapper}
      onClick={
        isConnectedToPeraWallet
          ? handleDisconnectWalletClick
          : handleConnectWalletClick
      }
    >
      <h2
        style={{
          color: "white",
          margin: "0.25em",
          display: "flex",
          textAlign: "center",
        }}
      >
        {isConnectedToPeraWallet
          ? "Disconnect"
          : "Connect Wallet To earn $TDLD"}
      </h2>
    </button>
  );
}
