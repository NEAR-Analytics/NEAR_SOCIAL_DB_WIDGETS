State.init({
  initalized: false,
  InputAssetModalHidden: true,
  OutputAssetModalHidden: true,
  inputAssetTokenId: "NEAR",
  outputAssetTokenId:
    "dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near",
  inputAssetAmount: 1,
  outputAssetAmount: 1,
  network: "NEAR",
  assets: [
    "NEAR",
    "token.v2.ref-finance.near",
    "dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near",
    "token.burrow.near",
  ],
  slippagetolerance: "0.5",
  reloadPools: false,
  estimate: {},
  loadRes: (value) => {
    console.log(value);
    State.update({
      estimate: value,
      outputAssetAmount: value === null ? "" : value.estimate,
    });
  },
});

const refReferralId = props.refReferralId ?? "zavodil.near";

if (!state.initalized && ethers !== undefined) {
  State.update({
    assets: [
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
      "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
      "0xf7B098298f7C69Fc14610bf71d5e02c60792894C",
    ],
    inputAssetTokenId: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    outputAssetTokenId: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    network: "ETH",
  });
}

State.update({ initalized: true });

const css = `
* {
    font-family: 'Inter custom',sans-serif;
}
.swap-root{
    min-height: 100%;
}
.swap-main-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    /*padding: 72px 0px 5rem;*/
    -webkit-box-align: center;
    align-items: center;
}
.swap-main-column{
    padding: 68px 8px 0px;
    max-width: 480px;
    width: 100%;
}
.swap-page{
    position: relative;
    background: rgb(255, 255, 255);
    border-radius: 16px;
    border: 1px solid rgb(210, 217, 238);
    padding: 8px;
    z-index: 0;
    transition: transform 250ms ease 0s;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
}
.asset-container-bottom {
    border-bottom: 1px solid rgb(255, 255, 255);
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
}
.asset-container-top {
    border-radius: 12px;
}
.asset-container{
    position: relative;
    background-color: rgb(245, 246, 252);    
    padding: 16px;
    color: rgb(119, 128, 160);
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
}
.asset-container::before {
    box-sizing: border-box;
    background-size: 100%;
    border-radius: inherit;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    pointer-events: none;
    content: "";
    border: 1px solid rgb(245, 246, 252);
    color: rgb(119, 128, 160);
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
}
.swap-currency-input {
    display: flex;
    flex-flow: column nowrap;
    position: relative;
    border-radius: 20px;
    z-index: 1;
    width: initial;
    transition: height 1s ease 0s;
    will-change: height;
}
.swap-currency-input-block {
    min-height: 44px;
    border-radius: 20px;
    width: initial;
}
.swap-currency-input-top{
    display: flex;
    flex-flow: row nowrap;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
}
.swap-currency-input-bottom{
    -webkit-box-pack: end;
    justify-content: flex-end;
    min-height: 20px;
    padding: 8px 0px 0px;
    display: flex;
    flex-flow: row nowrap;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(119, 128, 160);
    font-size: 0.75rem;
    line-height: 1rem;
}
.input-asset-amount {
    filter: none;
    opacity: 1;
    transition: opacity 0.2s ease-in-out 0s;
    text-align: left;
    font-size: 36px;
    line-height: 44px;
    font-variant: small-caps;
    color: rgb(13, 17, 28);
    width: 0px;
    position: relative;
    font-weight: 400;
    outline: none;
    border: none;
    flex: 1 1 auto;
    background-color: transparent;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0px;
    appearance: textfield;
}

.input-asset-token{
    -webkit-box-align: center;
    align-items: center;
    background-color: rgb(232, 236, 251);
    opacity: 1;
    box-shadow: none;
    color: rgb(13, 17, 28);
    cursor: pointer;
    height: unset;
    border-radius: 16px;
    outline: none;
    user-select: none;
    border: none;
    font-size: 24px;
    font-weight: 400;
    width: initial;
    padding: 4px 8px 4px 4px;
    gap: 8px;
    -webkit-box-pack: justify;
    justify-content: space-between;
    margin-left: 12px;
    visibility: visible;
    transform: perspective(1px) translateZ(0px);
    text-decoration: none;
    display: flex;
    position: relative;
    z-index: 1;
    will-change: transform;
    transition: transform 450ms ease 0s;
    flex-wrap: nowrap;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    appearance: none;
}
.input-asset-token::before{
    background-size: 100%;
    border-radius: inherit;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    content: "";
}
.input-asset-token-menu{
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    width: 100%;
    user-select: none;
}
.input-asset-token-name{
    width: fit-content;
    display: flex;
    padding: 0px;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: start;
    justify-content: flex-start;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
}
.input-asset-token-icon {
    margin-right: 2px;
    position: relative;
    display: flex;
}
.input-asset-token-icon-img{
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: radial-gradient(white 60%, rgba(255, 255, 255, 0) calc(70% + 1px));
    box-shadow: white 0px 0px 1px;
}
.input-asset-token-ticker {
    margin: 0px 0.25rem;
    font-size: 20px;
    font-weight: 600;
}
.input-asset-token-expand {
    margin: 0px 0.25rem 0px 8px;
    height: 35%;
}
.input-asset-details-container{
    -webkit-box-pack: end;
    justify-content: flex-end;
    min-height: 20px;
    padding: 8px 0px 0px;
    display: flex;
    flex-flow: row nowrap;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(119, 128, 160);
    font-size: 0.75rem;
    line-height: 1rem;
}
.input-asset-details-row{
   -webkit-box-pack: justify;
    justify-content: space-between;
    width: 100%;
    display: flex;
    padding: 0px;
    -webkit-box-align: center;
    align-items: center;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
}
.input-asset-details-price-container{
    filter: none;
    opacity: 1;
    transition: opacity 0.2s ease-in-out 0s;
}
.input-asset-details-price{
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-weight: 400;
    font-size: 14px;
}
.input-asset-details-balance-container{
    height: 17px;
    width: fit-content;
    display: flex;
    padding: 0px;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: start;
    justify-content: flex-start;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
}
.input-asset-details-balance-text{
    display: inline;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-weight: 400;
    font-size: 14px;
}
.input-asset-details-balance-button{
    background-color: transparent;
    border: none;
    color: rgb(251, 17, 142);
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    opacity: 1;
    padding: 4px 6px;
    pointer-events: initial;
    user-select: none;
}
.spacer-container{
    border-radius: 12px;
    height: 40px;
    width: 40px;
    position: relative;
    margin: -18px auto;
    background-color: rgb(232, 236, 251);
    border: 4px solid rgb(255, 255, 255);
    z-index: 2;
}
.spacer-block{
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
}
.bottom-container{
    display: grid;
    grid-auto-rows: auto;
    /*row-gap: 12px;*/
}
.swap-price-container{
    padding: 0px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    background-color: rgb(245, 246, 252);    
    color: rgb(119, 128, 160);
    font-size: 14px;
    line-height: 20px;
    font-weight: 500; 
}
.swap-price-container::before{
    box-sizing: border-box;
    background-size: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    pointer-events: none;
    content: "";
    border-radius: inherit;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(245, 246, 252);
    border-image: initial;
}
.swap-price-block{
    margin-top: 0px !important;
    width: 100%;
    -webkit-box-pack: center;
    justify-content: center;
    border-radius: inherit;
    padding: 8px 12px;
    min-height: 32px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    min-height: 52px;
}
.swap-price-grid{
    width: 100%;
    /*margin-bottom: -8px;*/
    display: grid;
    grid-auto-rows: auto;
    row-gap: 8px;
}
.swap-price-row{
    padding: 0px;
    -webkit-box-align: center;
    align-items: center;
    cursor: pointer;
    -webkit-box-pack: justify;
    justify-content: space-between;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
}
.swap-price-details-container{
    position: relative;
    width: fit-content;
    display: flex;
    padding: 0px;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: start;
    justify-content: flex-start;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
}
.swap-price-details-icon{
    display: inline-block;
    height: inherit;
}
.swap-price-details-svg{
    margin-right: 4px;
    color: rgb(152, 161, 192);
}
.swap-price-details-text{
    filter: none;
    opacity: 1;
    transition: opacity 0.2s ease-in-out 0s;
}
.swap-price-details-text-button{
    background-color: transparent;
    border: none;
    cursor: pointer;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: start;
    justify-content: flex-start;
    grid-template-columns: 1fr auto;
    gap: 0.25rem;
    display: flex;
    flex-flow: row wrap;
    text-align: left;
    padding: 8px 0px;
    user-select: text;
}
.swap-price-details-rate{
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-weight: 400;
    font-size: 14px;
    color: rgb(13, 17, 28);
}
.swap-price-details-price{
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-weight: 500;
    color: rgb(152, 161, 192);
}
.swap-gas-details-container{
    width: fit-content;
    display: flex;
    padding: 0px;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: start;
    justify-content: flex-start;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
}
.swap-gas-rate-container{
    display: inline-block;
    height: inherit;
}
.swap-gas-rate-wrapper
    filter: none;
    opacity: 1;
    transition: opacity 0.2s ease-in-out 0s;
}
.swap-gas-rate-block{
    border-radius: 8px;
    padding: 4px 6px;
    height: 24px;
    color: rgb(152, 161, 192);
    background-color: rgb(245, 246, 252);
    font-size: 14px;
    font-weight: 500;
    user-select: none;
    width: fit-content;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: start;
    justify-content: flex-start;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
}
.swap-gas-rate-svg{
    margin-right: 4px;
    height: 14px;
}
.swap-gas-rate-svg > * {
  stroke: rgb(152, 161, 192);
  }
.swap-gas-rate-spacer{
    /*width: 24px;*/
    height: 24px;
    transform: none;
    transition: transform 0.1s linear 0s;
}
.swap-button-container{
    margin-top: 12px;
}
.swap-button{
    background-color: rgb(232, 236, 251);
    color: rgb(119, 128, 160);    
    box-shadow: none;
    border: 1px solid transparent;
    outline: none;    
    pointer-events: none;
    font-size: 20px;
    font-weight: 600;
    padding: 16px;
    width: 100%;
    text-align: center;
    border-radius: 20px;
    text-decoration: none;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    flex-wrap: nowrap;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    z-index: 1;
    will-change: transform;
    transition: transform 450ms ease 0s;
    transform: perspective(1px) translateZ(0pxpx);
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;    
    line-height: inherit;
    /*
    cursor: auto;
    appearance: none;
    user-select: none;
    opacity: 0.5;*/
}
.swap-button-enabled {
    background-color: rgb(251, 17, 142);
    font-size: 20px;
    padding: 16px;
    color: rgb(245, 246, 252);
    width: 100%;
    font-weight: 500;
    text-align: center;
    border-radius: 20px;
    outline: none;
    border: 1px solid transparent;
    text-decoration: none;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    flex-wrap: nowrap;
    -webkit-box-align: center;
    align-items: center;
    cursor: pointer;
    position: relative;
    z-index: 1;
    will-change: transform;
    transition: transform 450ms ease 0s;
    transform: perspective(1px) translateZ(0px);
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    appearance: none;
    line-height: inherit;
    user-select: none;
}
.swap-button-text{
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-size: 20px;
    font-weight: 600;
    user-select: none;
}
`;

if (!css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${css}
`,
  });
}

const Theme = state.theme;

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
      <div
        class={`${assetContainerClass} asset-container`}
        r="sc-1es900k-1 hCwaNt"
      >
        <div class="swap-currency-input">
          <div class="swap-currency-input-block" r="sc-3zewi2-2 kbjgwk">
            <div class="swap-currency-input-top" r="sc-3zewi2-4 eiTjnJ">
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
            <div
              class="input-asset-details-container"
              r="sc-3zewi2-5 sc-3zewi2-6 ckpAFE eTfjeW"
            >
              <div
                class="input-asset-details-row"
                r="sc-bczRLJ sc-nrd8cx-0 sc-nrd8cx-1 hJYFVB fhPvJh frnZMK"
              >
                <div
                  class="input-asset-details-price-container"
                  r="sc-u7b06n-1 eaouLI"
                >
                  <div
                    class="input-asset-details-price"
                    r="sc-sx9n2y-0 kandXm css-zhpkf8"
                  >
                    <div>${assetData.price}</div>
                  </div>
                </div>
                <div
                  class="input-asset-details-balance-container"
                  r="sc-bczRLJ sc-nrd8cx-0 sc-nrd8cx-4 hJYFVB fhPvJh leSroW"
                >
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

const rearrangeAssets = () => {
  State.update({
    inputAssetTokenId: state.outputAssetTokenId,
    outputAssetTokenId: state.inputAssetTokenId,
    inputAsset: undefined,
    outputAsset: undefined,
    inputAssetAmount: state.outputAssetAmount,
    outputAssetAmount: state.inputAssetAmount,
  });
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

const onLoad = (asset1) => {
  console.log(state);
  State.update({ asset1 });
  //console.log(a);11
};

const getRefTokenObject = (tokenId, assetData) => {
  return {
    id: tokenId,
    decimals: assetData.metadata.decimals,
    symbol: assetData.metadata.symbol,
  };
};

const callTx = () => {
  console.log("C TX");
  const tx = [];

  const nearDeposit = {
    contractName: "wrap.near",
    methodName: "near_deposit",
    deposit: expandToken(state.inputAssetAmount, 24).toFixed(),
    gas: expandToken(50, 12),
  };
  const nearWithdraw = {
    contractName: "wrap.near",
    methodName: "near_withdraw",
    deposit: new Big("1").toFixed(),
    args: {
      amount: expandToken(state.inputAssetAmount, 24).toFixed(),
    },
  };

  if (state.estimate.pool === "wrap") {
    if (state.tokenIn.id === "NEAR") {
      tx.push(nearDeposit);
    } else {
      tx.push(nearWithdraw);
    }

    return Near.call(tx);
  }

  if (register === null) {
    tx.push({
      contractName:
        state.outputAssetTokenId === "NEAR"
          ? "wrap.near"
          : state.outputAssetTokenId,
      methodName: "storage_deposit",
      deposit: expandToken(0.1, 24).toFixed(),
      gas: expandToken(50, 12),
      args: {
        registration_only: true,
        account_id: accountId,
      },
    });
  }

  if (state.inputAssetTokenId === "NEAR") {
    tx.push(nearDeposit);
  }

  const minAmountOut = expandToken(
    new Big(state.outputAssetAmount)
      .mul(1 - Number(state.slippagetolerance) / 100)
      .toFixed(state.outputAsset.metadata.decimals, 0),
    state.outputAsset.metadata.decimals
  ).toFixed();

  tx.push({
    methodName: "ft_transfer_call",
    contractName:
      state.inputAssetTokenId === "NEAR"
        ? "wrap.near"
        : state.inputAssetTokenId,
    gas: expandToken(180, 12),
    deposit: new Big("1").toFixed(),
    args: {
      receiver_id: "v2.ref-finance.near",
      amount: expandToken(
        state.inputAssetAmount,
        state.inputAsset.metadata.decimals
      ).toFixed(0, 0),
      msg: JSON.stringify({
        referral_id: refReferralId,
        actions: [
          {
            pool_id: Number(state.estimate.pool.id),
            token_in:
              state.inputAssetTokenId === "NEAR"
                ? "wrap.near"
                : state.inputAssetTokenId,
            token_out:
              state.outputAssetTokenId === "NEAR"
                ? "wrap.near"
                : state.outputAssetTokenId,
            amount_in: expandToken(
              state.inputAssetAmount,
              state.inputAsset.metadata.decimals
            ).toFixed(0, 0),
            min_amount_out: minAmountOut,
          },
        ],
      }),
    },
  });

  if (state.outputAssetTokenId === "NEAR") {
    tx.push({
      contractName: "wrap.near",
      methodName: "near_withdraw",
      deposit: new Big("1").toFixed(),
      args: {
        amount: minAmountOut,
      },
    });
  }

  Near.call(tx);
};

const expandToken = (value, decimals) => {
  console.log("value", value, decimals);
  return new Big(value).mul(new Big(10).pow(decimals));
};

const canSwap =
  Number(state.inputAsset.balance_hr_full) >= Number(state.inputAssetAmount) &&
  Number(state.inputAssetAmount || 0) > 0 &&
  Number(state.outputAssetAmount || 0) > 0;

return (
  <Theme>
    {state.InputAsset && state.inputAssetTokenId && (
      <Widget
        src="zavodil.near/widget/AssetListModal"
        props={{
          hidden: state.InputAssetModalHidden ?? true,
          network: state.network,
          assets: state.assets,
          selectedAssets: [state.inputAssetTokenId],
          onClick: (tokenId) => {
            State.update({
              InputAssetModalHidden: true,
              inputAssetTokenId: tokenId,
              inputAsset: null,
            });
          },
          onClose: () => State.update({ InputAssetModalHidden: true }),
        }}
      />
    )}
    {state.outputAsset && state.outputAssetTokenId && (
      <Widget
        src="zavodil.near/widget/AssetListModal"
        props={{
          hidden: state.OutputAssetModalHidden ?? true,
          assets: state.assets,
          network: state.network,
          selectedAssets: [state.outputAssetTokenId],
          onClick: (tokenId) => {
            State.update({
              OutputAssetModalHidden: true,
              outputAssetTokenId: tokenId,
              outputAsset: null,
            });
          },
          onClose: () => State.update({ OutputAssetModalHidden: true }),
        }}
      />
    )}
    {!state.inputAsset && state.inputAssetTokenId && (
      <Widget
        src="zavodil.near/widget/TokenData"
        props={{
          tokenId: state.inputAssetTokenId,
          network: state.network,
          onLoad: (inputAsset) => {
            inputAsset.metadata.symbol =
              inputAsset.metadata.symbol.toUpperCase();
            State.update({ inputAsset });
          },
        }}
      />
    )}
    {!state.outputAsset && state.outputAssetTokenId && (
      <Widget
        src="zavodil.near/widget/TokenData"
        props={{
          tokenId: state.outputAssetTokenId,
          network: state.network,
          onLoad: (outputAsset) => {
            outputAsset.metadata.symbol =
              outputAsset.metadata.symbol.toUpperCase();
            State.update({ outputAsset });
          },
        }}
      />
    )}

    {state.network === "NEAR" && state.inputAsset && state.outputAsset && (
      <Widget
        src="weige.near/widget/ref-swap-getEstimate"
        props={{
          loadRes: state.loadRes,
          tokenIn: getRefTokenObject(state.inputAssetTokenId, state.inputAsset),
          tokenOut: getRefTokenObject(
            state.outputAssetTokenId,
            state.outputAsset
          ),
          amountIn: state.inputAssetAmount ?? 0,
          reloadPools: state.reloadPools,
          setReloadPools: (value) =>
            State.update({
              reloadPools: value,
            }),
        }}
      />
    )}

    {state.network === "ETH" && state.inputAsset && state.outputAsset && (
      <>
        <Widget
          src="zavodil.near/widget/uni-v3-getEstimate"
          props={{
            loadRes: state.loadRes,
            tokenIn: state.inputAssetTokenId,
            tokenOut: state.outputAssetTokenId,
            tokenOutDecimals: state.outputAsset.metadata.decimals,
            amountIn: expandToken(
              state.inputAssetAmount,
              state.inputAsset.metadata.decimals
            ).toFixed(0),
            reloadPools: state.reloadPools,
            setReloadPools: (value) =>
              State.update({
                reloadPools: value,
              }),
          }}
        />
      </>
    )}

    <div class="swap-root">
      <div class="swap-main-container">
        <div class="swap-main-column">
          <div class="swap-page">
            <div class="top-container">
              {assetContainer(
                true,
                state.inputAsset,
                "inputAssetAmount",
                () => {
                  State.update({ InputAssetModalHidden: false });
                }
              )}
            </div>
            <div class="bottom-container" r="sc-1kykgp9-2 kqyzGE">
              <div>
                {assetContainer(
                  fasle,
                  state.outputAsset,
                  "outputAssetAmount",
                  () => {
                    State.update({ OutputAssetModalHidden: false });
                  }
                )}
                <div
                  class="swap-price-container"
                  r="sc-1es900k-1 sc-1es900k-3 hCwaNt ezjjnS"
                >
                  <div
                    class="swap-price-block"
                    r="sc-bczRLJ sc-nrd8cx-0 sc-1pv2uhy-0 hJYFVB fhPvJh GBxDd"
                  >
                    <div class="swap-price-grid" r="sc-1kykgp9-2 hinRyL">
                      <div
                        class="swap-price-row"
                        r="sc-bczRLJ sc-nrd8cx-0 sc-nrd8cx-1 sc-1pv2uhy-3 hJYFVB fhPvJh frnZMK bjShQM"
                      >
                        <div
                          class="swap-price-details-container"
                          r="sc-bczRLJ sc-nrd8cx-0 sc-nrd8cx-4 hJYFVB fhPvJh leSroW"
                        >
                          <span>
                            <div class="swap-price-details-icon">
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#98A1C0"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  class="swap-price-details-svg"
                                >
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <line x1="12" y1="16" x2="12" y2="12"></line>
                                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                </svg>
                              </div>
                            </div>
                          </span>
                          <div class="swap-price-details-text">
                            <button class="swap-price-details-text-button">
                              <div class="swap-price-details-rate">
                                {Number(state.inputAssetAmount) === 0
                                  ? " "
                                  : `1 ${
                                      state.inputAsset.metadata.symbol
                                    } ≈ ${new Big(state.outputAssetAmount ?? 0)
                                      .div(state.inputAssetAmount ?? 1)
                                      .toFixed(4, 0)}
                                        ${state.outputAsset.metadata.symbol}`}
                              </div>
                              <div class="swap-price-details-price">
                                {Number(state.inputAssetAmount) === 0 ||
                                Number(state?.outputAsset?.price) === 0
                                  ? ""
                                  : `($${new Big(state.outputAssetAmount ?? 0)
                                      .div(state.inputAssetAmount ?? 1)
                                      .times(state?.outputAsset?.price ?? 1)
                                      .toFixed(4)})`}
                              </div>
                            </button>
                          </div>
                        </div>
                        <div class="swap-gas-details-container">
                          <div class="swap-gas-rate-container">
                            <div>
                              <div
                                class="swap-gas-rate-wrapper"
                                r="sc-u7b06n-1 eaouLI"
                              >
                                {state.network != "NEAR_TODO" && (
                                  <div class="swap-gas-rate-block">
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="swap-gas-rate-svg"
                                    >
                                      <path
                                        d="M10.0047 9.26921H10.2714C11.0078 9.26921 11.6047 9.86617 11.6047 10.6025V12.1359C11.6047 12.7987 12.142 13.3359 12.8047 13.3359C13.4675 13.3359 14.0047 12.7995 14.0047 12.1367V5.22059C14.0047 4.86697 13.7758 4.56227 13.5258 4.31223L10.6714 1.33594M4.00472 2.00254H8.00472C8.7411 2.00254 9.33805 2.59949 9.33805 3.33587V14.0015H2.67139V3.33587C2.67139 2.59949 3.26834 2.00254 4.00472 2.00254ZM14.0047 5.33587C14.0047 6.07225 13.4078 6.66921 12.6714 6.66921C11.935 6.66921 11.3381 6.07225 11.3381 5.33587C11.3381 4.59949 11.935 4.00254 12.6714 4.00254C13.4078 4.00254 14.0047 4.59949 14.0047 5.33587Z"
                                        stroke="white"
                                      ></path>
                                      <line
                                        x1="4"
                                        y1="9.99414"
                                        x2="8"
                                        y2="9.99414"
                                        stroke="white"
                                      ></line>
                                      <line
                                        x1="4"
                                        y1="11.9941"
                                        x2="8"
                                        y2="11.9941"
                                        stroke="white"
                                      ></line>
                                      <path
                                        d="M4 8.16113H8"
                                        stroke="white"
                                      ></path>
                                    </svg>
                                    $5.45
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div class="swap-gas-rate-spacer" r="svg"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="swap-button-container">
                <button
                  class={canSwap ? "swap-button-enabled" : "swap-button"}
                  onClick={() => {
                    if (canSwap) {
                      callTx();
                    }
                  }}
                >
                  <div class="swap-button-text" r="css-yjtn9t">
                    Swap
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Theme>
);
