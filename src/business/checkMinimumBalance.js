import axios from "axios";
import { algoIndexerClient } from "../algorand/config";

const validateWalletAddress = (address) => address.length === 58;

export const checkMinimumBalance = async ({
  walletAddress,
  selectedToken,
  tokenDetails,
  setEligibility,
  setFeedbackMessage,
  setCurrentStep,
  setIsLoading,
}) => {
  if (!validateWalletAddress(walletAddress)) {
    setFeedbackMessage("Invalid wallet address format.");
    return;
  }
  setFeedbackMessage("");
  setIsLoading(true);

  try {
    const { assetId, minAlgoValue, minBwomLPValue, minTLPLPValue } =
      tokenDetails[selectedToken];
    const tokenPriceInAlgo =
      selectedToken === "tdld" ||
      selectedToken === "cat" ||
      selectedToken === "marcus"
        ? await fetchTokenPriceInAlgo(assetId)
        : null;

    let requiredBalance;
    if (
      selectedToken === "tdld" ||
      selectedToken === "cat" ||
      selectedToken === "marcus"
    ) {
      requiredBalance = Math.floor(minAlgoValue / tokenPriceInAlgo);
    } else if (selectedToken === "rear") {
      requiredBalance = minTLPLPValue;
    } else if (selectedToken === "bwom") {
      requiredBalance = minBwomLPValue;
    } else {
      throw new Error("Invalid token selected.");
    }

    const accountInfo = await algoIndexerClient
      .lookupAccountByID(walletAddress.toUpperCase())
      .do();
    const asset = accountInfo?.account?.assets?.find(
      (asset) => asset["asset-id"] === assetId
    );
    const heldAmount = asset ? asset.amount / 1000000 : 0;

    if (heldAmount >= requiredBalance) {
      setEligibility(true);
      setFeedbackMessage(`You qualify for the reward!`);
      setCurrentStep(2);
    } else {
      setEligibility(false);
      setFeedbackMessage(
        selectedToken === "tdld" ||
          selectedToken === "cat" ||
          selectedToken === "marcus"
          ? `You need to hold at least ${requiredBalance} ${selectedToken.toUpperCase()} to qualify for the reward.`
          : selectedToken === "rear"
          ? `You need to hold at least ${requiredBalance} TLP/ALGO LP to qualify for the reward.`
          : `You need to hold at least ${requiredBalance} ${selectedToken.toUpperCase()}/ALGO LP tokens to qualify for the reward.`
      );
    }
  } catch (error) {
    console.error("Error checking balance:", error);
    setFeedbackMessage("Error checking balance. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

const fetchTokenPriceInAlgo = async (assetId) => {
  const response = await axios.get(
    `https://free-api.vestige.fi/asset/${assetId}/price?currency=algo`
  );
  return response.data.price;
};
