let onLoad = props.onLoad;
const debug = props.debug;

const NETWORK_NEAR = "NEAR";
const NETWORK_ETH = "ETH";
const NETWORK_ZKSYNC = "ZKSYNC";

State.init({ loadComplete: false });

if (debug) {
  onLoad = (data) => {
    if (data) {
      console.log("onLoad triggered", data);
      if (typeof props.onLoad === "function") {
        props.onLoad(data);
      }

      State.update({ debugOutput: <div>Data: [{JSON.stringify(data)}]</div> });
    }
  };
}

if (state.loadComplete) {
  return state.debugOutput ?? <div />;
}

if (typeof onLoad !== "function") return "Error";

// SUBMIT TX EVENTS

const callTxSyncSwap = (input, onComplete) => {
  if (input.sender && input.routerContract !== undefined) {
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
          [tokenIn, input.sender, withdrawMode] // tokenIn, to, withdraw mode
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
            gasPrice: ethers.utils.parseUnits("0.26", "gwei"),
            gasLimit: 20000000,
          })
          .then((transactionHash) => {
            onComplete(transactionHash);
          });
      });
  }
};

const callTxUni = (input, onComplete) => {
  if (input.sender && input.routerContract !== undefined && input.routerAbi) {
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
          gasPrice: ethers.utils.parseUnits("0.50", "gwei"),
          gasLimit: 20000000,
        }
      )
      .then((transactionHash) => {
        onComplete(transactionHash);
      });
  }
};

const callTokenApproval = (input, onComplete) => {
  if (
    input.sender &&
    input.erc20Abi &&
    input.inputAssetAmount &&
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
        gasPrice: ethers.utils.parseUnits("0.26", "gwei"),
        gasLimit: 20000000,
      })
      .then((transactionHash) => {
        onComplete(transactionHash);
      });
  }
};

const callTxRef = (input, onComplete, expandToken) => {
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

// FINAL RESULTS

const NearData = {
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
};

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
          routerContract: "0x2da10A1e27bF85cEdD8FFb1AbBe97e53391C0295",
          dexName: "SyncSwap",
          routerAbi: state.routerAbi,
          factoryABI: state.factoryABI,
          erc20Abi: state.erc20Abi,
          callTx: callTxSyncSwap,
        });
        State.update({ loadComplete: true });
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
            "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
            "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
            "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
            "0xf7B098298f7C69Fc14610bf71d5e02c60792894C",
          ],
          inputAssetTokenId: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          outputAssetTokenId: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
          routerContract: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
          dexName: "UniSwap",
          erc20Abi: state.erc20Abi,
          routerAbi: state.routerAbi,
          callTx: callTxUni,
        });
        State.update({ loadComplete: true });
      } else {
        // not supported evm chain
        onLoad(NearData);
        State.update({ loadComplete: true });
      }
    });
} else {
  // ethers not supported on this gateway
  onLoad(NearData);
  State.update({ loadComplete: true });
}
