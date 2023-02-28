const testCall = () => {
  return Near.call(
    "nearsocialexamples.near",
    "set_greeting",
    `{"message":"Hi Near Social"}`
  );
};

return (
  <div>
    <button onClick={testCall}>test</button>
  </div>
);
