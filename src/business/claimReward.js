// utils/claimReward.js
import axios from "axios";

export const claimReward = async ({
  API_BASE_URL,
  walletAddress,
  selectedToken,
  setFeedbackMessage,
  setEligibility,
  setIsLoading,
  setCurrentStep,
}) => {
  if (!walletAddress) {
    setFeedbackMessage("Please enter your wallet address to claim the reward.");
    return;
  }

  setFeedbackMessage("Processing your reward claim...");
  setEligibility(false);
  setIsLoading(true);

  try {
    const response = await axios.post(`${API_BASE_URL}/send-rewards`, {
      to: walletAddress,
      selectedToken,
    });

    setFeedbackMessage(response?.data?.message);
    setCurrentStep(response?.data?.success ? 3 : 1);
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      "Failed to claim the reward. Please try again.";
    setFeedbackMessage(errorMessage);
    console.error("Error claiming reward:", error);
  } finally {
    setIsLoading(false);
  }
};
