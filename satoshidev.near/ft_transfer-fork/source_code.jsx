const accountId = context.accountId;
let token = props.token || "token.sweat";
let reciever = props.reciever || "mimyo.near";
let balance = -1;

initState({ amount: -1, token, reciever, balance });

const getBalance = () => {
  balance = Near.view(state.token, "ft_balance_of", {
    account_id: accountId,
  });
  State.update({
    balance,
  });
};
getBalance();

const send = () => {
  Near.call(
    state.token,
    "ft_transfer",
    {
      receiver_id: state.reciever,
      amount: state.amount,
    }
    // "30000000000000",
    // "1"
  );
};

const onChangeAmount = (amount) => {
  State.update({
    amount,
  });
};
const onChangeReciever = (reciever) => {
  State.update({
    reciever,
  });
};

const onChangeToken = (token) => {
  State.update({
    token,
  });
  getBalance();
};

return (
  <div>
    <h2>Sender</h2>
    <ul>
      <li>Address: {accountId}</li>
      <li>
        Balance of {state.token}: {state.balance}
      </li>
    </ul>

    <h2>Token Address</h2>
    <p>
      <input
        placeholder={state.token}
        onChange={(e) => onChangeToken(e.target.value)}
      />
    </p>

    <h2>Reciever Address</h2>
    <p>
      <input
        placeholder={state.reciever}
        onChange={(e) => onChangeReciever(e.target.value)}
      />
    </p>

    <h2>Token Amount</h2>
    <p>
      <input
        type="number"
        placeholder={state.amount}
        onChange={(e) => onChangeAmount(e.target.value)}
      />
    </p>

    <p>
      <button
        disabled={context.loading}
        onClick={send}
        className={`btn ${
          context.loading ? "btn-outline-dark" : "btn-primary"
        }`}
      >
        Send {state.amount} {state.token} to {state.reciever}
      </button>
    </p>
  </div>
);
