const {
  NETWORK_NEAR,
  NETWORK_ETH,
  NETWORK_ZKSYNC,
  NETWORK_ZKEVM,
  NETWORK_AURORA,
  NETWORK_POLYGON,
  DEX,
  debug,
} = props;
let onLoad = props.onLoad;
const forceReload = props.forceReload ?? false;

State.init({ loadComplete: false });

if (state.loadComplete && !forceReload) {
  return state.debugOutput ?? <div />;
}

if (debug) {
  onLoad = (data) => {
    if (data) {
      console.log("onLoad triggered", data);
      if (typeof props.onLoad === "function") {
        props.onLoad(data);
      }

      // review swap data for debug mode

      data.sender = "0x9e65A68B05d06A054e07dC7060ec2bB8BC2B9313";
      data.inputAssetAmount = "4123";
      data.inputAsset = {
        metadata: {
          symbol: "USDC",
          decimals: 6,
        },
      };
      data.outputAsset = {
        metadata: {
          symbol: "WETH",
          decimals: 18,
        },
      };
      const f = (e) => {
        console.log(e);
      };

      data.callTx(data, f);

      State.update({ debugOutput: <div>Data: [{JSON.stringify(data)}]</div> });
    }
  };
}

if (typeof onLoad !== "function") return "Error";

// SUBMIT TX EVENTS

const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals));
};

const callTxBalancerZKEVM = (input, onComplete, gasPrice, gasLimit) => {
  console.log("callTxBalancerZKEVM", input, onComplete);
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

    const USDC = "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035";
    const WETH = "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9";
    const WBTC = "0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1";
    const MATIC = "0xa2036f0538221a77a3937f1379699f44945018d0";
    const USDT = "0x1E4a5963aBFD975d8c9021ce480b42188849D41d";
    const DAI = "0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4";

    // [asset1, asset2, asset3...], pool1
    const pools = [
      [
        [MATIC, WETH, USDC],
        "0xc951aebfa361e9d0063355b9e68f5fa4599aa3d1000100000000000000000017",
      ],
      [
        [WETH, DAI],
        "0xa7f602cfaf75a566cb0ed110993ee81c27fa3f53000200000000000000000009",
      ],
      [
        [WETH, DAI, USDT],
        "0xe8ca7400eb61d5bdfc3f8f2ea99e687e0a4dbf78000100000000000000000019",
      ],
      [
        [WETH, USDC],
        "0x53ddc1f1ef585b426c03674f278f8107f1524ade000200000000000000000012",
      ],
    ];

    const finalPool = pools
      .filter(
        (poolData) =>
          poolData[0].includes(input.inputAssetTokenId) &&
          poolData[0].includes(input.outputAssetTokenId)
      )
      .map((poolData) => poolData[1]);

    if (!finalPool.length) {
      return console.log("Pool not found");
    }

    const assets = [input.inputAssetTokenId, input.outputAssetTokenId];

    const funds = [input.sender, false, input.sender, false];

    const swap_steps = [
      {
        poolId: finalPool[0],
        assetIn: input.inputAssetTokenId,
        assetOut: input.outputAssetTokenId,
        amount: value,
      },
    ];

    const token_data = {};

    token_data[input.inputAssetTokenId] = {
      symbol: input.inputAsset.metadata.symbol,
      decimals: input.inputAsset.metadata.decimals,
      limit: value,
    };
    token_data[input.outputAssetTokenId] = {
      symbol: input.outputAsset.metadata.symbol,
      decimals: input.outputAsset.metadata.decimals,
      limit: "0",
    };

    var token_addresses = Object.keys(token_data);
    const token_indices = {};
    for (var i = 0; i < token_addresses.length; i++) {
      token_indices[token_addresses[i]] = i;
    }

    const swap_steps_struct = [];
    for (const step of swap_steps) {
      const swap_step_struct = [
        step["poolId"],
        token_indices[step["assetIn"]],
        token_indices[step["assetOut"]],
        step["amount"],
        "0x",
      ];
      swap_steps_struct.push(swap_step_struct);
    }

    const swap_kind = 0;
    const token_limits = [value, 0];
    const deadline = new Big(Math.floor(Date.now() / 1000)).add(new Big(1800));

    swapContract
      .batchSwap(
        swap_kind,
        swap_steps_struct,
        assets,
        funds,
        token_limits,
        deadline.toFixed(),
        {
          gasPrice: ethers.utils.parseUnits(gasPrice ?? "0.50", "gwei"),
          gasLimit: gasLimit ?? 20000000,
        }
      )
      .then((transactionHash) => {
        onComplete(transactionHash);
      });
  }
};

const callTxBalancerPolygon = (input, onComplete, gasPrice, gasLimit) => {
  console.log("callTxBalancerPolygon", input, onComplete);
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

    const USDC = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174";
    const WETH = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619";
    const WBTC = "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6";
    const WMATIC = "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270";
    const USDT = "0xc2132d05d31c914a87c6611c10748aeb04b58e8f";
    const DAI = "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063";

    // [asset1, asset2, asset3...], pool1
    const pools = [
      [
        [WMATIC, WETH, USDC],
        "0x0297e37f1873d2dab4487aa67cd56b58e2f27875000100000000000000000002",
      ],
      [
        [WETH, USDC, WBTC],
        "0x03cd191f589d12b0582a99808cf19851e468e6b500010000000000000000000a",
      ],
      [
        [USDC, DAI, USDT],
        "0x06df3b2bbb68adc8b0e302443692037ed9f91b42000000000000000000000012",
      ],
      [
        [WETH, USDC, DAI, WBTC, WMATIC],
        "0x945f337307ea76fdaa2590d083423850f64e247f000100000000000000000b98",
      ],
      [
        [USDT, WETH, WMATIC],
        "0xab7b5e989641afc86daf1bc2cd0ab21285c23f36000100000000000000000a80",
      ],
      [
        [USDT, WBTC],
        "0x2912fbedca787599d6a828f9688fc2ba166ddaa1000100000000000000000889",
      ],
    ];

    const finalPool = pools
      .filter(
        (poolData) =>
          poolData[0].includes(input.inputAssetTokenId) &&
          poolData[0].includes(input.outputAssetTokenId)
      )
      .map((poolData) => poolData[1]);

    if (!finalPool.length) {
      return console.log("Pool not found");
    }

    const assets = [input.inputAssetTokenId, input.outputAssetTokenId];

    const funds = [input.sender, false, input.sender, false];

    const swap_steps = [
      {
        poolId: finalPool[0],
        assetIn: input.inputAssetTokenId,
        assetOut: input.outputAssetTokenId,
        amount: value,
      },
    ];

    const token_data = {};

    token_data[input.inputAssetTokenId] = {
      symbol: input.inputAsset.metadata.symbol,
      decimals: input.inputAsset.metadata.decimals,
      limit: value,
    };
    token_data[input.outputAssetTokenId] = {
      symbol: input.outputAsset.metadata.symbol,
      decimals: input.outputAsset.metadata.decimals,
      limit: "0",
    };

    var token_addresses = Object.keys(token_data);
    const token_indices = {};
    for (var i = 0; i < token_addresses.length; i++) {
      token_indices[token_addresses[i]] = i;
    }

    const swap_steps_struct = [];
    for (const step of swap_steps) {
      const swap_step_struct = [
        step["poolId"],
        token_indices[step["assetIn"]],
        token_indices[step["assetOut"]],
        step["amount"],
        "0x",
      ];
      swap_steps_struct.push(swap_step_struct);
    }

    const swap_kind = 0;
    const token_limits = [value, 0];
    const deadline = new Big(Math.floor(Date.now() / 1000)).add(new Big(1800));

    swapContract
      .batchSwap(
        swap_kind,
        swap_steps_struct,
        assets,
        funds,
        token_limits,
        deadline.toFixed(),
        {
          gasPrice: ethers.utils.parseUnits(gasPrice ?? "0.50", "gwei"),
          gasLimit: gasLimit ?? 20000000,
        }
      )
      .then((transactionHash) => {
        onComplete(transactionHash);
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
            gasPrice: ethers.utils.parseUnits(gweiPrice ?? "0.26", "gwei"),
            gasLimit: 20000000,
          })
          .then((transactionHash) => {
            onComplete(transactionHash);
          });
      });
  }
};

const callTxUni = (input, onComplete, gasPrice, gasLimit) => {
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
          gasLimit: gasLimit ?? 20000000,
        }
      )
      .then((transactionHash) => {
        onComplete(transactionHash);
      });
  }
};

const callTxTrisolaris = (input, onComplete, gasPrice, gasLimit) => {
  console.log("callTxTrisolaris", input, onComplete);
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

    const deadline = `0x${(
      Math.floor(new Date().getTime() / 1000) + 3600
    ).toString(16)}`;

    swapContract
      .swapExactTokensForTokens(
        value,
        "0",
        [input.inputAssetTokenId, input.outputAssetTokenId],
        input.sender,
        deadline,
        {
          gasPrice: ethers.utils.parseUnits(gasPrice ?? "0.50", "gwei"),
          gasLimit: gasLimit ?? 20000000,
        }
      )
      .then((transactionHash) => {
        onComplete(transactionHash);
      });
  }
};

const callTxQuickSwap = (
  input,
  onComplete,
  gasPrice,
  gasLimit,
  sqrtPriceLimitX96,
  path
) => {
  console.log("callTxQuickSwap", input, path);
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

    const deadline = new Big(Math.floor(Date.now() / 1000)).add(new Big(1800));

    if (path.length === 2) {
      // tokenIn tokenOut recipient deadline amountIn amountOutMinimum sqrtPriceLimitX96
      swapContract
        .exactInputSingle(
          [
            input.inputAssetTokenId,
            input.outputAssetTokenId,
            input.sender,
            deadline.toFixed(),
            value,
            "0",
            sqrtPriceLimitX96 ?? 0,
          ],
          {
            gasPrice: ethers.utils.parseUnits(gasPrice ?? "10", "gwei"),
            gasLimit: gasLimit ?? 300000,
          }
        )
        .then((transactionHash) => {
          onComplete(transactionHash);
        });
    } else if (path.length > 2) {
      // path recepient deadline amountIn amountOutMinimum
      const pathBytes =
        "0x" + path.map((address) => address.substr(2)).join("");

      swapContract
        .exactInput([pathBytes, input.sender, deadline, value, "0"], {
          gasPrice: ethers.utils.parseUnits(gasPrice ?? "10", "gwei"),
          gasLimit: gasLimit ?? 300000,
        })
        .then((transactionHash) => {
          onComplete(transactionHash);
        });
    }
  }
};

const callTokenApprovalEVM = (input, onComplete, gweiPrice, gasLimit) => {
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

    let gasArgs = {};

    if (gweiPrice !== undefined && gasLimit !== undefined) {
      gasArgs.gasPrice = ethers.utils.parseUnits(gweiPrice ?? "0.26", "gwei");
      gasArgs.gasLimit = gasLimit ?? 20000000;
    }

    approveContract
      .approve(input.routerContract, value, gasArgs)
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

console.log("ethers", ethers);

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
          factoryAbi: state.factoryAbi,
          erc20Abi: state.erc20Abi,
          callTx: callTxSyncSwap,
          callTokenApproval: callTokenApprovalEVM,
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
            "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", // Uni
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
      } else if (chainIdData.chainId === 1313161554) {
        // AURORA

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
            "0x8bec47865ade3b172a928df8f990bc7f2a3b9f79",
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
          callTx: callTxTrisolaris,
          callTokenApproval: callTokenApprovalEVM,
        });
        State.update({ loadComplete: true });
      } else if (chainIdData.chainId === 137) {
        // POLYGON

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
            "https://raw.githubusercontent.com/gerrrg/balancer-tutorials/master/abis/Vault.json"
          );
          if (!routerAbi.ok) {
            return "Loading";
          }

          State.update({ routerAbi: routerAbi.body });
        }

        if (!state.routerAbi || !state.erc20Abi) return "Loading ABIs";

        onLoad({
          network: NETWORK_POLYGON,
          assets: [
            "0x2791bca1f2de4661ed88a30c99a7a9449aa84174", // USDC
            "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", // WETH
            "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6", // WBTC
            "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270", // WMATIC
            "0xc2132d05d31c914a87c6611c10748aeb04b58e8f", // USDT
            "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063", // DAI
          ],
          coinGeckoTokenIds: {
            "0x2791bca1f2de4661ed88a30c99a7a9449aa84174":
              "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619":
              "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            "0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1":
              "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
            "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270":
              "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
            "0xc2132d05d31c914a87c6611c10748aeb04b58e8f":
              "0xdac17f958d2ee523a2206206994597c13d831ec7",
            "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063":
              "0x6b175474e89094c44da98b954eedeac495271d0f",
          },
          inputAssetTokenId: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
          outputAssetTokenId: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
          routerContract: "0xBA12222222228d8Ba445958a75a0704d566BF2C8", // Balancer Vault
          dexName: "Balancer",
          erc20Abi: state.erc20Abi,
          routerAbi: state.routerAbi,
          callTx: callTxBalancerPolygon,
          callTokenApproval: callTokenApprovalEVM,
        });
        State.update({ loadComplete: true });
      } else if (chainIdData.chainId === 1101) {
        // ZKEVM

        if (DEX === "QuickSwap") {
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
              "https://gist.githubusercontent.com/zavodil/a50ed9fcd2e1ba1adc40db19a94c79fe/raw/a3b92a2b9120d7d503e01714980ad44bd10c9030/quickswap_swapRouter_zkevm.json"
            );
            if (!routerAbi.ok) {
              return "Loading";
            }

            State.update({ routerAbi: routerAbi.body });
          }

          if (!state.routerAbi || !state.erc20Abi) return "Loading ABIs";

          onLoad({
            network: NETWORK_ZKEVM,
            assets: [
              "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035", // USDC
              "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9", // WETH
              "0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1", // WBTC
              "0xa2036f0538221a77a3937f1379699f44945018d0", // MATIC
            ],
            coinGeckoTokenIds: {
              "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035":
                "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
              "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9":
                "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
              "0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1":
                "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
              "0xa2036f0538221a77a3937f1379699f44945018d0":
                "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
            },
            inputAssetTokenId: "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035",
            outputAssetTokenId: "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9",
            routerContract: "0xF6Ad3CcF71Abb3E12beCf6b3D2a74C963859ADCd",
            dexName: "QuickSwap",
            erc20Abi: state.erc20Abi,
            routerAbi: state.routerAbi,
            callTx: callTxQuickSwap,
            callTokenApproval: callTokenApprovalEVM,
          });
          State.update({ loadComplete: true });
        } else if (DEX === "Balancer") {
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
              "https://raw.githubusercontent.com/gerrrg/balancer-tutorials/master/abis/Vault.json"
            );
            if (!routerAbi.ok) {
              return "Loading";
            }

            State.update({ routerAbi: routerAbi.body });
          }

          if (!state.routerAbi || !state.erc20Abi) return "Loading ABIs";

          onLoad({
            network: NETWORK_ZKEVM,
            assets: [
              "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035", // USDC
              "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9", // WETH
              "0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1", // WBTC
              "0xa2036f0538221a77a3937f1379699f44945018d0", // MATIC
              "0x1E4a5963aBFD975d8c9021ce480b42188849D41d", // USDT
              "0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4", // DAI
            ],
            coinGeckoTokenIds: {
              "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035":
                "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
              "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9":
                "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
              "0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1":
                "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
              "0xa2036f0538221a77a3937f1379699f44945018d0":
                "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
              "0x1E4a5963aBFD975d8c9021ce480b42188849D41d":
                "0xdac17f958d2ee523a2206206994597c13d831ec7",
              "0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4":
                "0x6b175474e89094c44da98b954eedeac495271d0f",
            },
            inputAssetTokenId: "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035",
            outputAssetTokenId: "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9",
            routerContract: "0xBA12222222228d8Ba445958a75a0704d566BF2C8", // Balancer Vault
            dexName: "Balancer",
            erc20Abi: state.erc20Abi,
            routerAbi: state.routerAbi,
            callTx: callTxBalancerZKEVM,
            callTokenApproval: callTokenApprovalEVM,
          });
          State.update({ loadComplete: true });
        }
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
