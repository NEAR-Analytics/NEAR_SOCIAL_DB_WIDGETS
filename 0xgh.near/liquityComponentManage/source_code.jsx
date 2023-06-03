const troveManageABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_activePoolAddress",
        type: "address",
      },
    ],
    name: "ActivePoolAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_baseRate",
        type: "uint256",
      },
    ],
    name: "BaseRateUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_newBorrowerOperationsAddress",
        type: "address",
      },
    ],
    name: "BorrowerOperationsAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_collSurplusPoolAddress",
        type: "address",
      },
    ],
    name: "CollSurplusPoolAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_defaultPoolAddress",
        type: "address",
      },
    ],
    name: "DefaultPoolAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_gasPoolAddress",
        type: "address",
      },
    ],
    name: "GasPoolAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_lqtyStakingAddress",
        type: "address",
      },
    ],
    name: "LQTYStakingAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_lqtyTokenAddress",
        type: "address",
      },
    ],
    name: "LQTYTokenAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_L_ETH",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_L_LUSDDebt",
        type: "uint256",
      },
    ],
    name: "LTermsUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_newLUSDTokenAddress",
        type: "address",
      },
    ],
    name: "LUSDTokenAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_lastFeeOpTime",
        type: "uint256",
      },
    ],
    name: "LastFeeOpTimeUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_liquidatedDebt",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_liquidatedColl",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_collGasCompensation",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_LUSDGasCompensation",
        type: "uint256",
      },
    ],
    name: "Liquidation",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_newPriceFeedAddress",
        type: "address",
      },
    ],
    name: "PriceFeedAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_attemptedLUSDAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_actualLUSDAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_ETHSent",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_ETHFee",
        type: "uint256",
      },
    ],
    name: "Redemption",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_sortedTrovesAddress",
        type: "address",
      },
    ],
    name: "SortedTrovesAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_stabilityPoolAddress",
        type: "address",
      },
    ],
    name: "StabilityPoolAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_totalStakesSnapshot",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_totalCollateralSnapshot",
        type: "uint256",
      },
    ],
    name: "SystemSnapshotsUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_newTotalStakes",
        type: "uint256",
      },
    ],
    name: "TotalStakesUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_newIndex",
        type: "uint256",
      },
    ],
    name: "TroveIndexUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_debt",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_coll",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum TroveManager.TroveManagerOperation",
        name: "_operation",
        type: "uint8",
      },
    ],
    name: "TroveLiquidated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_L_ETH",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_L_LUSDDebt",
        type: "uint256",
      },
    ],
    name: "TroveSnapshotsUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_debt",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_coll",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_stake",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum TroveManager.TroveManagerOperation",
        name: "_operation",
        type: "uint8",
      },
    ],
    name: "TroveUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "BETA",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BOOTSTRAP_PERIOD",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BORROWING_FEE_FLOOR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CCR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DECIMAL_PRECISION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LUSD_GAS_COMPENSATION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "L_ETH",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "L_LUSDDebt",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_BORROWING_FEE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MCR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MINUTE_DECAY_FACTOR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MIN_NET_DEBT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NAME",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PERCENT_DIVISOR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REDEMPTION_FEE_FLOOR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SECONDS_IN_ONE_MINUTE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "TroveOwners",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "Troves",
    outputs: [
      { internalType: "uint256", name: "debt", type: "uint256" },
      { internalType: "uint256", name: "coll", type: "uint256" },
      { internalType: "uint256", name: "stake", type: "uint256" },
      {
        internalType: "enum TroveManager.Status",
        name: "status",
        type: "uint8",
      },
      { internalType: "uint128", name: "arrayIndex", type: "uint128" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_100pct",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "activePool",
    outputs: [
      { internalType: "contract IActivePool", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
    name: "addTroveOwnerToArray",
    outputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
    name: "applyPendingRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "baseRate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "_troveArray", type: "address[]" },
    ],
    name: "batchLiquidateTroves",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "borrowerOperationsAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_price", type: "uint256" }],
    name: "checkRecoveryMode",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
    name: "closeTrove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decayBaseRateFromBorrowing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_borrower", type: "address" },
      { internalType: "uint256", name: "_collDecrease", type: "uint256" },
    ],
    name: "decreaseTroveColl",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_borrower", type: "address" },
      { internalType: "uint256", name: "_debtDecrease", type: "uint256" },
    ],
    name: "decreaseTroveDebt",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultPool",
    outputs: [
      { internalType: "contract IDefaultPool", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_LUSDDebt", type: "uint256" }],
    name: "getBorrowingFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_LUSDDebt", type: "uint256" }],
    name: "getBorrowingFeeWithDecay",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBorrowingRate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBorrowingRateWithDecay",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_borrower", type: "address" },
      { internalType: "uint256", name: "_price", type: "uint256" },
    ],
    name: "getCurrentICR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
    name: "getEntireDebtAndColl",
    outputs: [
      { internalType: "uint256", name: "debt", type: "uint256" },
      { internalType: "uint256", name: "coll", type: "uint256" },
      {
        internalType: "uint256",
        name: "pendingLUSDDebtReward",
        type: "uint256",
      },
      { internalType: "uint256", name: "pendingETHReward", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEntireSystemColl",
    outputs: [
      { internalType: "uint256", name: "entireSystemColl", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEntireSystemDebt",
    outputs: [
      { internalType: "uint256", name: "entireSystemDebt", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
    name: "getNominalICR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
    name: "getPendingETHReward",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
    name: "getPendingLUSDDebtReward",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_ETHDrawn", type: "uint256" }],
    name: "getRedemptionFeeWithDecay",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRedemptionRate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRedemptionRateWithDecay",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_price", type: "uint256" }],
    name: "getTCR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
    name: "getTroveColl",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
    name: "getTroveDebt",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_index", type: "uint256" }],
    name: "getTroveFromTroveOwnersArray",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTroveOwnersCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
    name: "getTroveStake",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
    name: "getTroveStatus",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
    name: "hasPendingRewards",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_borrower", type: "address" },
      { internalType: "uint256", name: "_collIncrease", type: "uint256" },
    ],
    name: "increaseTroveColl",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_borrower", type: "address" },
      { internalType: "uint256", name: "_debtIncrease", type: "uint256" },
    ],
    name: "increaseTroveDebt",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isOwner",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastETHError_Redistribution",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastFeeOperationTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastLUSDDebtError_Redistribution",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
    name: "liquidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_n", type: "uint256" }],
    name: "liquidateTroves",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "lqtyStaking",
    outputs: [
      { internalType: "contract ILQTYStaking", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lqtyToken",
    outputs: [
      { internalType: "contract ILQTYToken", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lusdToken",
    outputs: [
      { internalType: "contract ILUSDToken", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceFeed",
    outputs: [
      { internalType: "contract IPriceFeed", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_LUSDamount", type: "uint256" },
      {
        internalType: "address",
        name: "_firstRedemptionHint",
        type: "address",
      },
      {
        internalType: "address",
        name: "_upperPartialRedemptionHint",
        type: "address",
      },
      {
        internalType: "address",
        name: "_lowerPartialRedemptionHint",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_partialRedemptionHintNICR",
        type: "uint256",
      },
      { internalType: "uint256", name: "_maxIterations", type: "uint256" },
      { internalType: "uint256", name: "_maxFeePercentage", type: "uint256" },
    ],
    name: "redeemCollateral",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
    name: "removeStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "rewardSnapshots",
    outputs: [
      { internalType: "uint256", name: "ETH", type: "uint256" },
      { internalType: "uint256", name: "LUSDDebt", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_borrowerOperationsAddress",
        type: "address",
      },
      { internalType: "address", name: "_activePoolAddress", type: "address" },
      { internalType: "address", name: "_defaultPoolAddress", type: "address" },
      {
        internalType: "address",
        name: "_stabilityPoolAddress",
        type: "address",
      },
      { internalType: "address", name: "_gasPoolAddress", type: "address" },
      {
        internalType: "address",
        name: "_collSurplusPoolAddress",
        type: "address",
      },
      { internalType: "address", name: "_priceFeedAddress", type: "address" },
      { internalType: "address", name: "_lusdTokenAddress", type: "address" },
      {
        internalType: "address",
        name: "_sortedTrovesAddress",
        type: "address",
      },
      { internalType: "address", name: "_lqtyTokenAddress", type: "address" },
      { internalType: "address", name: "_lqtyStakingAddress", type: "address" },
    ],
    name: "setAddresses",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_borrower", type: "address" },
      { internalType: "uint256", name: "_num", type: "uint256" },
    ],
    name: "setTroveStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sortedTroves",
    outputs: [
      { internalType: "contract ISortedTroves", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stabilityPool",
    outputs: [
      { internalType: "contract IStabilityPool", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalCollateralSnapshot",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalStakes",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalStakesSnapshot",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
    name: "updateStakeAndTotalStakes",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
    name: "updateTroveRewardSnapshots",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const priceFeedABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_lastGoodPrice",
        type: "uint256",
      },
    ],
    name: "LastGoodPriceUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "fetchPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "price", type: "uint256" }],
    name: "setPrice",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const borrowerOperationsABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_activePoolAddress",
        type: "address",
      },
    ],
    name: "ActivePoolAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_collSurplusPoolAddress",
        type: "address",
      },
    ],
    name: "CollSurplusPoolAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_defaultPoolAddress",
        type: "address",
      },
    ],
    name: "DefaultPoolAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_gasPoolAddress",
        type: "address",
      },
    ],
    name: "GasPoolAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_lqtyStakingAddress",
        type: "address",
      },
    ],
    name: "LQTYStakingAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_LUSDFee",
        type: "uint256",
      },
    ],
    name: "LUSDBorrowingFeePaid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_lusdTokenAddress",
        type: "address",
      },
    ],
    name: "LUSDTokenAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_newPriceFeedAddress",
        type: "address",
      },
    ],
    name: "PriceFeedAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_sortedTrovesAddress",
        type: "address",
      },
    ],
    name: "SortedTrovesAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_stabilityPoolAddress",
        type: "address",
      },
    ],
    name: "StabilityPoolAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "arrayIndex",
        type: "uint256",
      },
    ],
    name: "TroveCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_newTroveManagerAddress",
        type: "address",
      },
    ],
    name: "TroveManagerAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_debt",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_coll",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "stake",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum BorrowerOperations.BorrowerOperation",
        name: "operation",
        type: "uint8",
      },
    ],
    name: "TroveUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "BORROWING_FEE_FLOOR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CCR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DECIMAL_PRECISION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LUSD_GAS_COMPENSATION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MCR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MIN_NET_DEBT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NAME",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PERCENT_DIVISOR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_100pct",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "activePool",
    outputs: [
      { internalType: "contract IActivePool", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_upperHint", type: "address" },
      { internalType: "address", name: "_lowerHint", type: "address" },
    ],
    name: "addColl",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_maxFeePercentage", type: "uint256" },
      { internalType: "uint256", name: "_collWithdrawal", type: "uint256" },
      { internalType: "uint256", name: "_LUSDChange", type: "uint256" },
      { internalType: "bool", name: "_isDebtIncrease", type: "bool" },
      { internalType: "address", name: "_upperHint", type: "address" },
      { internalType: "address", name: "_lowerHint", type: "address" },
    ],
    name: "adjustTrove",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimCollateral",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "closeTrove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultPool",
    outputs: [
      { internalType: "contract IDefaultPool", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_debt", type: "uint256" }],
    name: "getCompositeDebt",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getEntireSystemColl",
    outputs: [
      { internalType: "uint256", name: "entireSystemColl", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEntireSystemDebt",
    outputs: [
      { internalType: "uint256", name: "entireSystemDebt", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isOwner",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lqtyStaking",
    outputs: [
      { internalType: "contract ILQTYStaking", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lqtyStakingAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lusdToken",
    outputs: [
      { internalType: "contract ILUSDToken", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_borrower", type: "address" },
      { internalType: "address", name: "_upperHint", type: "address" },
      { internalType: "address", name: "_lowerHint", type: "address" },
    ],
    name: "moveETHGainToTrove",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_maxFeePercentage", type: "uint256" },
      { internalType: "uint256", name: "_LUSDAmount", type: "uint256" },
      { internalType: "address", name: "_upperHint", type: "address" },
      { internalType: "address", name: "_lowerHint", type: "address" },
    ],
    name: "openTrove",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceFeed",
    outputs: [
      { internalType: "contract IPriceFeed", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_LUSDAmount", type: "uint256" },
      { internalType: "address", name: "_upperHint", type: "address" },
      { internalType: "address", name: "_lowerHint", type: "address" },
    ],
    name: "repayLUSD",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_troveManagerAddress",
        type: "address",
      },
      { internalType: "address", name: "_activePoolAddress", type: "address" },
      { internalType: "address", name: "_defaultPoolAddress", type: "address" },
      {
        internalType: "address",
        name: "_stabilityPoolAddress",
        type: "address",
      },
      { internalType: "address", name: "_gasPoolAddress", type: "address" },
      {
        internalType: "address",
        name: "_collSurplusPoolAddress",
        type: "address",
      },
      { internalType: "address", name: "_priceFeedAddress", type: "address" },
      {
        internalType: "address",
        name: "_sortedTrovesAddress",
        type: "address",
      },
      { internalType: "address", name: "_lusdTokenAddress", type: "address" },
      { internalType: "address", name: "_lqtyStakingAddress", type: "address" },
    ],
    name: "setAddresses",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sortedTroves",
    outputs: [
      { internalType: "contract ISortedTroves", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "troveManager",
    outputs: [
      { internalType: "contract ITroveManager", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_collWithdrawal", type: "uint256" },
      { internalType: "address", name: "_upperHint", type: "address" },
      { internalType: "address", name: "_lowerHint", type: "address" },
    ],
    name: "withdrawColl",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_maxFeePercentage", type: "uint256" },
      { internalType: "uint256", name: "_LUSDAmount", type: "uint256" },
      { internalType: "address", name: "_upperHint", type: "address" },
      { internalType: "address", name: "_lowerHint", type: "address" },
    ],
    name: "withdrawLUSD",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const ManageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .option-wrapper {
    width: 100%;
    height: 2rem;
  }
  .option {
    height: 100%;
    border-radius: 10px;
    padding: 0 1rem 0 1rem;
  }
  .input-wrapper {
    display: flex;
    width: 100%;
    border: rgb(220, 220, 220) 1px solid;
    margin: 0.5rem;
    border-radius: 10px;
    overflow: hidden;
  }
  .token-wrapper {
    display: flex;
  }
  .token {
    padding: 0 0.5rem 0 0.5rem;
  }
  .error-message {
  }
  .confirm-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .confirm {
    border: none;
    border-radius: 1000px;
    width: 75%;
    height: 2rem;
    transition: 0.5s all;
    font-size: 1.1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    &.ok {
      background-color: #3a0ca3;
      color: white;
    }
    &.not-ok {
      background-color: #8e9aaf;
      color: white;
    }
  }
  .info-wrapper {
    margin: 2rem 0 2rem 0;
    width: 100%;
    div {
      height: 1.75rem;
      display: flex;
      align-items: center;
    }
    span {
    }
  }
  .info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #8e9aaf;
    // color: black;
  }
  .after {
    // transition: 0.5s all;
    font-weight: 500;
    margin: 0 0 0 0.5rem;
    &.ok {
      color: green;
    }
    &.not-ok {
      color: red;
    }
  }
  .current-info {
  }
  .unit {
    margin-left: 0.5rem;
    &.ok {
      color: green;
    }
    &.not-ok {
      color: red;
    }
  }
  button {
    border: none;
    transition: 0.3s all;
    &.active {
      background-color: black;
      color: white;
    }
    &.disabled {
      background-color: rgb(240, 240, 240);
      color: gray;
    }
  }
  input {
    border: none;
  }
  input:focus {
    outline: none;
  }
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

State.init({
  option: "withdraw",
  token: "ETH",
  address: null,
  check: false,
  value: "",
});
const troveManageAddress = "0x0ECDF34731eE8Dd46caa99a1AAE173beD1B32c67";
const priceFeedAddress = "0x07dD4Ce17De84bA13Fc154A7FdB46fC362a41E2C";
const borrowerOperationsAddress = "0xD69fC8928D4F3229341cb431263F1EBd87B1ade8";

// const troveManageABI = fetch(
//   "https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=0x8a4Dc4AA9fB4542Be5158C5D35E1bcC83FEE2136"
// );
// const priceFeedABI = fetch(
//   "https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=0x330804fA8DA14ec5Fe3de325ED41Aa41525b04a3"
// );

// const troveManageInterface = new ethers.utils.Interface(
//   troveManageABI.body.result
// );
// const priceFeedInterface = new ethers.utils.Interface(priceFeedABI.body.result);

const troveManageInterface = new ethers.utils.Interface(troveManageABI);
const priceFeedInterface = new ethers.utils.Interface(priceFeedABI);
const EPSILON = 2.2e-16;

const infoHandler = () => {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });

  // Price 조회
  const encodedForPrice = priceFeedInterface.encodeFunctionData("getPrice");
  Ethers.provider()
    .call({
      to: priceFeedAddress,
      data: encodedForPrice,
    })
    .then((raw) => {
      const receiverBalanceHex = priceFeedInterface.decodeFunctionResult(
        "getPrice",
        raw
      );
      const result = receiverBalanceHex[0].div("1000000000000000000");
      State.update({
        currentPrice: result.toString(),
        currentPriceRaw: receiverBalanceHex[0].toString(),
      });
    });

  // ICR 조회
  const encodedForICR = troveManageInterface.encodeFunctionData(
    "getCurrentICR",
    [state.address, state.currentPriceRaw || "2000000000000000000000"]
  );
  Ethers.provider()
    .call({
      to: troveManageAddress,
      data: encodedForICR,
    })
    .then((raw) => {
      const receiverBalanceHex = troveManageInterface.decodeFunctionResult(
        "getCurrentICR",
        raw
      );
      const result = receiverBalanceHex[0].div("1000000000000000000");
      State.update({ currentICR: result.toString() });
    });

  // Collateral 조회
  const encodedForColl = troveManageInterface.encodeFunctionData(
    "getTroveColl",
    [state.address]
  );
  Ethers.provider()
    .call({
      to: troveManageAddress,
      data: encodedForColl,
    })
    .then((raw) => {
      const receiverBalanceHex = troveManageInterface.decodeFunctionResult(
        "getTroveColl",
        raw
      );
      State.update({
        currentColl: ethers.utils
          .formatEther(receiverBalanceHex[0].toString())
          .toString(),
      });
    });

  // debt 조회
  const encodedForDebt = troveManageInterface.encodeFunctionData(
    "getTroveDebt",
    [state.address]
  );
  Ethers.provider()
    .call({
      to: troveManageAddress,
      data: encodedForDebt,
    })
    .then((raw) => {
      const receiverBalanceHex = troveManageInterface.decodeFunctionResult(
        "getTroveDebt",
        raw
      );
      const result = receiverBalanceHex[0].div("1000000000000000000");
      State.update({ currentDebt: result.toString() });
    });
};

if (Ethers.provider()) {
  const signer = Ethers.provider().getSigner();
  signer.getAddress().then((address) => {
    State.update({ address });
  });

  state.address && infoHandler();
}

const checkFunc = () => {
  // Ratio 1.1 이상일 것
  // Debt 가 2000 이상일 것
  if (!state.value) {
    State.update({ check: false });
    return;
  }
  if (state.updatedICR < 1.1) {
    State.update({ check: false });
    return;
  }
  if (state.updatedDebt < 2000) {
    State.update({ check: false });
    return;
  }
  State.update({ check: true });
};

const changeHandler = (e) => {
  const value = e.target.value;
  State.update({ value: e.target.value === 0 ? "" : e.target.value });
  // deposit-ETH
  if (state.option === "deposit" && state.token === "ETH") {
    State.update({
      updatedColl: Number(state.currentColl) + Number(value),
      updatedICR:
        e.target.value === ""
          ? null
          : Math.round(
              (((Number(state.currentColl) + Number(value)) /
                Number(state.currentDebt)) *
                Number(state.currentPrice) +
                EPSILON) *
                100
            ) / 100,
    });
  }
  // withdraw-ETH
  else if (state.option === "withdraw" && state.token === "ETH") {
    State.update({
      updatedColl: Number(state.currentColl) - Number(value),
      updatedICR:
        e.target.value === ""
          ? null
          : Math.round(
              (((Number(state.currentColl) - Number(value)) /
                Number(state.currentDebt)) *
                Number(state.currentPrice) +
                EPSILON) *
                100
            ) / 100,
    });
  }
  // deposit-LUSD
  else if (state.option === "deposit" && state.token === "LUSD") {
    State.update({
      updatedDebt: Number(state.currentDebt) - Number(value),
      updatedICR:
        e.target.value === ""
          ? null
          : Math.round(
              ((Number(state.currentColl) /
                (Number(state.currentDebt) - Number(value))) *
                Number(state.currentPrice) +
                EPSILON) *
                100
            ) / 100,
    });
  }
  // withdraw-LUSD
  else if (state.option === "withdraw" && state.token === "LUSD") {
    State.update({
      updatedDebt: Number(state.currentDebt) + Number(value),
      updatedICR:
        e.target.value === ""
          ? null
          : Math.round(
              ((Number(state.currentColl) /
                (Number(state.currentDebt) + Number(value))) *
                Number(state.currentPrice) +
                EPSILON) *
                100
            ) / 100,
    });
  }
  checkFunc();
};

const optionHandler = (option) => {
  State.update({ option: option });
  changeHandler({ target: { value: Number(state.value) } });
};

const tokenHandler = (token) => {
  State.update({ token: token });
  changeHandler({ target: { value: Number(state.value) } });
};

const confirmHandler = () => {
  if (!state.check) {
    return;
  }
  const borrowerOperationsContract = new ethers.Contract(
    borrowerOperationsAddress,
    borrowerOperationsABI,
    Ethers.provider().getSigner()
  );
  const amount = ethers.utils.parseUnits(state.value, "ether").toString();

  if (state.option === "deposit" && state.token === "ETH") {
    borrowerOperationsContract
      .addColl(state.address, state.address, { value: amount })
      .then((transactionHash) => {
        State.update({ loading: true, hash: transactionHash.hash });
        console.log(transactionHash.hash);
      });
  } else if (state.option === "withdraw" && state.token === "ETH") {
    borrowerOperationsContract
      .withdrawColl(amount.toString(), state.address, state.address)
      .then((transactionHash) => {
        State.update({ loading: true, hash: transactionHash.hash });
        console.log(transactionHash.hash);
      });
  } else if (state.option === "deposit" && state.token === "LUSD") {
    borrowerOperationsContract
      .repayLUSD(amount.toString(), state.address, state.address)
      .then((transactionHash) => {
        State.update({ loading: true, hash: transactionHash.hash });
        console.log(transactionHash.hash);
      });
  } else if (state.option === "withdraw" && state.token === "LUSD") {
    borrowerOperationsContract
      .withdrawLUSD(
        "5000000000000000",
        amount.toString(),
        state.address,
        state.address
      )
      .then((transactionHash) => {
        State.update({ loading: true, hash: transactionHash.hash });
        console.log(transactionHash.hash);
      });
  }
};

Ethers.provider() &&
  Ethers.provider()
    .waitForTransaction(state.hash)
    .then((res) => {
      State.update({ loading: false, value: "" });
      infoHandler();
    })
    .catch((err) => {
      console.log(err);
      State.update({ loading: false });
    });

return (
  <ManageWrapper>
    <div className="option-wrapper">
      <button
        className={`option ${
          state.option === "deposit" ? "active" : "disabled"
        }`}
        onClick={() => {
          optionHandler("deposit");
        }}
      >
        deposit
      </button>
      <button
        className={`option ${
          state.option === "withdraw" ? "active" : "disabled"
        }`}
        onClick={() => {
          optionHandler("withdraw");
        }}
      >
        withdraw
      </button>
    </div>
    <div className="input-wrapper">
      <input
        type="number"
        placeholder={state.token === "ETH" ? "0.0000 ETH" : "0.0000 LUSD"}
        onChange={changeHandler}
        value={state.value}
      ></input>
      <div className={`token-wrapper`}>
        <button
          onClick={() => {
            tokenHandler("ETH");
          }}
          className={`token ${state.token === "ETH" ? "active" : "disabled"}`}
        >
          ETH
        </button>
        <button
          onClick={() => {
            tokenHandler("LUSD");
          }}
          className={`token ${state.token === "LUSD" ? "active" : "disabled"}`}
        >
          LUSD
        </button>
      </div>
    </div>
    <div className="info-wrapper">
      <div className="info">
        <div>Your Collateral Ratio</div>
        <div>
          <span className="current-info">
            {!isNaN(
              (((Number(state.currentColl) / Number(state.currentDebt)) *
                Number(state.currentPrice) +
                EPSILON) *
                100) /
                100
            )
              ? Math.round(
                  ((Number(state.currentColl) / Number(state.currentDebt)) *
                    Number(state.currentPrice) +
                    EPSILON) *
                    100
                ) / 100
              : "-"}
          </span>
          {state.updatedICR &&
            Number(state.updatedICR) !==
              Number(
                Math.round(
                  ((Number(state.currentColl) / Number(state.currentDebt)) *
                    Number(state.currentPrice) +
                    EPSILON) *
                    100
                ) / 100
              ) &&
            state.updatedICR && (
              <span
                className={`after ${state.updatedICR >= 1.1 ? "ok" : "not-ok"}`}
              >{`=> ${state.updatedICR}`}</span>
            )}
        </div>
      </div>
      <div className="info">
        <div>Your Collateral</div>
        <div>
          <span className="current-info">{state.currentColl}</span>
          {state.updatedColl &&
            Number(state.updatedColl) !== Number(state.currentColl) && (
              <span
                className={`after ${state.updatedColl > 0 ? "ok" : "not-ok"}`}
              >{`=> ${state.updatedColl}`}</span>
            )}
          <span className={`unit`}>ETH</span>
        </div>
      </div>
      <div className="info">
        <div>Your Debt</div>
        <div>
          <span className="current-info">{state.currentDebt}</span>
          {state.updatedDebt &&
            state.updatedDebt.toString() !== state.currentDebt.toString() &&
            state.updatedDebt > 0 && (
              <span
                className={`after ${
                  state.updatedDebt >= 2000 ? "ok" : "not-ok"
                }`}
              >{`=> ${state.updatedDebt}`}</span>
            )}
          <span className={`unit`}>LUSD</span>
        </div>
      </div>
      <div className="info">
        <div>Ethereum Price</div>
        <div>
          <span className="current-info">{state.currentPrice}</span>
          <span className={`unit`}>$</span>
        </div>
      </div>
    </div>
    <div className="confirm-wrapper" onClick={confirmHandler}>
      {state.address ? (
        <button className={`confirm ${state.check ? "ok" : "not-ok"}`}>
          {state.chainId !== 11155111
            ? "Change network to Sepolia"
            : state.check
            ? `Confirm ${state.option}`
            : !state.value
            ? "Enter input value"
            : "Check stats"}
        </button>
      ) : (
        <Web3Connect className={`connect-wallet`} />
      )}
    </div>
  </ManageWrapper>
);
