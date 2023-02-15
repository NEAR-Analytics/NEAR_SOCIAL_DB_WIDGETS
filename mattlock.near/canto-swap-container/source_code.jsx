const css = `
  .flex {
    display: flex;
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

return (
  <Theme>
    <div class="flex">
      <Widget src="mattlock.near/widget/cantoswap-component" />
      <Widget
        src="mattlock.near/widget/cantoswap-component"
        props={{
          contractName: "Canto Base Router",
          contractImg:
            "https://blog.mexc.com/wp-content/uploads/2022/11/canto_logo.png",
          contractAddress: "0xa252eEE9BDe830Ca4793F054B506587027825a8e",
          abiUrl:
            "https://gist.githubusercontent.com/mattlockyer/a9de9620116c546f85003010f6a3bec5/raw/e2e00d35baa20d67aaae1278182f44773f434b44/cantoBaseV1RouterAbi",
        }}
      />
    </div>
  </Theme>
);
