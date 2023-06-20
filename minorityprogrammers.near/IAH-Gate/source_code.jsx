const accountId = props.accountId ?? "Login with NEAR Wallet";

const getFirstSBTToken = () => {
  const view = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
    account: `${context.accountId}`,
    issuer: "fractal.i-am-human.near",
  });
  return view?.[0]?.[1]?.[0];
};
const hasSBTToken = getFirstSBTToken() !== undefined;
// hasSBTToken = true; // for debug
// console.log("Has SBT Token: " + hasSBTToken);

return (
  <div>
    {hasSBTToken == true ? (
      <div>Ayyye you verified! Put code here</div>
    ) : (
      hasSBTToken == false && (
        <div
          className="px-4"
          style={{
            backgroundColor: "white",
            margin: "2rem auto 0 auto",
            width: "100%",
          }}
        >
          <div style={{ padding: "2rem" }}>
            <h2
              style={{
                fontWeight: "700",
              }}
            >
              Get Verified As a Human
            </h2>
            <p>
              Go on{" "}
              <a href="https://nearefi.org/human" target="_blank">
                i-am-human.app
              </a>{" "}
              and get ✅ faceverified as a human
            </p>
          </div>
        </div>
      )
    )}
  </div>
);
