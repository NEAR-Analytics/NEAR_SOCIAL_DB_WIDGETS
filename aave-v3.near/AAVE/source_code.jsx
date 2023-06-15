const ROUND_DOWN = 0;
const CONTRACT_ABI = {
  wrappedTokenGatewayV3ABI:
    "https://raw.githubusercontent.com/corndao/aave-v3-bos-app/main/abi/WrappedTokenGatewayV3ABI.json",
  erc20Abi:
    "https://raw.githubusercontent.com/corndao/aave-v3-bos-app/main/abi/ERC20Permit.json",
  aavePoolV3ABI:
    "https://raw.githubusercontent.com/corndao/aave-v3-bos-app/main/abi/AAVEPoolV3.json",
};
const DEFAULT_CHAIN_ID = 1442;
const ETH_TOKEN = { name: "Ethereum", symbol: "ETH", decimals: 18 };
const MATIC_TOKEN = { name: "Matic", symbol: "MATIC", decimals: 18 };

// Get AAVE network config by chain id
function getNetworkConfig(chainId) {
  const abis = {
    wrappedTokenGatewayV3ABI: fetch(CONTRACT_ABI.wrappedTokenGatewayV3ABI),
    erc20Abi: fetch(CONTRACT_ABI.erc20Abi),
    aavePoolV3ABI: fetch(CONTRACT_ABI.aavePoolV3ABI),
  };

  switch (chainId) {
    case 1: // ethereum mainnet
      return {
        chainName: "Ethereum Mainnet",
        nativeCurrency: ETH_TOKEN,
        rpcUrl: "https://rpc.ankr.com/eth",
        aavePoolV3Address: "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
        wrappedTokenGatewayV3Address:
          "0xD322A49006FC828F9B5B37Ab215F99B4E5caB19C",
        ...abis,
      };
    case 42161: // arbitrum one
      return {
        chainName: "Arbitrum Mainnet",
        nativeCurrency: ETH_TOKEN,
        rpcUrl: "https://arb1.arbitrum.io/rpc",
        aavePoolV3Address: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
        wrappedTokenGatewayV3Address:
          "0xB5Ee21786D28c5Ba61661550879475976B707099",
        ...abis,
      };
    case 137: // polygon mainnet
      return {
        chainName: "Polygon Mainnet",
        nativeCurrency: MATIC_TOKEN,
        rpcUrl: "https://rpc.ankr.com/polygon",
        aavePoolV3Address: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
        wrappedTokenGatewayV3Address:
          "0x1e4b7A6b903680eab0c5dAbcb8fD429cD2a9598c",
        ...abis,
      };
    case 1442: // zkevm testnet
      return {
        chainName: "Polygon zkEVM Testnet",
        nativeCurrency: ETH_TOKEN,
        rpcUrl: "https://rpc.public.zkevm-test.net",
        aavePoolV3Address: "0x4412c92f6579D9FC542D108382c8D1d6D2Be63d9",
        wrappedTokenGatewayV3Address:
          "0xD82940E16D25aB1349914e1C369eF1b287d457BF",
        ...abis,
      };
    default:
      throw new Error("unknown chain id");
  }
}

function switchEthereumChain(chainId) {
  const chainIdHex = `0x${chainId.toString(16)}`;
  const res = Ethers.send("wallet_switchEthereumChain", [
    { chainId: chainIdHex },
  ]);
  // If `res` === `undefined`, it means switch chain failed, which is very weird but it works.
  // If `res` is `null` the function is either not called or executed successfully.
  if (res === undefined) {
    console.log(
      `Failed to switch chain to ${chainId}. Add the chain to wallet`
    );
    const config = getNetworkConfig(chainId);
    Ethers.send("wallet_addEthereumChain", [
      {
        chainId: chainIdHex,
        chainName: config.chainName,
        nativeCurrency: config.nativeCurrency,
        rpcUrls: [config.rpcUrl],
      },
    ]);
  }
}

if (
  state.chainId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((data) => {
      const chainId = data?.chainId;
      if (chainId && chainId === DEFAULT_CHAIN_ID) {
        State.update({ chainId });
      } else {
        switchEthereumChain(DEFAULT_CHAIN_ID);
      }
    });
}

function isValid(a) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === "") return false;
  return true;
}

// interface Market {
//   id: string,
//   underlyingAsset: string,
//   name: string,
//   symbol: string,
//   decimals: number,
// }
// returns Market[]
function getMarkets(chainId) {
  return asyncFetch(`https://aave-api.pages.dev/${chainId}/markets`);
}

/**
 * @param {string} account user address
 * @param {string[]} tokens list of token addresses
 */
// interface TokenBalance {
//   token: string,
//   balance: string,
//   decimals: number,
// }
// returns TokenBalance[]
function getUserBalances(chainId, account, tokens) {
  const url = `https://aave-api.pages.dev/${chainId}/balances?account=${account}&tokens=${tokens.join(
    "|"
  )}`;
  return asyncFetch(url);
}

// interface UserDeposit {
//   underlyingAsset: string,
//   name: string,
//   symbol: string,
//   scaledATokenBalance: string,
//   usageAsCollateralEnabledOnUser: boolean,
//   underlyingBalance: string,
//   underlyingBalanceUSD: string,
// }
// returns UserDeposit[]
function getUserDeposits(chainId, address) {
  return asyncFetch(
    `https://aave-api.pages.dev/${chainId}/deposits/${address}`
  );
}

// App config
function getConfig(network) {
  const chainId = state.chainId;
  switch (network) {
    case "mainnet":
      return {
        ownerId: "aave-v3.near",
        nodeUrl: "https://rpc.mainnet.near.org",
        ipfsPrefix: "https://ipfs.near.social/ipfs",
        ...(chainId ? getNetworkConfig(chainId) : {}),
      };
    case "testnet":
      return {
        ownerId: "aave-v3.testnet",
        nodeUrl: "https://rpc.testnet.near.org",
        ipfsPrefix: "https://ipfs.near.social/ipfs",
        ...(chainId ? getNetworkConfig(chainId) : {}),
      };
    default:
      throw Error(`Unconfigured environment '${network}'.`);
  }
}
const config = getConfig(context.networkId);

// App states
State.init({
  imports: {},
  chainId: undefined,
  showWithdrawModal: false,
  showSupplyModal: false,
  walletConnected: false,
  assetsToSupply: undefined,
  yourSupplies: undefined,
  address: undefined,
  ethBalance: undefined,
});

const loading = !state.assetsToSupply || !state.yourSupplies;

// Import functions to state.imports
function importFunctions(imports) {
  if (loading) {
    State.update({
      imports,
    });
  }
}

// Define the modules you'd like to import
const modules = {
  number: `${config.ownerId}/widget/Utils.Number`,
  date: `${config.ownerId}/widget/Utils.Date`,
  data: `${config.ownerId}/widget/AAVE.Data`,
};
// Import functions
// const { formatAmount } = state.imports.number;
// const { formatDateTime } = state.imports.date;

function checkProvider() {
  const provider = Ethers.provider();
  if (provider) {
    State.update({ walletConnected: true });
  } else {
    State.update({ walletConnected: false });
  }
}

// update data in async manner
function updateData() {
  const provider = Ethers.provider();
  if (!provider) {
    return;
  }
  provider
    .getSigner()
    ?.getAddress()
    ?.then((address) => {
      State.update({ address });
    });
  provider
    .getSigner()
    ?.getBalance()
    .then((balance) => State.update({ ethBalance: balance }));
  if (!state.address || !state.ethBalance) {
    return;
  }

  const prevYourSupplies = state.yourSupplies;

  getMarkets(state.chainId).then((marketsResponse) => {
    if (!marketsResponse) {
      return;
    }
    const markets = JSON.parse(marketsResponse.body);

    // get user balances
    getUserBalances(
      state.chainId,
      state.address,
      markets.map((market) => market.underlyingAsset)
    ).then((userBalancesResponse) => {
      if (!userBalancesResponse) {
        return;
      }
      const userBalances = JSON.parse(userBalancesResponse.body);
      const assetsToSupply = markets.map((market, idx) => {
        if (!isValid(userBalances[idx].decimals)) {
          return;
        }
        const balanceRaw = Big(
          market.symbol === "WETH"
            ? state.ethBalance
            : userBalances[idx].balance
        ).div(Big(10).pow(userBalances[idx].decimals));
        const balance = balanceRaw.toFixed(7, ROUND_DOWN);
        const balanceInUSD = balanceRaw
          .mul(market.marketReferencePriceInUsd)
          .toFixed(3, ROUND_DOWN);
        return {
          ...userBalances[idx],
          ...market,
          balance,
          balanceInUSD,
          ...(market.symbol === "WETH"
            ? {
                symbol: "ETH",
                name: "Ethereum",
              }
            : {}),
        };
      });

      State.update({
        assetsToSupply,
      });
    });

    // get user supplies
    getUserDeposits(state.chainId, state.address).then(
      (userDepositsResponse) => {
        if (!userDepositsResponse) {
          return;
        }
        const userDeposits = JSON.parse(userDepositsResponse.body).filter(
          (row) => Number(row.underlyingBalance) !== 0
        );
        const marketsMapping = markets.reduce((prev, cur) => {
          prev[cur.symbol] = cur;
          return prev;
        }, {});
        const yourSupplies = userDeposits.map((userDeposit) => {
          const market = marketsMapping[userDeposit.symbol];
          return {
            ...market,
            ...userDeposit,
            ...(market.symbol === "WETH"
              ? {
                  symbol: "ETH",
                  name: "Ethereum",
                }
              : {}),
          };
        });

        State.update({
          yourSupplies,
        });

        if (JSON.stringify(prevYourSupplies) === JSON.stringify(yourSupplies)) {
          console.log("refresh again ...", prevYourSupplies, yourSupplies);
          setTimeout(updateData, 500);
        }
      }
    );
  });
}

function onActionSuccess({ msg, callback }) {
  // update data if action finishes
  updateData();
  // update UI after data has almost loaded
  setTimeout(() => {
    if (callback) {
      callback();
    }
    if (msg) {
      State.update({ alertModalText: msg });
    }
  }, 5000);
}

checkProvider();
if (state.walletConnected && state.chainId && loading) {
  updateData();
}

const Body = styled.div`
  padding: 24px 15px;
  background: #0e0e26;
  min-height: 100vh;
  color: white;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
// Component body
const body = loading ? (
  <>
    <Widget src={`${config.ownerId}/widget/AAVE.Header`} props={{ config }} />
    <Body>
      {state.walletConnected
        ? state.chainId === DEFAULT_CHAIN_ID
          ? "Loading..."
          : `Please switch network to ${
              getNetworkConfig(DEFAULT_CHAIN_ID).chainName
            }`
        : "Need to connect wallet first."}
    </Body>
  </>
) : (
  <>
    <Widget src={`${config.ownerId}/widget/AAVE.Header`} props={{ config }} />
    <Body>
      <FlexContainer>
        <Widget
          src={`${config.ownerId}/widget/AAVE.NetworkSwitcher`}
          props={{
            chainId: state.chainId,
            config,
            switchNetwork: (chainId) => {
              switchEthereumChain(chainId);
            },
            disabled: true,
          }}
        />
      </FlexContainer>
      <Widget
        src={`${config.ownerId}/widget/AAVE.TabSwitcher`}
        props={{ config }}
      />
      <Widget
        src={`${config.ownerId}/widget/AAVE.Card.YourSupplies`}
        props={{
          config,
          yourSupplies: state.yourSupplies,
          showWithdrawModal: state.showWithdrawModal,
          setShowWithdrawModal: (isShow) =>
            State.update({ showWithdrawModal: isShow }),
          onActionSuccess,
        }}
      />
      <Widget
        src={`${config.ownerId}/widget/AAVE.Card.AssetsToSupply`}
        props={{
          config,
          chainId: state.chainId,
          assetsToSupply: state.assetsToSupply,
          showSupplyModal: state.showSupplyModal,
          setShowSupplyModal: (isShow) =>
            State.update({ showSupplyModal: isShow }),
          onActionSuccess,
        }}
      />
      {state.alertModalText && (
        <Widget
          src={`${config.ownerId}/widget/AAVE.Modal.AlertModal`}
          props={{
            config,
            title: "All done!",
            description: state.alertModalText,
            onRequestClose: () => State.update({ alertModalText: false }),
          }}
        />
      )}
    </Body>
  </>
);

return (
  <div>
    {/* Component Head */}
    <Widget
      src={`${config.ownerId}/widget/Utils.Import`}
      props={{ modules, onLoad: importFunctions }}
    />
    {/* Component Body */}
    {body}
  </div>
);
