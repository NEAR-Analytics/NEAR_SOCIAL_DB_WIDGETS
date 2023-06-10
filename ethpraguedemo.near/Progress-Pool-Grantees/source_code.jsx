const Content = styled.div`
  .post {
    padding-left: 0;
    padding-right: 0;
  }
`;

const Tabs = styled.div`
  display: flex;
  height: 48px;
  border-bottom: 1px solid #eceef0;
  margin-bottom: 72px;
  overflow: auto;
  scroll-behavior: smooth;

  @media (max-width: 1200px) {
    background: #f8f9fa;
    border-top: 1px solid #eceef0;
    margin: 0 -12px 48px;

    > * {
      flex: 1;
    }
  }
`;

const TabsButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 600;
  font-size: 12px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none !important;

  &:hover {
    color: #11181c;
  }

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #59e692;
  }
`;

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

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    console.log("set sender", accounts[0]);
    console.log("2.: ", state);
  }
}

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

// HELPER FUNCTIONS

const submitDescription = (strDescription, _referral) => {
  if (!strDescription) {
    return console.log("Description is missing");
  }
  const proposal = new ethers.Contract(
    proposalContract,
    proposalAbi,
    Ethers.provider().getSigner()
  );

  proposal.submitProposal(strDescription).then((transactionHash) => {
    console.log("transactionHash is " + transactionHash);
    // add to proposal list
  });
};

// FETCH CSS

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;
const css = fetch(
  "https://pluminite.mypinata.cloud/ipfs/Qmboz8aoSvVXLeP5pZbRtNKtDD3kX5D9DEnfMn2ZGSJWtP"
).body;

if (!cssFont || !css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    ${cssFont}
    ${css}
`,
  });
}
const Theme = state.theme;

// OUTPUT UI

const getSender = () => {
  return !state.sender
    ? ""
    : state.sender.substring(0, 6) +
        "..." +
        state.sender.substring(state.sender.length - 4, state.sender.length);
};

return (
  <Theme>
    <Content>
      <Tabs>
        <TabsButton
          href={`https://near.org/embed/ethpraguedemo.near/widget/Progress-Pool`}
          selected={state.selectedTab === "overview"}
        >
          For Voters
        </TabsButton>

        <TabsButton
          href={`https://near.org/embed/ethpraguedemo.near/widget/Progress-Pool-Grantees`}
          selected={state.selectedTab === "apps"}
        >
          For Grantees
        </TabsButton>

        <TabsButton
          href={`https://near.org/embed/ethpraguedemo.near/widget/Progress-Pool-Proposals`}
          selected={state.selectedTab === "nfts"}
        >
          Proposals
        </TabsButton>
      </Tabs>
    </Content>

    <div class="LidoContainer">
      <div class="Header">Grantees</div>
      <div class="SubHeader">Submit a proposal and get funding.</div>

      <div class="LidoForm">
        {state.sender && (
          <>
            <div class="LidoFormTopContainer">
              <div class="LidoFormTopContainerLeft">
                <div class="LidoFormTopContainerLeftContent1">
                  <div class="LidoFormTopContainerLeftContent1Container">
                    <span>Available to stake</span>
                    <div class="LidoFormTopContainerLeftContent1Circle" />
                  </div>
                </div>
                <div class="LidoFormTopContainerLeftContent2">
                  <span>
                    {state.balance ?? (!state.sender ? "0" : "...")}&nbsp;ETH
                  </span>
                </div>
              </div>
              <div class="LidoFormTopContainerRight">
                <div class="LidoFormTopContainerRightContent1">
                  <div class="LidoFormTopContainerRightContent1Text">
                    <span>{getSender()}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="LidoSplitter" />
          </>
        )}
        <div
          class={
            state.sender ? "LidoFormBottomContainer" : "LidoFormTopContainer"
          }
        >
          <div class="LidoFormTopContainerLeft">
            <div class="LidoFormTopContainerLeftContent1">
              <div class="LidoFormTopContainerLeftContent1Container">
                <span>Staked amount</span>
              </div>
            </div>
            <div class="LidoFormTopContainerLeftContent2">
              <span>
                {state.stakedBalance ?? (!state.sender ? "0" : "...")}
                &nbsp;stETH
              </span>
            </div>
          </div>
          <div class="LidoFormTopContainerRight">
            <div class="LidoAprContainer">
              <div class="LidoAprTitle">Lido APR</div>
              <div class="LidoAprValue">{state.lidoArp ?? "..."}%</div>
            </div>
          </div>
        </div>
      </div>
      <div class="LidoStakeForm">
        <div class="LidoStakeFormInputContainer">
          <span class="LidoStakeFormInputContainerSpan1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path
                opacity="0.6"
                d="M11.999 3.75v6.098l5.248 2.303-5.248-8.401z"
              ></path>
              <path d="M11.999 3.75L6.75 12.151l5.249-2.303V3.75z"></path>
              <path
                opacity="0.6"
                d="M11.999 16.103v4.143l5.251-7.135L12 16.103z"
              ></path>
              <path d="M11.999 20.246v-4.144L6.75 13.111l5.249 7.135z"></path>
              <path
                opacity="0.2"
                d="M11.999 15.144l5.248-2.993-5.248-2.301v5.294z"
              ></path>
              <path
                opacity="0.6"
                d="M6.75 12.151l5.249 2.993V9.85l-5.249 2.3z"
              ></path>
            </svg>
          </span>
          <span class="LidoStakeFormInputContainerSpan2">
            <input
              disabled={!state.sender}
              class="LidoStakeFormInputContainerSpan2Input"
              value={state.strDescription}
              onChange={(e) => State.update({ strDescription: e.target.value })}
              placeholder="Description"
            />
          </span>
        </div>
        {!!state.sender ? (
          <button
            class="LidoStakeFormSubmitContainer"
            onClick={() =>
              submitDescription(state.strDescription, state.sender)
            }
          >
            <span>Submit Proposal</span>
          </button>
        ) : (
          <Web3Connect
            className="LidoStakeFormSubmitContainer"
            connectLabel="Connect with Web3"
          />
        )}
      </div>
    </div>
  </Theme>
);
