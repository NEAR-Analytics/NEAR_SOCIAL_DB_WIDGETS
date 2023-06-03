// FETCH LIDO ABI

/**
 * sender
 * balance
 * isConnected
 * isApproveVisible
 * onPressBuy
 * onPressSell
 * onPressApprove
 * isHodling
 */

const {
  isHolding,
  isConnected,
  isApproveVisible,
  onPressBuy,
  onPressSell,
  onPressApprove,
  isHodling,
  sender,
  balance,
} = props;

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

return (
  <Theme>
    <div class="LidoContainer">
      <div class="Header">Trade Shitcoins</div>
      <div class="SubHeader">Stake ETH and receive nothing useful.</div>

      <div class="LidoForm">
        {sender && (
          <>
            <div class="LidoFormTopContainer">
              <div class="LidoFormTopContainerLeft">
                <div class="LidoFormTopContainerLeftContent1">
                  <div class="LidoFormTopContainerLeftContent1Container">
                    <span>Available to swap</span>
                    <div class="LidoFormTopContainerLeftContent1Circle" />
                  </div>
                </div>
                <div class="LidoFormTopContainerLeftContent2">
                  <span>{balance ?? (!sender ? "0" : "...")}&nbsp;ETH</span>
                </div>
              </div>
              <div class="LidoFormTopContainerRight">
                <div class="LidoFormTopContainerRightContent1">
                  <div class="LidoFormTopContainerRightContent1Text">
                    <span>{sender}</span>
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
                <span>Potential Earnings</span>
              </div>
            </div>
            <div class="LidoFormTopContainerLeftContent2">
              <div class="LidoAprValue">{"Over 9000"}%</div>
            </div>
          </div>
        </div>
      </div>
      <div class="LidoStakeForm">
        {isConnected && !isHodling && (
          <div class="LidoStakeFormInputContainer">
            <span class="LidoStakeFormInputContainerSpan1">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
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
                type={"number"}
                class="LidoStakeFormInputContainerSpan2Input"
                value={state.strEther}
                onChange={(e) => State.update({ strEther: e.target.value })}
                placeholder="Amount"
              />
            </span>
          </div>
        )}
        {!isConnected && (
          <Web3Connect
            className="LidoStakeFormSubmitContainer"
            connectLabel="Connect Wallet"
          />
        )}
        {isApproveVisible && (
          <button
            class="LidoStakeFormSubmitContainer"
            onClick={() => submitEthers(state.strEther, state.sender)}
          >
            <span>Approve Shitcoin</span>
          </button>
        )}

        {!isHodling && (
          <button
            class="LidoStakeFormSubmitContainer"
            onClick={() => submitEthers(state.strEther, state.sender)}
          >
            <span>Buy Shitcoin</span>
          </button>
        )}

        <div class="LidoFooterContainer">
          {state.sender && (
            <div class="LidoFooterRaw">
              <div class="LidoFooterRawLeft">You will receive</div>
              <div class="LidoFooterRawRight">${state.strEther ?? 0} stETH</div>
            </div>
          )}
          <div class="LidoFooterRaw">
            <div class="LidoFooterRawLeft">Exchange rate</div>
            <div class="LidoFooterRawRight">1 ETH = 1 moon</div>
          </div>
          <div class="LidoFooterRaw">
            <div class="LidoFooterRawLeft">Reward fee</div>
            <div class="LidoFooterRawRight">maybe gf</div>
          </div>
        </div>
      </div>
    </div>
  </Theme>
);
