const sender = Ethers.send("eth_requestAccounts", [])[0];
// NOTE: Switching account in MetaMask doesn't update the sender.
if (!sender) return <Web3Connect connectLabel="Connect Web3 Wallet" />;

const networks = ["ethereum", "aurora"];
const testnetChainIds = {
  ethereum: 5,
  aurora: 1313161555,
};
const testnetNetworkNames = {
  ethereum: "Goerli Testnet",
  aurora: "Aurora Testnet",
};
const mainnetChainIds = {
  ethereum: 1,
  aurora: 1313161554,
};
const mainnetNetworkNames = {
  ethereum: "Ethereum Mainnet",
  aurora: "Aurora Mainnet",
};
const testnetConfig = {
  etherCustodianAddress: "0x84a82Bb39c83989D5Dc07e1310281923D2544dC2",
};
const mainnetConfig = {
  etherCustodianAddress: "0x6BFaD42cFC4EfC96f529D786D643Ff4A8B89FA52",
};
const tokens = {
  ETH: {
    symbol: "ETH",
    name: "Ethereum",
    ethereumAddress: undefined,
    nearAddress: "aurora",
    auroraAddress: undefined,
    decimals: 18,
    origin: "ethereum",
  },
  /*
  FAU: {
    symbol: "FAU",
    name: "FaucetToken",
    ethereumAddress: "0xba62bcfcaafc6622853cca2be6ac7d845bc0f2dc",
    nearAddress:
      "ba62bcfcaafc6622853cca2be6ac7d845bc0f2dc.factory.goerli.testnet",
    auroraAddress: "0xf93cd0e464f74c240d8ebb7ed55ce6b43452f913",
    decimals: 18,
    origin: "ethereum",
  },
  */
};

// Get balance on network switch.
const fetchBalance = (tokenSymbol) => {
  const tokenAddress = tokens[tokenSymbol][`${state.sourceNetwork}Address`];
  if (tokenAddress?.length) {
    // erc-20
    const erc20 = new ethers.Contract(
      tokenAddress,
      ["function balanceOf(address) view returns (uint)"],
      Ethers.provider()
    );
    erc20.balanceOf(sender).then((balance) => {
      State.update({
        senderBalance: ethers.BigNumber.from(balance),
        tokenSymbol,
      });
    });
  } else if (tokenAddress === undefined) {
    Ethers.provider()
      .getBalance(sender)
      .then((balance) => {
        State.update({
          senderBalance: ethers.BigNumber.from(balance),
          tokenSymbol,
        });
      });
  } else {
    // Token address = null: not bridged on this network.
    State.update({ senderBalance: ethers.BigNumber.from(0), tokenSymbol });
  }
};

const bridgeTokens = () => {
  if (state.sourceNetwork !== "ethereum" || state.tokenSymbol !== "ETH") {
    console.log("Coming soon...");
    return;
  }
  const ethTokenLocker = new ethers.Contract(
    state.config.etherCustodianAddress,
    // NOTE: for some reason human readable abi gives
    // Eror: Not a function call expression
    // when calling the contract.
    //["function depositToEvm(string,uint256) payable"],
    [
      {
        inputs: [
          {
            internalType: "string",
            name: "ethRecipientOnNear",
            type: "string",
          },
          { internalType: "uint256", name: "fee", type: "uint256" },
        ],
        name: "depositToEVM",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    Ethers.provider().getSigner()
  );
  ethTokenLocker
    .depositToEVM(sender.slice(2).toLowerCase(), 0, {
      value: state.bigNumberAmount,
    })
    .then((tx) => {
      console.log(tx);
      State.update({ lastTxHash: tx.hash });
      tx.wait().then((receipt) => {
        console.log(receipt);
        // TODO sync Recent transfers after 10s
        State.update({ lastTxHash: null });
      });
    });
};

initState({
  tokenSymbol: null,
  sourceTokenBalance: ethers.BigNumber.from(0),
  senderBalance: ethers.BigNumber.from(0),
  amount: "",
  bigNumberAmount: ethers.BigNumber.from(0),
  sourceNetwork: "ethereum",
  destinationNetwork: "aurora",
  initialized: false,
  lastTxHash: null,
});

Ethers.provider()
  .getNetwork()
  .then((network) => {
    if (!state.initialized) {
      // Choose testnet or mainnet config depending on connected network.
      const walletChainId = network.chainId;
      const isTestnet =
        walletChainId === testnetChainIds.aurora ||
        walletChainId === testnetChainIds.ethereum;
      // Set the bridge direction on network switch:
      // bos.gg doesn't keep the component state on wallet network switch !
      const sourceNetwork =
        testnetChainIds.ethereum === walletChainId ||
        mainnetChainIds.ethereum === walletChainId
          ? "ethereum"
          : "aurora";
      State.update({
        walletChainId: network.chainId,
        chainIds: isTestnet ? testnetChainIds : mainnetChainIds,
        networkNames: isTestnet ? testnetNetworkNames : mainnetNetworkNames,
        config: isTestnet ? testnetConfig : mainnetConfig,
        isTestnet,
        sourceNetwork,
        destinationNetwork:
          sourceNetwork === "ethereum" ? "aurora" : "ethereum",
        initialized: true,
      });
    }
  });

const wrongWalletNetwork =
  state.walletChainId !== state.chainIds[state.sourceNetwork];
if (wrongWalletNetwork) {
  // Reset selection
  State.update({
    tokenSymbol: null,
    amount: "",
    senderBalance: ethers.BigNumber.from(0),
    bigNumberAmount: ethers.BigNumber.from(0),
  });
}
if (!state.initialized) return <></>;
return (
  <>
    <h2>
      {" "}
      🌈 {state.isTestnet
        ? "Testnet Rainbow Bridge"
        : "Rainbow Bridge (alpha)"}{" "}
      🌈{" "}
    </h2>
    <div class="mb-3">
      <label for="selectSourceNetwork">Select Source Network</label>
      <select
        class="form-select"
        id="selectSourceNetwork"
        onChange={(e) => {
          State.update({ sourceNetwork: e.target.value });
          if (state.destinationNetwork === e.target.value) {
            State.update({
              destinationNetwork: networks.find(
                (network) => network !== e.target.value
              ),
            });
          }
        }}
      >
        <option selected={state.sourceNetwork === "aurora"} value={"aurora"}>
          {state.networkNames.aurora}
        </option>
        <option
          selected={state.sourceNetwork === "ethereum"}
          value={"ethereum"}
        >
          {state.networkNames.ethereum}
        </option>
      </select>
      {state.walletChainId !== state.chainIds[state.sourceNetwork] && (
        <p>
          Connect your wallet network to{" "}
          {state.networkNames[state.sourceNetwork]}
        </p>
      )}
    </div>

    <div class="mb-3">
      <label for="selectToken">Select token</label>
      <select
        class="form-select"
        id="selectToken"
        disabled={wrongWalletNetwork}
        onChange={(e) => {
          if (e.target.value === "...") {
            State.update({
              tokenSymbol: null,
              amount: "",
              bigNumberAmount: ethers.BigNumber.from(0),
            });
            return;
          }
          State.update({
            tokenSymbol: e.target.value,
          });
          fetchBalance(e.target.value);
        }}
      >
        <option selected={state.tokenSymbol === null} value={null}>
          ...
        </option>
        {Object.keys(tokens).map((symbol) => (
          <option value={symbol}>{symbol}</option>
        ))}
      </select>
    </div>
    <div class="mb-3">
      <label for="amount" class="form-label">
        Enter the amount
      </label>
      <input
        value={state.amount}
        class="form-control"
        id="amount"
        disabled={wrongWalletNetwork || !state.tokenSymbol}
        placeholder=""
        onChange={(e) => {
          const bigNumberAmount = ethers.utils.parseUnits(
            e.target.value !== "" ? e.target.value : "0",
            tokens[state.tokenSymbol].decimals
          );
          State.update({ amount: e.target.value, bigNumberAmount });
        }}
      />
      {state.tokenSymbol && (
        <div>
          Balance:{" "}
          {ethers.utils.formatUnits(
            state.senderBalance,
            tokens[state.tokenSymbol].decimals
          )}{" "}
          {state.tokenSymbol}
        </div>
      )}
    </div>

    <div class="mb-3">
      <label for="selectDestinationNetwork">Select Destination Network</label>
      <select
        class="form-select"
        id="selectDestinationNetwork"
        onChange={(e) => {
          State.update({ destinationNetwork: e.target.value });
          if (state.sourceNetwork === e.target.value) {
            State.update({
              sourceNetwork: networks.find(
                (network) => network !== e.target.value
              ),
            });
          }
        }}
      >
        <option
          selected={state.destinationNetwork === "aurora"}
          value={"aurora"}
        >
          {state.networkNames.aurora}
        </option>
        <option
          selected={state.destinationNetwork === "ethereum"}
          value={"ethereum"}
        >
          {state.networkNames.ethereum}
        </option>
      </select>
    </div>

    <div class="mb-3">
      <button
        disabled={
          !state.tokenSymbol ||
          state.bigNumberAmount.isZero() ||
          state.senderBalance.lt(state.bigNumberAmount)
        }
        onClick={bridgeTokens}
      >
        Bridge tokens
      </button>
    </div>
    <p class="">
      NOTE: Please make sure that your wallet is compatible with the Destination
      Network before sending tokens. Visit rainbowbridge.app.
    </p>
    {state.lastTxHash && (
      <div>{`Pending transaction: ${state.lastTxHash}`}</div>
    )}
    <h3> Recent transfers </h3>
  </>
);
