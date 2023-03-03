// let amount;
// amount = props.amount;
// let yoctoConvert = amount / 1e24;
let hardcode = 420000000000000000000000; // .6
// let yoctoConvert = props.amount * 1e24;
// let yoctoConvert = hardcode / 1e24;
let yoctoConvert = hardcode * 10;
let reciever = props.reciever || "blunt.sputnik-dao.near";

initState({ amount: 1, reciever });

// yoctoConvert = state.amount;

const donate = () => {
  let yoctoConvert1 = state.amount * 1e24;
  Near.call(
    state.reciever,
    "donate",
    {},
    "30000000000000",
    state.amount * 1e24
  );
};
const onChangeAmount = (amount) => {
  State.update({
    amount,
  });
};

return (
  <div>
    <div>
      <img
        className="Funny stuff"
        height="300px"
        src="https://ipfs.io/ipfs/QmNa2AdhuMEyhuoa4uUd7JhoxUKDivBFeqaxKK4b5AkexK"
        alt="BluntDAO Donate"
      />
    </div>
    <input type="number" onChange={(e) => onChangeAmount(e.target.value)} />
    <button
      disabled={context.loading}
      onClick={donate}
      className={`btn ${context.loading ? "btn-outline-dark" : "btn-primary"}`}
    >
      Donate {state.amount} NEAR to Blunt Treausrey
    </button>
    <a
      className="btn btn-outline-secondary"
      href="https://app.astrodao.com/dao/blunt.sputnik-dao.near/"
    >
      Check the Treasurey
    </a>
  </div>
);
