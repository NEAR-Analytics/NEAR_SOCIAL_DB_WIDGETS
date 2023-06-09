initState({
  showAbout: true,
});

const css = `
  .flex {
    display: flex;
    color: white;
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
    font-family: 'Lato', sans-serif;
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

const swapProps = { forceNetwork: "ZKSYNC" };

return (
  <Theme>
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <svg
        width="405"
        height="104"
        viewBox="0 0 267 67"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="logo_logo__AXqd6"
      >
        <g clip-path="url(#clip0_165_1900)">
          <path
            d="M195.748 67H180.263C161.693 67 146.601 51.9808 146.601 33.5C146.601 15.0192 161.693 0 180.263 0C198.834 0 213.926 15.0192 213.926 33.5V66.33H200.461V33.5C200.461 22.3892 191.428 13.4 180.263 13.4C169.098 13.4 160.066 22.3892 160.066 33.5C160.066 44.6108 169.098 53.6 180.263 53.6H195.748V67Z"
            fill="white"
          ></path>
          <path
            d="M119.67 66.33H106.205V33.5C106.205 15.0192 121.297 0 139.868 0V13.4C128.703 13.4 119.67 22.3892 119.67 33.5V66.33Z"
            fill="white"
          ></path>
          <path
            d="M59.0776 67C40.5071 67 25.415 51.9808 25.415 33.5C25.415 15.0192 40.5071 0 59.0776 0C77.6481 0 92.7401 15.0192 92.7401 33.5V40.2H54.0282V26.8H78.0969C75.2917 18.9833 67.8298 13.4 59.0776 13.4C47.9128 13.4 38.8801 22.3892 38.8801 33.5C38.8801 44.6108 47.9128 53.6 59.0776 53.6C65.8101 53.6 72.0938 50.25 75.8527 44.6667L87.0175 52.1483C80.7899 61.4167 70.3545 67 59.0776 67Z"
            fill="white"
          ></path>
          <path
            d="M267 13.4004H234.123V66.3304H267V13.4004Z"
            fill="white"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_165_1900">
            <rect width="267" height="67" fill="white"></rect>
          </clipPath>
        </defs>
      </svg>
      <h2
        style={{
          fontFamily: "Gilroy, Arial",
          fontWeight: 400,
          marginTop: 40,
          marginBottom: 40,
        }}
      >
        Explore the Wonders of the zkSync Ecosystem
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
          1. Bridge to Era
        </h2>
        <Widget src="ciocan.near/widget/zk-bridge" />
      </div>
      <div>
        <h2
          style={{
            fontWeight: 400,
            marginTop: 30,
            textAlign: "center",
          }}
        >
          2. Swap on SyncSwap
        </h2>
        <Widget src="zavodil.near/widget/swap" props={swapProps} />
      </div>
    </div>
  </Theme>
);
