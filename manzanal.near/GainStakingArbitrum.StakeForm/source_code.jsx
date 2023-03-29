return (
  <div class="LidoStakeForm">
    <div class="LidoStakeFormInputContainer">
      <span class="LidoStakeFormInputContainerSpan1">
        <img
          src="https://research.binance.com/static/images/projects/gains-network/logo.png"
          width="24"
          height="24"
        />
      </span>
      <span class="LidoStakeFormInputContainerSpan2">
        <input
          disabled={!props.state.sender}
          class="LidoStakeFormInputContainerSpan2Input"
          value={props.state.tokenAmount}
          onChange={(e) => props.updateTokenAmount(e.target.value)}
          placeholder="Amount"
        />
      </span>
      <span
        class="LidoStakeFormInputContainerSpan3"
        onClick={() =>
          props.updateTokenAmount(parseFloat(props.state.balance).toFixed(5))
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
  </div>
);
