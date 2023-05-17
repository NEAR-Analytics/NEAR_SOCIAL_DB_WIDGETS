const Near3Wrapper = styled.div`
  background-color: lightcyan;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

State.init({ msg: "nothing" });

const testView = () => {
  State.update({
    msg: Near.view("spin-nft-contract.near", "nft_total_supply"),
  });
};

testView();

return (
  <Near3Wrapper>
    <p>Component-3 : near-3.jsx</p>
    <p>State : {state.msg}</p>
    <Widget src={`onboarder.near/widget/Uniswap`} />
    <button
      onClick={() => {
        return Near.call("nearsocialexamples.near", "set_greeting", {
          message: "Hi Near Social",
        });
      }}
    >
      Send Transaction to SmartContract
    </button>
  </Near3Wrapper>
);
