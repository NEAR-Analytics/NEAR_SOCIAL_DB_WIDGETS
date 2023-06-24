State.init({
  value: "testing value",
});

const value = state.value || "No-name button No-name general";

const Theme = state.theme;

return (
  <div>
    <Widget src="a_liutiev.near/widget/button_general" props={{ value }} />
    <br />
    <Widget src="a_liutiev.near/widget/button_web3connect" props={{ value }} />

    <div>{state.value} :) </div>
  </div>
);
