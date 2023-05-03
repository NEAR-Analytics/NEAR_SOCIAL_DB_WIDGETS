initState({
  showAbout: true,
});

const css = `
  .flex {
    display: flex;
    > div {
        margin: 32px 0;
      margin-right: 32px;
      width: 50%;
    }
    > div:last-of-type {
      margin-right: 0;
    }
  }
  .btn {
      margin-bottom: 16px !important;
  }
  .h2 {
    font-family: var(--bs-body-font-family), sans-serif;
    src: url('https://fonts.googleapis.com/css2?family=Lato&display=swap') format('css2');
    font-weight: 300;
    font-style: normal;
  }
`;

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${css}
`,
  });
}
const Theme = state.theme;

const sender = Ethers.send("eth_requestAccounts", [])[0];

const swapProps = { forceNetwork: "Polygon zkEVM" };

return (
  <Theme style={{ background: "black", color: "white", borderRadius: 30 }}>
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <img
        src="https://ecosystem.polygon.technology/assets/images/polygon-zkevm-logo.svg"
        style={{ width: 300, marginTop: 50 }}
      ></img>
      <h2
        style={{
          fontFamily: "Gilroy, Arial",
          fontWeight: 400,
          marginTop: 40,
          marginBottom: 40,
        }}
      >
        Bring Ethereum to Everyone
      </h2>
    </div>

    <div class="flex">
      <div>
        <h2
          style={{
            fontWeight: 400,
            marginTop: 30,
            marginBottom: 70,
            textAlign: "center",
          }}
        >
          1. Bridge to zkEVM
        </h2>
        <Widget src="testbrrr.near/widget/zk-bridge" />
      </div>
      <div>
        <h2
          style={{
            fontWeight: 400,
            marginTop: 30,
            textAlign: "center",
          }}
        >
          2. Swap on QuickSwap
        </h2>
        <Widget src="zavodil.near/widget/swap" props={swapProps} />
      </div>
    </div>
  </Theme>
);
