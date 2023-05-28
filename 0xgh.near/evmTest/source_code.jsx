const address = "0x5A6722e9EE2d298a4E83e420759CaBBbd58aB1d9";
const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
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
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "subtractedValue", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "addedValue", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const WrapperStyle = styled.div`
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  p {
    margin: 0;
  }
  .indicator {
    padding: 0 2rem 0 2rem;
    width: 100%;
  }
  .mint {
    padding: 0 2rem 0 2rem;
    margin: 0 0 2rem 0;
    width: 100%;
    display: flex;
    align-items: center;
    input {
      height: 2rem;
      border: none;
      border-bottom: 1px solid #8338ec;
      outline: none;
    }
  }
  .section {
    display: flex;
    align-items: center;
    width: 100%;
    height: 3rem;
  }
  .label {
    font-size: 1.2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    padding: 0 1rem 0 0;
    color: #8338ec;
  }
  .value {
    font-size: 1.2rem;
  }

  .get-mung {
    color: #8338ec;
    border: 2px #8338ec solid;
    background-color: transparent;
    border-radius: 10px;
    font-size: 1.2rem;
    font-weight: bold;
    width: 12rem;
    height: 2.5rem;
    transition: all 0.3s;
    margin-bottom: 2rem;
    &:hover {
      background-color: #8338ec;
      color: white;
    }
    &.disabled {
      border-color: gray !important;
      color: gray;
      cursor: default;
      &:hover {
        background-color: transparent;
        color: gray;
      }
    }
    &.loading {
      @keyframes change {
        0% {
          color: #8338ec;
        }
        50% {
          color: #f72585;
        }
        100% {
          color: #8338ec;
        }
      }
      animation-duration: 1.5s;
      animation-name: change;
      animation-iteration-count: infinite;
    }
  }
`;

// const signer = Ethers.provider().getSigner();
const mungInterface = new ethers.utils.Interface(abi);
const user = Ethers.send("eth_requestAccounts", [])[0];

const getBalance = () => {
  const encodedData = mungInterface.encodeFunctionData("balanceOf", [state.address || user]);

  Ethers.provider()
    .call({
      to: address,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = mungInterface.decodeFunctionResult("balanceOf", rawBalance);
      const result = receiverBalanceHex[0].div("1000000000000000000");
      State.update({ balance: result.toString() });
    });
};

const getMung = () => {
  if (!state.mintMungInput || state.loading) {
    return;
  }
  const mungContract = new ethers.Contract(address, abi, Ethers.provider().getSigner());
  const amount = ethers.BigNumber.from(state.mintMungInput).mul("1000000000000000000").toString();

  mungContract.mint(state.address, amount).then((transactionHash) => {
    State.update({
      mintMungInput: "",
      hash: transactionHash.hash,
      loading: true,
    });
    console.log(transactionHash);
  });
};

if (Ethers.provider()) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });

  const signer = Ethers.provider().getSigner();
  signer.getAddress().then((address) => {
    State.update({ address });
  });

  getBalance();
}

Ethers.provider() &&
  Ethers.provider()
    .waitForTransaction(state.hash)
    .then((res) => {
      console.log(res);
      State.update({ loading: false });
      getBalance();
    });

return (
  <WrapperStyle>
    <div className="content">
      <div className="indicator">
        <div className="section">
          {state.address ? (
            <>
              <p className="label">Wallet: </p>
              <p className="value">{state.address}</p>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="section">
          {state.address && state.chainId === 11155111 ? (
            <>
              <p className="label">Balance: </p>
              <p className="value mung-balance">{state.balance} Mung</p>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="mint">
        <div className="section">
          {state.address && state.chainId === 11155111 ? (
            <>
              <p className="label">Mint: </p>
              <input
                className="mint-mung-input"
                onChange={(e) => {
                  State.update({ mintMungInput: e.target.value });
                }}
                value={state.mintMungInput}
              ></input>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      {state.address ? (
        state.chainId === 11155111 ? (
          <>
            <button className={`get-mung ${state.mintMungInput || state.loading ? "" : "disabled"} ${state.loading ? "loading" : ""}`} onClick={getMung}>
              {state.loading ? "Loading..." : "Mung 토큰 받기"}
            </button>
            <p>Mung Contract</p>
            <p>0x5A6722e9EE2d298a4E83e420759CaBBbd58aB1d9</p>
          </>
        ) : (
          <div>
            <div>Network를 Sepolia Testnet으로 바꿔주세요.</div>
            <a href="https://chainlist.org/chain/11155111" target="_blank">
              https://chainlist.org/chain/11155111
            </a>
          </div>
        )
      ) : (
        <Web3Connect />
      )}
    </div>
  </WrapperStyle>
);
