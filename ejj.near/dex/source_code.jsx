const NETWORK_NEAR = "NEAR";
const NETWORK_ETH = "ETH";
const NETWORK_ZKSYNC = "ZKSYNC";
const NETWORK_AURORA = "AURORA";

const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals));
};

const getEVMAccountId = () => {
  if (ethers !== undefined) {
    return Ethers.send("eth_requestAccounts", [])[0] ?? "";
  }
  return "";
};

State.init({
  loadComplete: false,
  inputAssetModalHidden: true,
  outputAssetModalHidden: true,
  inputAssetAmount: 1,
  outputAssetAmount: 0,
  slippagetolerance: "0.5",
  reloadPools: false,
  estimate: {},
  loadRes: (value) => {
    if (value.estimate === "NaN") value.estimate = 0;
    State.update({
      estimate: value,
      outputAssetAmount: value === null ? "" : value.estimate,
    });
  },
});

const refReferralId = props.refReferralId ?? "ukraine";
const forceNetwork = props.forceNetwork;

//
//
//
// DEX DATA BELOW
//

// // SUBMIT TX EVENTS

//
//
//
// DEX DATA ABOVE
//

// LOAD STYLE

const css = fetch(
  "https://gist.githubusercontent.com/zavodil/5786d09502b0fbd042a920d804259130/raw/8dfc1154f6a9ebc5274463f60521385cc3728a19/swap.css"
).body;

if (!css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
      ${css}
    `,
  });
}

const Theme = state.theme;

// USER FUNCTIONS

const currentAccountId =
  getEVMAccountId() !== "" ? getEVMAccountId() : context.accountId;

const rearrangeAssets = () => {
  State.update({
    inputAssetTokenId: state.outputAssetTokenId,
    outputAssetTokenId: state.inputAssetTokenId,
    inputAsset: undefined,
    outputAsset: undefined,
    inputAssetAmount: state.outputAssetAmount,
    outputAssetAmount: state.inputAssetAmount,
    approvalNeeded: undefined,
  });
};

// REUSABLE UI ELEMEETS

const assetContainer = (
  isInputAsset,
  assetData,
  amountName,
  assetNameOnClick
) => {
  if (!assetData) return;
  const useSpacer = !!isInputAsset;

  const assetContainerClass = useSpacer
    ? "asset-container-top"
    : "asset-container-bottom";
  return (
    <>
      <div class={`${assetContainerClass} asset-container`}>
        <div class="swap-currency-input">
          <div class="swap-currency-input-block">
            <div class="swap-currency-input-top">
              <input
                class="input-asset-amount"
                nputmode="decimal"
                autocomplete="off"
                autocorrect="off"
                type="text"
                pattern="^[0-9]*[.,]?[0-9]*$"
                placeholder="0"
                minlength="1"
                maxlength="79"
                spellcheck="false"
                value={state[amountName]}
              />
              <button class="input-asset-token" onClick={assetNameOnClick}>
                <span class="input-asset-token-menu">
                  <div class="input-asset-token-name">
                    <div class="input-asset-token-icon">
                      <img
                        alt={`${assetData.metadata.name} logo`}
                        src={assetData.metadata.icon}
                        class="input-asset-token-icon-img"
                      />
                    </div>
                    <span class="input-asset-token-ticker">
                      {assetData.metadata.symbol}
                    </span>
                  </div>
                  <svg
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="input-asset-token-expand"
                  >
                    <path
                      d="M0.97168 1L6.20532 6L11.439 1"
                      stroke="#AEAEAE"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
            <div class="input-asset-details-container">
              <div class="input-asset-details-row">
                <div class="input-asset-details-price-container">
                  <div class="input-asset-details-price">
                    <div>${assetData.price}</div>
                  </div>
                </div>
                <div class="input-asset-details-balance-container">
                  <div class="input-asset-details-balance-text">
                    Balance: {assetData.balance_hr}
                  </div>
                  {isInputAsset &&
                    Number(state.inputAssetAmount) !==
                      Number(assetData.balance_hr_full) && (
                      <button
                        class="input-asset-details-balance-button"
                        onClick={() =>
                          State.update({
                            [amountName]: assetData.balance_hr_full ?? 0,
                          })
                        }
                      >
                        Max
                      </button>
                    )}
                </div>
              </div>
            </div>
            {false && <div class="swap-currency-input-bottom"></div>}
          </div>
        </div>
      </div>
      {useSpacer ? spacerContainer : <></>}
    </>
  );
};

const spacerContainer = (
  <div class="spacer-container">
    <div class="spacer-block" onClick={rearrangeAssets}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0D111C"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <polyline points="19 12 12 19 5 12"></polyline>
      </svg>
    </div>
  </div>
);

// SWAP METHODS

const getRefTokenObject = (tokenId, assetData) => {
  return {
    id: tokenId,
    decimals: assetData.metadata.decimals,
    symbol: assetData.metadata.symbol,
  };
};

const tokenInApprovaleNeededCheck = () => {
  if (state.approvalNeeded === undefined) {
    if (
      getEVMAccountId() &&
      state.erc20Abi !== undefined &&
      state.routerContract !== undefined &&
      [NETWORK_ETH, NETWORK_ZKSYNC, NETWORK_AURORA].includes(state.network)
    ) {
      const ifaceErc20 = new ethers.utils.Interface(state.erc20Abi);

      const encodedTokenAllowancesData = ifaceErc20.encodeFunctionData(
        "allowance",
        [getEVMAccountId(), state.routerContract]
      );

      return Ethers.provider()
        .call({
          to: state.inputAssetTokenId,
          data: encodedTokenAllowancesData,
        })
        .then((encodedTokenAllowanceHex) => {
          const tokenAllowance = ifaceErc20.decodeFunctionResult(
            "allowance",
            encodedTokenAllowanceHex
          );

          if (tokenAllowance) {
            State.update({
              approvalNeeded: new Big(tokenAllowance).toFixed() == "0",
            });
          }
        });
    } else {
      State.update({ approvalNeeded: false });
    }
  }
};

if (
  state.network === NETWORK_ZKSYNC ||
  state.network == NETWORK_ETH ||
  state.network == NETWORK_AURORA
) {
  tokenInApprovaleNeededCheck();
}

const canSwap =
  state.network &&
  Number(state.inputAsset.balance_hr_full) >= Number(state.inputAssetAmount) &&
  Number(state.inputAssetAmount ?? 0) > 0;

const onCallTxComple = (tx) => {
  console.log("transactionHash", tx);
  State.update({
    outputAsset: undefined,
  });
};

// OUTPUT

if (forceNetwork && state.network && forceNetwork !== state.network) {
  return (
    <Theme>
      <div class="swap-main-container pt-5">
        To proceed, kindly switch to {forceNetwork}.
        {!state.sender && (
          <div class="swap-button-container">
            <Web3Connect
              className="swap-button-enabled swap-button-text p-2"
              connectLabel="Connect with Web3"
            />
          </div>
        )}
      </div>
    </Theme>
  );
}

const externalAppUrl = "https://trisolaris.io";
return (
  <Widget
    src="wendersonpires.near/widget/NearSocialBridgeCore"
    props={{
      externalAppUrl,
      //   iframeHeight: "100vh",
      //   path,
      initialViewHeight: 1080,
      //   initialPayload,
      //   requestHandler,
    }}
  />
);
