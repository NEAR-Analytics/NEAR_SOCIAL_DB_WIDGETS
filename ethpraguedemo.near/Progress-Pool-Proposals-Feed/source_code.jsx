if (
  state.chainId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}

let updateFlag = false;
const toggleUpdateFlag = () => {
  if (state.pulled_proposals) {
    updateFlag = !updateFlag;
    console.log("rerender should happen ", state.pulled_proposals);
  }
};

const proposalContract = "0x6daA072A660814fa3c96961dfa11eee8A39a74b3";

const proposalAbi = [
  {
    inputs: [
      { internalType: "uint256", name: "_hackathonEndTime", type: "uint256" },
      { internalType: "address", name: "_votingTokenAddress", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "not_in_proposalPeriod", type: "error" },
  { inputs: [], name: "not_in_votingPeriod", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "ProposalSubmitted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "proposalOwner",
        type: "address",
      },
      { indexed: false, internalType: "uint8", name: "accept", type: "uint8" },
    ],
    name: "VoteCasted",
    type: "event",
  },
  {
    inputs: [],
    name: "SUBMISSION_PERIOD",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRANSITION_PERIOD",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VOTING_PERIOD",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "proposalIndex", type: "uint256" },
          { internalType: "uint8", name: "decision", type: "uint8" },
        ],
        internalType: "structProposalVoting.Vote[]",
        name: "_votes",
        type: "tuple[]",
      },
    ],
    name: "castVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "castedVotes",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hackathonEndTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "proposals",
    outputs: [
      { internalType: "string", name: "description", type: "string" },
      { internalType: "address", name: "proposalOwner", type: "address" },
      { internalType: "uint256", name: "votes", type: "uint256" },
      { internalType: "bool", name: "accepted", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proposalsCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_description", type: "string" }],
    name: "submitProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "votingToken",
    outputs: [{ internalType: "contractIERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}

if (state.proposalNumber !== undefined && state.proposalNumber > 0) {
  if (!state.proposalChecked) {
    console.log("Calling props contract");
    const proposals = new ethers.Contract(
      proposalContract,
      proposalAbi,
      Ethers.provider().getSigner()
    );
    for (let num = 0; num < state.proposalNumber; num++) {
      proposals.proposals(num).then((result) => {
        console.log("result: ", result);
        State.update({
          pulled_proposals: [{ num, result }],
        });
        toggleUpdateFlag();
      });
    }
    State.update({ proposalChecked: true });
  }
}

// HELPER FUNCTIONS

const pullProposals = () => {
  if (!state.chainId || !state.sender) {
    return console.log("Connect first");
  }

  const proposals = new ethers.Contract(
    proposalContract,
    proposalAbi,
    Ethers.provider().getSigner()
  );

  proposals.proposalsCount().then((_number) => {
    if (_number > 0) {
      State.update({ proposalNumber: _number.toNumber() });
    }
  });
};

if (state.sender !== undefined) {
  pullProposals();
}

const ComponentToForceRender = ({ updateFlag }) => {
  console.log(state);
  console.log("Updating state ", state.pulled_proposals);
  if (!state.pulled_proposals) return null;
  return (
    <div>
      {state.pulled_proposals.map((item) => (
        <>
          <pre>{JSON.stringify(item)}</pre>
          <Widget
            src="ethpraguedemo.near/widget/Progress-Pool-Question-Preview"
            result={item.result}
            index={item.num}
          />
        </>
      ))}
    </div>
  );
};

const H2 = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #11181C;

  a {
    color: inherit;
    transition: color .15s ease;
    &:hover {
      color: #30A46C;
      text-decoration: none;

      & + i {
        visibility: visible;
      }
    }

    & + i {
      transition: visibility .1s ease-out;
      visibility: hidden;
      color: #30A46C;
    }
  }
`;
const H6 = styled.h6`
  font-size: 14px;
  font-weight: 500;
  color: #687076;
`;
const Trancate = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
`;
const TopicName = styled.span`
  color: #006ADC;
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap;
`;
const CardWrapper = styled.div`
  z-index: 100;
  padding: 6px;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  gap: 12px;
  width: 275px;
  border-radius: 12px;
  z-index: 1070;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 12px;
`;
const Item = styled.div`
  padding: 0;
  .btn {
    width: 100%;
    text-align: left;
    &:hover,
    &:focus {
      background-color: #ECEDEE;
      text-decoration: none;
      outline: none;
    }

    &.report-btn, &.hide-btn {
      i {
        color: #7E868C;
      }
    }
    span {
      font-weight: 500;
    }
  }
`;

console.log("before return");
return (
  <div>
    <Web3Connect
      className="LidoStakeFormSubmitContainer"
      connectLabel="Connect with Web3"
    />
    <ComponentToForceRender updateFlag={state.proposalChecked} />
  </div>
);
