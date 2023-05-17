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

const onLoad = (data) => {
  console.log("onLoad", data);
  if (state.loadComplete === false) {
    State.update({
      ...data,
      inputAsset: undefined,
      outputAsset: undefined,
      sender: getEVMAccountId(),
    });
  }
};

const callTxSyncSwap = (input, onComplete, gweiPrice) => {
  if (
    input.sender &&
    input.routerContract !== undefined &&
    input.inputAssetAmount &&
    input.inputAsset.metadata?.decimals
  ) {
    const classicPoolFactoryContractId =
      "0xf2DAd89f2788a8CD54625C60b55cD3d2D0ACa7Cb";
    const ifaceFactory = new ethers.utils.Interface(input.factoryAbi);

    const tokenIn = input.inputAssetTokenId;
    const tokenOut = input.outputAssetTokenId;

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
          [tokenIn, input.sender, withdrawMode]
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
          input.inputAssetAmount,
          input.inputAsset.metadata.decimals
        ).toFixed();

        console.log(
          "Swapping",
          input.inputAssetTokenId,
          value,
          input.inputAsset
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
          input.routerContract,
          input.routerAbi,
          Ethers.provider().getSigner()
        );

        swapContract
          .swap(paths, 1, deadline.toFixed(), {
            value,
            gasPrice: ethers.utils.parseUnits(gweiPrice ?? "0.26", "gwei"),
            gasLimit: 20000000,
          })
          .then((transactionHash) => {
            onComplete(transactionHash);
          });
      });
  }
};

const callTxUni = (input, onComplete, gasPrice) => {
  console.log("callTxUni", input, onComplete);
  if (
    input.sender &&
    input.routerContract !== undefined &&
    input.routerAbi &&
    input.inputAssetAmount &&
    input.inputAsset.metadata.decimals
  ) {
    const value = expandToken(
      input.inputAssetAmount,
      input.inputAsset.metadata.decimals
    ).toFixed();

    const swapContract = new ethers.Contract(
      input.routerContract,
      input.routerAbi,
      Ethers.provider().getSigner()
    );

    swapContract
      .swapExactTokensForTokens(
        value,
        "0",
        [input.inputAssetTokenId, input.outputAssetTokenId],
        input.sender,
        {
          gasPrice: ethers.utils.parseUnits(gasPrice ?? "0.50", "gwei"),
          gasLimit: 20000000,
        }
      )
      .then((transactionHash) => {
        onComplete(transactionHash);
      });
  }
};

const callTokenApprovalEVM = (input, onComplete, gweiPrice) => {
  if (
    input.sender &&
    input.erc20Abi &&
    input.inputAssetAmount &&
    input.inputAsset.metadata.decimals &&
    input.routerContract
  ) {
    const value = expandToken(
      input.inputAssetAmount,
      input.inputAsset.metadata.decimals
    ).toFixed();

    const approveContract = new ethers.Contract(
      input.inputAssetTokenId,
      input.erc20Abi,
      Ethers.provider().getSigner()
    );

    approveContract
      .approve(input.routerContract, value, {
        gasPrice: ethers.utils.parseUnits(gweiPrice ?? "0.26", "gwei"),
        gasLimit: 20000000,
      })
      .then((transactionHash) => {
        onComplete(transactionHash);
      });
  }
};

const callTxRef = (input, onComplete) => {
  const tx = [];

  const nearDeposit = {
    contractName: "wrap.near",
    methodName: "near_deposit",
    deposit: expandToken(input.inputAssetAmount, 24).toFixed(),
    gas: expandToken(50, 12),
  };
  const nearWithdraw = {
    contractName: "wrap.near",
    methodName: "near_withdraw",
    deposit: new Big("1").toFixed(),
    args: {
      amount: expandToken(input.inputAssetAmount, 24).toFixed(),
    },
  };

  if (input.estimate.pool === "wrap") {
    if (input.tokenIn.id === "NEAR") {
      tx.push(nearDeposit);
    } else {
      tx.push(nearWithdraw);
    }

    return Near.call(tx).then(() => onComplete());
  }

  if (register === null) {
    tx.push({
      contractName:
        input.outputAssetTokenId === "NEAR"
          ? "wrap.near"
          : input.outputAssetTokenId,
      methodName: "storage_deposit",
      deposit: expandToken(0.1, 24).toFixed(),
      gas: expandToken(50, 12),
      args: {
        registration_only: true,
        account_id: accountId,
      },
    });
  }

  if (input.inputAssetTokenId === "NEAR") {
    tx.push(nearDeposit);
  }

  const minAmountOut = expandToken(
    new Big(input.outputAssetAmount)
      .mul(1 - Number(input.slippagetolerance) / 100)
      .toFixed(input.outputAsset.metadata.decimals, 0),
    input.outputAsset.metadata.decimals
  ).toFixed();

  tx.push({
    methodName: "ft_transfer_call",
    contractName:
      input.inputAssetTokenId === "NEAR"
        ? "wrap.near"
        : input.inputAssetTokenId,
    gas: expandToken(180, 12),
    deposit: new Big("1").toFixed(),
    args: {
      receiver_id: "v2.ref-finance.near",
      amount: expandToken(
        input.inputAssetAmount,
        input.inputAsset.metadata.decimals
      ).toFixed(0, 0),
      msg: JSON.stringify({
        referral_id: refReferralId,
        actions: [
          {
            pool_id: Number(input.estimate.pool.id),
            token_in:
              input.inputAssetTokenId === "NEAR"
                ? "wrap.near"
                : input.inputAssetTokenId,
            token_out:
              input.outputAssetTokenId === "NEAR"
                ? "wrap.near"
                : input.outputAssetTokenId,
            amount_in: expandToken(
              input.inputAssetAmount,
              input.inputAsset.metadata.decimals
            ).toFixed(0, 0),
            min_amount_out: minAmountOut,
          },
        ],
      }),
    },
  });

  if (input.outputAssetTokenId === "NEAR") {
    tx.push({
      contractName: "wrap.near",
      methodName: "near_withdraw",
      deposit: new Big("1").toFixed(),
      args: {
        amount: minAmountOut,
      },
    });
  }

  Near.call(tx).then(() => onComplete());
};

// // FINAL RESULTS

if (ethers !== undefined && Ethers.send("eth_requestAccounts", [])[0]) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      console.log("chainId", chainIdData.chainId);
      if (chainIdData.chainId === 324) {
        // ZKSYNC

        if (state.routerAbi == undefined) {
          const routerAbi = fetch(
            "https://gist.githubusercontent.com/0xnakato/80ca6221ef258b7b27bf309c8a3eeff2/raw/50b1b27d5a5741a37667d35e62b7f9bccd0c5847/SyncSwapRouter.json"
          );
          if (!routerAbi.ok) {
            return "Loading";
          }
          State.update({ routerAbi: routerAbi.body });
        }

        if (state.factoryAbi == undefined) {
          const factoryAbi = fetch(
            "https://gist.githubusercontent.com/0xnakato/13e8393c09ea842912f5f2e5995e9770/raw/7d4edfa0a29de02f7b84d4fb79f1e6125ed0e7cc/SyncSwapClassicPoolFactory.json"
          );
          if (!factoryAbi.ok) {
            return "Loading";
          }
          State.update({ factoryAbi: factoryAbi.body });
        }

        if (state.erc20Abi == undefined) {
          const erc20Abi = fetch(
            "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
          );
          if (!erc20Abi.ok) {
            return "Loading";
          }
          State.update({ erc20Abi: erc20Abi.body });
        }

        if (!state.routerAbi || !state.factoryAbi || !state.erc20Abi)
          return "Loading ABIs";

        onLoad({
          network: NETWORK_ZKSYNC,
          assets: [
            "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",
            "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91",
            "0x7400793aAd94C8CA801aa036357d10F5Fd0ce08f",
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
          routerContract: "0x2da10A1e27bF85cEdD8FFb1AbBe97e53391C0295",
          dexName: "SyncSwap",
          routerAbi: state.routerAbi,
          factoryAbi: state.factoryAbi,
          erc20Abi: state.erc20Abi,
          callTx: callTxSyncSwap,
          callTokenApproval: callTokenApprovalEVM,
          loadComplete: true,
        });
      } else if (chainIdData.chainId === 1) {
        // ETH

        if (state.erc20Abi == undefined) {
          const erc20Abi = fetch(
            "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
          );
          if (!erc20Abi.ok) {
            return "Loading";
          }
          State.update({ erc20Abi: erc20Abi.body });
        }

        if (state.routerAbi == undefined) {
          const routerAbi = fetch(
            "https://gist.githubusercontent.com/zavodil/108a3719d4ac4b53131b09872ff81b83/raw/82561cf48afcc72861fa8fa8283b33c04da316d7/SwapRouter02.json"
          );
          if (!routerAbi.ok) {
            return "Loading";
          }

          State.update({ routerAbi: routerAbi.body });
        }

        if (!state.routerAbi || !state.erc20Abi) return "Loading ABIs";

        onLoad({
          network: NETWORK_ETH,
          assets: [
            "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            "0x6B175474E89094C44Da98b954EedeAC495271d0F",
            "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
          ],
          inputAssetTokenId: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          outputAssetTokenId: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
          routerContract: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
          dexName: "UniSwap",
          erc20Abi: state.erc20Abi,
          routerAbi: state.routerAbi,
          callTx: callTxUni,
          callTokenApproval: callTokenApprovalEVM,
        });
        State.update({ loadComplete: true });
      } else if (chainIdData.chainId == 1313161554) {
        // Aurora

        if (state.routerAbi == undefined) {
          const routerAbi = fetch(
            "https://raw.githubusercontent.com/trisolaris-labs/interface/main/src/constants/abis/polygon/IUniswapV2Router02.json"
          );
          if (!routerAbi.ok) {
            return "Loading";
          }
          State.update({ routerAbi: routerAbi.body });
        }

        if (state.erc20Abi == undefined) {
          const erc20Abi = fetch(
            "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
          );
          if (!erc20Abi.ok) {
            return "Loading";
          }
          State.update({ erc20Abi: erc20Abi.body });
        }

        if (state.factoryAbi == undefined) {
          const factoryAbi = fetch(
            "https://raw.githubusercontent.com/DaniPopes/uniswap-rs/9a7c8f9aadc38b458eac6571509d354859e6cca0/abi/IUniswapV2Factory.json"
          );
          if (!factoryAbi.ok) {
            return "Loading";
          }
          State.update({ factoryAbi: factoryAbi.body });
        }

        if (!state.routerAbi || !state.factoryAbi || !state.erc20Abi)
          return "Loading ABIs";

        onLoad({
          network: NETWORK_AURORA,
          assets: [
            "0xB12BFcA5A55806AaF64E99521918A4bf0fC40802",
            "0x0b20972B45ffB8e5d4D37AF4024E1bf0b03f15ae",
            "0xF4eB217Ba2454613b15dBdea6e5f22276410e89e",
            "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d",
            "0xFa94348467f64D5A457F75F8bc40495D33c65aBB",
          ],
          inputAssetTokenId: "0xB12BFcA5A55806AaF64E99521918A4bf0fC40802",
          outputAssetTokenId: "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d",
          routerContract: "0x2CB45Edb4517d5947aFdE3BEAbF95A582506858B",
          factoryContract: "0xc66F594268041dB60507F00703b152492fb176E7",
          dexName: "Trisolaris",
          routerAbi: state.routerAbi,
          factoryAbi: state.factoryAbi,
          erc20Abi: state.erc20Abi,
          callTx: callTxUni,
          callTokenApproval: callTokenApprovalEVM,
          loadComplete: true,
        });
      } else {
        // not supported evm chain
        onLoad({
          network: NETWORK_NEAR,
          inputAssetTokenId: "NEAR",
          outputAssetTokenId:
            "dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near",
          dexName: "Ref Finance",
          assets: [
            "NEAR",
            "token.v2.ref-finance.near",
            "dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near",
            "token.burrow.near",
          ],
          callTx: callTxRef,
          loadComplete: true,
        });
      }
    });
} else {
  onLoad({
    network: NETWORK_NEAR,
    inputAssetTokenId: "NEAR",
    outputAssetTokenId:
      "dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near",
    dexName: "Ref Finance",
    assets: [
      "NEAR",
      "token.v2.ref-finance.near",
      "dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near",
      "token.burrow.near",
    ],
    callTx: callTxRef,
    loadComplete: true,
  });
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
              approvalNeeded: undefined,
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
            console.log("TokenData onLoad inputAsset", inputAsset);
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
            console.log("TokenData onLoad outputAsset", outputAsset);
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

    {state.network === NETWORK_ETH &&
      state.inputAssetTokenId &&
      state.outputAssetTokenId &&
      state.inputAssetTokenId !== state.outputAssetTokenId &&
      state.inputAssetAmount &&
      state.inputAsset &&
      state.inputAsset.metadata?.decimals &&
      state.outputAsset &&
      state.outputAsset.metadata?.decimals && (
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

    {(state.network === NETWORK_ZKSYNC || state.network == NETWORK_AURORA) &&
      state.inputAsset &&
      state.outputAsset &&
      state.inputAssetAmount &&
      state.outputAsset.price &&
      state.inputAsset.price &&
      state.loadRes({
        estimate: (
          (parseFloat(state.inputAssetAmount) *
            parseFloat(state.inputAsset.price)) /
          parseFloat(state.outputAsset.price)
        ).toFixed(18),
      })}

    <div class="swap-root">
      <div class="swap-main-container">
        <div class="swap-main-column">
          <div class="swap-page">
            {state.network && state.dexName && (
              <span class="ps-2" style={{ color: "#7780a0" }}>
                {state.dexName} ({state.network})
              </span>
            )}
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
                {!!state.outputAssetAmount &&
                  state.inputAssetTokenId !== state.outputAssetTokenId && (
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
                                    {Number(state.inputAssetAmount) === 0 ||
                                    Number(state.outputAssetAmount) === 0
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
                                      : `($${new Big(
                                          state.outputAssetAmount ?? 0
                                        )
                                          .div(state.inputAssetAmount ?? 1)
                                          .times(state?.outputAsset?.price ?? 1)
                                          .toFixed(4)})`}
                                  </div>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
              <div class="swap-button-container">
                {state.approvalNeeded === true && (
                  <button
                    class={"swap-button-enabled"}
                    onClick={() => {
                      state.callTokenApproval(state, () => {
                        onCallTxComple();
                        tokenInApprovaleNeededCheck();
                      });
                    }}
                  >
                    <div class="swap-button-text">
                      Approve {state.inputAsset.metadata.symbol}
                    </div>
                  </button>
                )}
                {state.approvalNeeded !== true && (
                  <button
                    class={canSwap ? "swap-button-enabled" : "swap-button"}
                    onClick={() => {
                      if (canSwap) {
                        if (state.network === NETWORK_NEAR) {
                          state.callTx(state, onCallTxComple);
                        } else if (state.network === NETWORK_ZKSYNC) {
                          state.callTx(state, onCallTxComple);
                        } else if (state.network === NETWORK_ETH) {
                          state.callTx(state, onCallTxComple);
                        }
                      }
                    }}
                  >
                    <div class="swap-button-text">Swap</div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div class="pt-3 text-secondary opacity-25 text-center">
          <p>
            Supported networks: {NETWORK_NEAR}, {NETWORK_ETH}, {NETWORK_ZKSYNC},{" "}
            {NETWORK_AURORA}
          </p>
          {currentAccountId && <p>Current account: {currentAccountId}</p>}
        </div>
      </div>
    </div>
  </Theme>
);
