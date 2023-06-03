/**
 * Provides "View Model" and handler functions to the container
 */

initState({
  cmcApiKey: "",
  isHodling: false,
  isApprovalRequired: false,
});

const walletService = {
  isConnected: () => Ethers.send("eth_requestAccounts", [])[0],
};

/**
 * To implement function to do buy
 */
const buyToken = () => {};

/**
 * To implement function to do buy
 */
const sellToken = () => {};

const onBuyComplete = () => {
  State.update({ isHodling: true });
};

const onSellComplete = () => {
  State.update({ isHodling: false });
};

const setCmcApiKey = (event) => {
  State.update({ cmcApiKey: event.target.value });
};

const getStatusString = () => {
  const { isHodling, cmcApiKey } = state;
  if (!walletService.isConnected()) {
    return "Waiting wallet connection";
  }
  if (!cmcApiKey) {
    return "Waiting CMC API Key";
  }
  if (isHodling) {
    return "HOLDING";
  }
  return "Ready to buy shitcoins";
};

const { isHodling, cmcApiKey, isApprovalRequired } = state;
return (
  <Widget
    src="514901813a913f6ff8cf9618f561439debae1743abf0abca73394e8dea42d695/widget/FomoFinanceLandingContainer"
    props={{
      statusText: getStatusString(),
      isBuyVisible: !isHodling,
      isSellVisible: isHodling,
      isApprovalVisible: isApprovalRequired,
      handleApprove: () => undefined,
      isConnected: walletService.isConnected(),
      handleBuy: buyToken,
      handleSell: sellToken,
      cmcApiKey,
      handleChangeApiKey: setCmcApiKey,
    }}
  />
);
