// let amount;
// amount = props.amount;
// let yoctoConvert = amount / 1e24;
let hardcode = 420000000000000000000000; // .6
// let yoctoConvert = props.amount * 1e24;
let yoctoConvert = hardcode / 1e24;

const donate = () => {
  Near.call("blunt.sputnik-dao.near", "donate", {}, "30000000000000", hardcode);
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
    <input
      className="form-control border-0"
      type="number"
      value={props.amount}
      placeholder="NEAR"
      onChange={(e) => props.update({ amount: e.target.value })}
    />
    <button onClick={donate}>
      Donate {yoctoConvert} NEAR to Blunt Treausrey
    </button>
    <a
      className="btn btn-outline-secondary"
      href="https://app.astrodao.com/dao/blunt.sputnik-dao.near/"
    >
      Check the Treasurey
    </a>
  </div>
);
