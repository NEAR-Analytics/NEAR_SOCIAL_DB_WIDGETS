const sender = props.sender || `0x525521d79134822a342d330bd91da67976569af1`;
const message = props.message || `Balance is: `;
const unit = props.unit || `ETH`;

if (state.balance === undefined && sender) {
  Ethers.provider()
    .getBalance(sender)
    .then((balance) => {
      State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(2) });
    });
}

return (
  <span>
    {message}
    {state.balance} {unit}
  </span>
);
