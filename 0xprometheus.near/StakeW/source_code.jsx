// CUSTOM CSS

const cds = `.LidoWithdrawFormSubmitContainer{
    color: #7a8aa0;
    -webkit-box-flex: 1;
    flex-grow: 1;
}
.LidoForm{
    background: linear-gradient(65.21deg, rgb(0 0 0) 19.1%, rgb(70, 131, 154) 100%);
    margin-bottom: -20px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    padding-bottom: 52px;
    font-weight: 400;
    font-size: 12px;
    line-height: 1.6em;
    border-radius: 20px;
    margin: 0px;
    padding: 32px;
    box-shadow: none;
    color: #fff;    
}
.LidoFormTopContainerLeftContent1Circle{
    background-color: rgb(5 240 34);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-left: 8px;
}
`;

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
    ${cds}
`,
  });
}
const Theme = state.theme;
console.log("pasd", props);
return (
  <Theme>
    <div class="LidoContainer">
      <div class="Header">Gains Network Staking Pool(ARBITRUM)</div>
      <div class="SubHeader">
        Stake GNS and receive DAI rewards while staking.
      </div>

      <div class="LidoForm">
        {props.state.sender && (
          <>
            <div class="LidoFormTopContainer">
              <div class="LidoFormTopContainerLeft">
                <div class="LidoFormTopContainerLeftContent1">
                  <div class="LidoFormTopContainerLeftContent1Container">
                    <span>GNS balance to stake</span>
                    <div class="LidoFormTopContainerLeftContent1Circle" />
                  </div>
                </div>
                <div class="LidoFormTopContainerLeftContent2">
                  <span>
                    {props.state.balance ?? (!props.state.sender ? "0" : "...")}
                    &nbsp;GNS
                  </span>
                </div>
              </div>
              <div class="LidoFormTopContainerRight">
                <div class="LidoFormTopContainerRightContent1">
                  <div class="LidoFormTopContainerRightContent1Text">
                    <span>{props.getSender()}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="LidoSplitter" />
          </>
        )}
        <div
          class={
            props.state.sender
              ? "LidoFormBottomContainer"
              : "LidoFormTopContainer"
          }
        >
          <div class="LidoFormTopContainerLeft">
            <div class="LidoFormTopContainerLeftContent1">
              <div class="LidoFormTopContainerLeftContent1Container">
                <span>Your Staked amount</span>
              </div>
            </div>
            <div class="LidoFormTopContainerLeftContent2">
              <span>
                {props.state.stakedBalance ?? (!props.state.sender ? "0" : "0")}
                &nbsp;GNS
              </span>
            </div>
            <button
              class="LidoStakeFormInputContainerSpan3Content"
              onClick={() => props.unStakeTokens()}
            >
              <span class="LidoStakeFormInputContainerSpan3Max">Unstake</span>
            </button>
          </div>
          <div class="LidoFormTopContainerRight">
            <div class="LidoAprContainer">
              <div class="LidoAprTitle">Total Dai rewards distributed</div>
              <div class="LidoAprValue">
                {props.state.totalRewards ?? "0"} Dai
              </div>
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
              disabled={!props.state.sender}
              class="LidoStakeFormInputContainerSpan2Input"
              value={props.state.tokenAmount}
              onChange={(e) => props.updator(e.target.value)}
              placeholder="Amount"
            />
          </span>
          <span
            class="LidoStakeFormInputContainerSpan3"
            onClick={() =>
              props.updator(parseFloat(props.state.balance).toFixed(2))
            }
          >
            <button
              class="LidoStakeFormInputContainerSpan3Content"
              disabled={!props.state.sender}
            >
              <span class="LidoStakeFormInputContainerSpan3Max">MAX</span>
            </button>
          </span>
        </div>
        {!!props.state.sender ? (
          props.state.allowance > 0 ? (
            <button
              class="LidoStakeFormSubmitContainer"
              onClick={() => props.stakeTokens(props.state.tokenAmount)}
            >
              <span>Stake</span>
            </button>
          ) : (
            <button
              class="LidoStakeFormSubmitContainer"
              onClick={() => props.approveToken()}
            >
              <span>Approve</span>
            </button>
          )
        ) : (
          <Web3Connect
            className="LidoStakeFormSubmitContainer"
            connectLabel="Connect with Wallet"
          />
        )}

        <div class="LidoFooterContainer">
          {props.state.sender && (
            <div class="LidoFooterRaw">
              <div class="LidoFooterRawLeft">Pending Dai Rewards</div>
              <div class="LidoFooterRawRight">
                {props.state.rewards ?? 0} DAI
              </div>
            </div>
          )}
          <div class="LidoFooterRaw">
            <button
              class="LidoWithdrawFormSubmitContainer"
              onClick={() => props.withdrawReward()}
            >
              <span>Withdraw Rewards</span>
            </button>
          </div>
          <div class="LidoFooterRaw">
            <div class="LidoFooterRawLeft">Your APR</div>
            <div class="LidoFooterRawRight">{props.apr}%</div>
          </div>
        </div>
      </div>
    </div>
  </Theme>
);
