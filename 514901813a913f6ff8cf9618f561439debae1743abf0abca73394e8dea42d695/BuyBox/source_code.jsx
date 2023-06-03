const css = `
  .flex {
    display: flex;
    flexDirection: "row"
    > div {
        margin: 32px 0;
      margin-right: 32px;
      width: 50%;
      height: 100%;
      border: 2px solid rgb(6, 252, 153);
    }
    > div:last-of-type {
      margin-right: 0;
    }
  }
  .btn {
      margin-bottom: 16px !important;
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

const { onBuyComplete } = props;
const handleBuy = () => {
  if (typeof onBuyComplete === "string") {
    return;
  }
  onBuyComplete();
};
return (
  <Theme>
    <button onClick={props.onBuy}>Buy it</button>
  </Theme>
);
