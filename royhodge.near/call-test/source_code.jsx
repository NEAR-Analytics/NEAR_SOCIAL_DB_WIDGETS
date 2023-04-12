State.init({
  value: "Information from the Smart Contract on NEAR Will Display Here..",
});

console.log(Near.view("dev-1680714992236-65898712788505", "get_user"));

const testCall = () => {
  return Near.call("dev-1680714992236-65898712788505", "set_user", {
    message: "Near User #1",
  });
};

const testView = () => {
  State.update({
    value: Near.view("dev-1680714992236-65898712788505", "get_user"),
  });
};

return (
  <div>
    <button onClick={testCall}>test call</button>
    <button onClick={testView}>test view</button>

    <div>{state.value}</div>
  </div>
);
