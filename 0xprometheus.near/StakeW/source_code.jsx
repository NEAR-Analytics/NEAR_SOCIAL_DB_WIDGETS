// CUSTOM CSS

const cds = `
.LidoFormTopContainer{
    margin-top: 0px;
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    position: relative;
}

.roast{
  position: absolute;
  margin-top: -50px;
  top: 0%;
  left: 49%;
  right: -3%;
  color: #fff;
  padding: 10px;
  font-size: 14px;
  border-radius: 6px;
  background: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  opacity: 0;
  transform: translateX(calc(100% + 30px));
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.25, 1.35);
}
.roast.active{
  opacity: 0.2;
  transform: translateX(-35%);
}
.roast.error{
  opacity: 1;
  border-left: 8px solid red;
  transform: translateX(-35%);
}
.roast.success{
  opacity: 1;
  border-left: 8px solid #40f467;
  transform: translateX(-35%);
}
.roast-content{
  display: flex;
  justify-content: center;
  align-items: center;
}
.roast-check{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  color: #fff;
  font-size: 20px;
}

.roast-check.error{
  background-color: red;
}
.roast-check.success{
  background-color: #40f467;
}
.message{
  display: flex;
  flex-direction: column;
  margin: 0 20px;
}
.message-text{
  font-size: 20px;
  font-weight: 600;
}
.text-1{
  color: #333;
}
.text-2{
  color: #666;
  font-weight: 400;
  font-size: 16px;
}
a {
  outline: none;
}

a:link {
  color: #6900ff;
}
a:visited {
  color: #a5c300;
}
a:hover {
  text-decoration: none;
  background: #cdfeaa;
}
a:active {
  background: #6900ff;
  color: #cdfeaa;
}
a:focus {
  text-decoration: none;
  background: #bae498;
}

.LidoWithdrawFormSubmitContainer{
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

const getSender = () => {
  return !props.state.sender
    ? ""
    : props.state.sender.substring(0, 6) +
        "..." +
        props.state.sender.substring(
          props.state.sender.length - 4,
          props.state.sender.length
        );
};
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
        <>
          <div class="LidoFormTopContainer">
            <div class={`roast ${props.state.type}`}>
              <div class="roast-content">
                <div class={`roast-check ${props.state.type}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="checkmark"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <g data-name="Layer 2">
                      <g data-name="checkmark">
                        <rect width="24" height="24" opacity="0"></rect>
                        <path d="M9.86 18a1 1 0 0 1-.73-.32l-4.86-5.17a1 1 0 1 1 1.46-1.37l4.12 4.39 8.41-9.2a1 1 0 1 1 1.48 1.34l-9.14 10a1 1 0 0 1-.73.33z"></path>
                      </g>
                    </g>
                  </svg>
                </div>
                <div class="message">
                  <span class="message-text text-1">{props.state.message}</span>
                  <span class="message-text text-2">
                    {props.state.reason}{" "}
                    {props.state.link ? (
                      <a href={`${props.state.link}`} target="_blank">
                        View Transaction
                      </a>
                    ) : (
                      ""
                    )}
                  </span>
                </div>
              </div>
            </div>
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
                  <span>{props.state.sender ? getSender() : "0x00..."}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="LidoSplitter" />
        </>
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
          <div class="LidoFooterRaw">
            <div class="LidoFooterRawLeft">Pending Dai Rewards</div>
            <div class="LidoFooterRawRight">{props.state.rewards ?? 0} DAI</div>
          </div>
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
