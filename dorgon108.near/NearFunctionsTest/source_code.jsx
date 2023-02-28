State.init({
  value: "value to update",
});

console.log(Near.view("nearsocialexamples.near", "get_greeting"));

const testCall = () => {
  return Near.call("nearsocialexamples.near", "set_greeting", {
    message: "Hi Near Social",
  });
};

const testView = () => {
  State.update({
    value: Near.view("nearsocialexamples.near", "get_greeting"),
  });
};

return (
  <div>
    <button onClick={testCall}>test call</button>
    <button onClick={testView}>test view</button>

    <div>{state.value}</div>
  </div>
);
