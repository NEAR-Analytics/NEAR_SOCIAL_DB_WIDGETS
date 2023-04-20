const NETWORK_NEAR = "NEAR";
const NETWORK_ETH = "ETH";
const NETWORK_ZKSYNC = "ZKSYNC";
const NETWORK_TODO = "TODO";

State.init({
  initialized: false,
  inputAssetModalHidden: true,
  outputAssetModalHidden: true,
  inputAssetTokenId: "NEAR",
  outputAssetTokenId:
    "dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near",
  inputAssetAmount: 1,
  outputAssetAmount: 0,
  //network: NETWORK_NEAR,
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
    State.update({
      estimate: value,
      outputAssetAmount: value === null ? "" : value.estimate,
    });
  },
});

const refReferralId = props.refReferralId ?? "zavodil.near";

if (!state.initialized) {
  if (ethers !== undefined) {
    Ethers.provider()
      .getNetwork()
      .then((chainIdData) => {
        console.log("chainId", chainIdData.chainId);
        if (chainIdData.chainId === 324) {
          State.update({
            assets: [
              "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4", // USDC
              "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91", // WETH
              "0x7400793aAd94C8CA801aa036357d10F5Fd0ce08f", // BNB
            ],
            coinGeckoTokenIds: {
              "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4":
                "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
              "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91":
                "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
              "0x7400793aAd94C8CA801aa036357d10F5Fd0ce08f":
                "0x418d75f65a02b3d53b2418fb8e1fe493759c7605",
            },
            inputAssetTokenId: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",
            outputAssetTokenId: "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91",
            inputAsset: undefined,
            outputAsset: undefined,
            network: NETWORK_ZKSYNC,
          });
        } else {
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
            inputAsset: undefined,
            outputAsset: undefined,
            network: NETWORK_ETH,
          });
        }

        State.update({ initialized: true });
      });
  } else {
    State.update({ network: NETWORK_NEAR });
  }
} else {
  State.update({ initialized: true });
}

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

const getRefTokenObject = (tokenId, assetData) => {
  return {
    id: tokenId,
    decimals: assetData.metadata.decimals,
    symbol: assetData.metadata.symbol,
  };
};

if (state.network === NETWORK_ZKSYNC) {
  if (state.routerAbi == undefined) {
    const routerAbi = fetch(
      "https://gist.githubusercontent.com/0xnakato/80ca6221ef258b7b27bf309c8a3eeff2/raw/50b1b27d5a5741a37667d35e62b7f9bccd0c5847/SyncSwapRouter.json"
    );
    if (!routerAbi.ok) {
      return "Loading";
    }
    State.update({ routerAbi: routerAbi.body });
  }

  if (state.factoryABI == undefined) {
    const factoryABI = fetch(
      "https://gist.githubusercontent.com/0xnakato/13e8393c09ea842912f5f2e5995e9770/raw/7d4edfa0a29de02f7b84d4fb79f1e6125ed0e7cc/SyncSwapClassicPoolFactory.json"
    );
    if (!factoryABI.ok) {
      return "Loading";
    }
    State.update({ factoryABI: factoryABI.body });
  }
}

const callTxZkSync = () => {
  const sender = Ethers.send("eth_requestAccounts", [])[0];
  if (sender) {
    const routerContract = "0x2da10A1e27bF85cEdD8FFb1AbBe97e53391C0295";

    const classicPoolFactoryContractId =
      "0xf2DAd89f2788a8CD54625C60b55cD3d2D0ACa7Cb";
    const ifaceFactory = new ethers.utils.Interface(state.factoryABI);

    const tokenIn = state.inputAssetTokenId;
    const tokenOut = state.outputAssetTokenId;

    const poolEncodedData = ifaceFactory.encodeFunctionData("getPool", [
      tokenIn,
      tokenOut,
    ]);

    return Ethers.provider()
      .call({
        to: classicPoolFactoryContractId,
        data: poolEncodedData,
      })
      .then((data) => {
        const poolData = ifaceFactory.decodeFunctionResult("getPool", data);
        const poolId = poolData[0];

        const withdrawMode = 1;

        const swapData = ethers.utils.defaultAbiCoder.encode(
          ["address", "address", "uint8"],
          [tokenIn, sender, withdrawMode] // tokenIn, to, withdraw mode
        );

        const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

        const steps = [
          {
            pool: poolId,
            data: swapData,
            callback: ZERO_ADDRESS,
            callbackData: "0x",
          },
        ];

        const value = expandToken(
          state.inputAssetAmount,
          state.inputAsset.metadata.decimals
        ).toFixed();

        console.log(
          "Swapping",
          state.inputAssetTokenId,
          value,
          state.inputAsset
        );

        const paths = [
          {
            steps: steps,
            tokenIn: tokenIn,
            amountIn: value,
          },
        ];

        const deadline = new Big(Math.floor(Date.now() / 1000)).add(
          new Big(1800)
        );

        const swapContract = new ethers.Contract(
          routerContract,
          state.routerAbi,
          Ethers.provider().getSigner()
        );

        swapContract
          .swap(paths, 1, deadline.toFixed(), {
            value,
            gasPrice: ethers.utils.parseUnits("0.26", "gwei"),
            gasLimit: 20000000,
          })
          .then((transactionHash) => {
            console.log("transactionHash", transactionHash);
            state.update({
              outputAsset: undefined,
            });
          });
      });
  }
};

const callTxRef = () => {
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
  return new Big(value).mul(new Big(10).pow(decimals));
};

const canSwap =
  state.network &&
  Number(state.inputAsset.balance_hr_full) >= Number(state.inputAssetAmount) &&
  Number(state.inputAssetAmount || 0) > 0;

return (
  <Theme>
    {state.network && state.inputAsset && state.inputAssetTokenId && (
      <Widget
        src="zavodil.near/widget/AssetListModal"
        props={{
          hidden: state.inputAssetModalHidden ?? true,
          network: state.network,
          assets: state.assets,
          coinGeckoTokenIds: state.coinGeckoTokenIds,
          selectedAssets: [state.inputAssetTokenId],
          onClick: (tokenId) => {
            State.update({
              inputAssetModalHidden: true,
              inputAssetTokenId: tokenId,
              inputAsset: null,
            });
          },
          onClose: () => State.update({ inputAssetModalHidden: true }),
        }}
      />
    )}
    {state.network && state.outputAsset && state.outputAssetTokenId && (
      <Widget
        src="zavodil.near/widget/AssetListModal"
        props={{
          hidden: state.outputAssetModalHidden ?? true,
          assets: state.assets,
          coinGeckoTokenIds: state.coinGeckoTokenIds,
          network: state.network,
          selectedAssets: [state.outputAssetTokenId],
          onClick: (tokenId) => {
            State.update({
              outputAssetModalHidden: true,
              outputAssetTokenId: tokenId,
              outputAsset: null,
            });
          },
          onClose: () => State.update({ outputAssetModalHidden: true }),
        }}
      />
    )}
    {!state.inputAsset && state.network && state.inputAssetTokenId && (
      <Widget
        src="zavodil.near/widget/TokenData"
        props={{
          tokenId: state.inputAssetTokenId,
          coinGeckoTokenId: state?.coinGeckoTokenIds?.[state.inputAssetTokenId],
          network: state.network,
          onLoad: (inputAsset) => {
            inputAsset.metadata.symbol =
              inputAsset.metadata.symbol.toUpperCase();
            State.update({ inputAsset });
          },
        }}
      />
    )}
    {!state.outputAsset && state.network && state.outputAssetTokenId && (
      <Widget
        src="zavodil.near/widget/TokenData"
        props={{
          tokenId: state.outputAssetTokenId,
          coinGeckoTokenId:
            state?.coinGeckoTokenIds?.[state.outputAssetTokenId],
          network: state.network,
          onLoad: (outputAsset) => {
            outputAsset.metadata.symbol =
              outputAsset.metadata.symbol.toUpperCase();
            State.update({ outputAsset });
          },
        }}
      />
    )}

    {state.network === NETWORK_NEAR &&
      state.inputAsset &&
      state.outputAsset && (
        <Widget
          src="weige.near/widget/ref-swap-getEstimate"
          props={{
            loadRes: state.loadRes,
            tokenIn: getRefTokenObject(
              state.inputAssetTokenId,
              state.inputAsset
            ),
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

    {state.network === NETWORK_ETH && state.inputAsset && state.outputAsset && (
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

    {state.network === NETWORK_TODO &&
      state.inputAsset &&
      state.outputAsset && (
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
                  State.update({ inputAssetModalHidden: false });
                }
              )}
            </div>
            <div class="bottom-container">
              <div>
                {assetContainer(
                  fasle,
                  state.outputAsset,
                  "outputAssetAmount",
                  () => {
                    State.update({ outputAssetModalHidden: false });
                  }
                )}
                {!!state.outputAssetAmount && (
                  <div class="swap-price-container">
                    <div class="swap-price-block">
                      <div class="swap-price-grid">
                        <div class="swap-price-row">
                          <div class="swap-price-details-container">
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
                                    <line
                                      x1="12"
                                      y1="16"
                                      x2="12"
                                      y2="12"
                                    ></line>
                                    <line
                                      x1="12"
                                      y1="8"
                                      x2="12.01"
                                      y2="8"
                                    ></line>
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
                                      } ≈ ${new Big(
                                        state.outputAssetAmount ?? 0
                                      )
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
                                <div class="swap-gas-rate-wrapper">
                                  {state.network === NETWORK_TODO && (
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
                )}
              </div>
              <div class="swap-button-container">
                <button
                  class={canSwap ? "swap-button-enabled" : "swap-button"}
                  onClick={() => {
                    if (canSwap) {
                      if (state.network === NETWORK_NEAR) {
                        callTxRef();
                      } else if (state.network === NETWORK_ZKSYNC) {
                        callTxZkSync();
                      }
                    }
                  }}
                >
                  <div class="swap-button-text">Swap</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Theme>
);
