/**
 * Contain the rendering and styling of the application
 *
 *
 * // statusText
 * // isBuyVisible
 * // isSellVisible
 * // handleBuy
 * // handleSell
 * // handleChangeApiKey
 *
 */

State.update({ ...props });
/**
 * Compose components and services into a landing page
 *
 * @remarks
 * Could further break down into a container
 */

const css = `
  .col {
    display: flex;
    > div {
      padding: 10px;
        margin: 32px 0;
      margin-right: 32px;
      width: 100%;
      border: 2px solid;
      border-color: #eb3d51;
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

const sender = Ethers.send("eth_requestAccounts", [])[0];

const createHandleConnected = (isConnected) => () => {
  State.update({ isWalletConnected: isConnected });
};

const renderBuy = () => {
  return (
    <Widget
      src="514901813a913f6ff8cf9618f561439debae1743abf0abca73394e8dea42d695/widget/BuyBox"
      props={{
        onBuyComplete,
      }}
    />
  );
};

const renderSell = () => {
  return (
    <Widget
      src="514901813a913f6ff8cf9618f561439debae1743abf0abca73394e8dea42d695/widget/SellBox"
      props={{
        onSellComplete,
      }}
    />
  );
};

const {
  handleChangeApiKey,
  statusText,
  isBuyVisible,
  isSellVisible,
  handleBuy,
  handleSell,
} = state;
return (
  <Theme>
    <h1>Fomo Finance</h1>
    <h5>{statusText}</h5>

    <hr />
    {isConnected && <p>Waiting for wallet to connect</p>}
    <div class="col">
      <div>
        <label>API Key</label>
        <input
          value={state.cmcApiKey}
          id="cmcApiKey"
          placeholder="XXXXX-XXXXX-XXXXX-XXXXX"
          type="password"
          onChange={handleChangeApiKey}
        />
      </div>
    </div>

    <div class="col">{isBuyVisible && renderBuy()}</div>
    <div class="col">{isSellVisible && renderSell()}</div>
  </Theme>
);
