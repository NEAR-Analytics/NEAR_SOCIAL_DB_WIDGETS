const childSrc =
  context.networkId === "mainnet"
    ? "calebjacob.near/widget/TestButton"
    : "preview.testnet/widget/TestButton";

return (
  <div>
    <p>A child dependency:</p>
    <Widget src={childSrc} props={{ label: "Click Me" }} />
  </div>
);
