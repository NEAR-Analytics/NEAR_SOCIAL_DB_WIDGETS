return (
  <div class="LidoForm">
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
        <a
          class="LidoStakeFormInputContainerSpan3Content btn btn-secondary btn-lg active"
          role="button"
          aria-pressed="true"
          href="https://traderjoexyz.com/arbitrum/trade?inputCurrency=ETH&outputCurrency=0x18c11fd286c5ec11c3b683caa813b77f5163a122"
          target="_blank"
        >
          Get more GNS <i class="bi bi-link"></i>
        </a>
      </div>
      <div class="LidoFormTopContainerRight">
        <div class="LidoFormTopContainerRightContent1">
          <div class="LidoFormTopContainerRightContent1Text">
            <span>
              {props.state.sender
                ? props.state.sender.substring(0, 6) +
                  "..." +
                  props.state.sender.substring(
                    props.state.sender.length - 10,
                    props.state.sender.length
                  )
                : "0x00..."}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="LidoSplitter" />
    <div
      class={
        props.state.sender ? "LidoFormBottomContainer" : "LidoFormTopContainer"
      }
    >
      <div class="LidoFormTopContainerLeft">
        <div class="LidoFormTopContainerLeftContent1">
          <div class="LidoFormTopContainerLeftContent1Container">
            <span>Your staked amount</span>
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
      <div class="LidoFormTopContainerLeft">
        <div class="LidoFormTopContainerLeftContent1">
          <div class="LidoFormTopContainerLeftContent1Container">
            <span>Your pending rewards</span>
          </div>
        </div>
        <div class="LidoFormTopContainerLeftContent2">
          <span>
            {props.state.rewards ?? 0}
            &nbsp;DAI
          </span>
        </div>
        <button
          class="LidoStakeFormInputContainerSpan3Content"
          onClick={() => props.harverstRewards()}
        >
          <span class="LidoStakeFormInputContainerSpan3Max">Harvest</span>
        </button>
      </div>
      <div class="LidoFormTopContainerRight">
        <div class="LidoAprContainer">
          <div class="LidoAprTitle">APR</div>
          <div class="LidoAprValue">{props.state.apr}%</div>
        </div>
      </div>
    </div>
  </div>
);
