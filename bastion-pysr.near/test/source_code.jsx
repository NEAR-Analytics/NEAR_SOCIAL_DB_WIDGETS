const LenABI = fetch(
  "https://raw.githubusercontent.com/pysrbastion/bastion-abi/main/Lens.json"
).body;

const lenContract = "0x080B5ce373fE2103A7086b31DabA412E88bD7356";

const len = new ethers.Contract(lenContract, LenABI, Ethers.provider());

len.callStatic
  .cTokenMetadataAll(
    [
      "0xfa786baC375D8806185555149235AcDb182C033b",
      "0x4E8fE8fd314cFC09BDb0942c5adCC37431abDCD0",
      "0x8C14ea853321028a7bb5E4FB0d0147F183d3B677",
      "0xe5308dc623101508952948b141fD9eaBd3337D99",
      "0x845E15A441CFC1871B7AC610b0E922019BaD9826",
    ],
    0
  )
  .then((data) => {
    State.update({ data });
  });

if (state.data) {
  return (
    <div>
      <h1>Lending</h1>
      <h2>
        <div>Supply</div>
      </h2>
      <h2>
        <div>Withdraw</div>
      </h2>
      <div>{JSON.stringify(state.data, undefined, 2)}</div>
      {state.data.map(
        ([
          cToken,
          price,
          exchangeRate,
          supplyRate,
          borrowRate,
          totalBorrow,
          _a,
          totalSupply,
          totalCash,
          _b,
          collateralFactor,
          underlying,
          cTokenDecimals,
          decimals,
        ]) => {
          return (
            <div>
              <div>{cToken}</div>
              <div>{totalSupply.toString()}</div>
            </div>
          );
        }
      )}
      <Web3Connect connectLabel="Connect with Web3" />
    </div>
  );
} else {
  return null;
}
