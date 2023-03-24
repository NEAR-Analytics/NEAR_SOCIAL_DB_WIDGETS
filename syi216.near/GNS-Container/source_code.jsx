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
      <Widget src="syi216.near/widget/GNS-Staking" />
      <Widget src="syi216.near/widget/GNS-Unstake" />
    </div>
  </Theme>
);
