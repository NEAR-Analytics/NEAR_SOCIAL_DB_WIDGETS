/**
 * Testable container for the landing page

 */

State.update({ ...props });

const Theme = styled.div`
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

const renderBuy = (handleBuy) => {
  return (
    <Widget
      src="514901813a913f6ff8cf9618f561439debae1743abf0abca73394e8dea42d695/widget/BuyBox"
      props={{
        handleBuy,
      }}
    />
  );
};

const renderSell = (handleSell) => {
  return (
    <Widget
      src="514901813a913f6ff8cf9618f561439debae1743abf0abca73394e8dea42d695/widget/SellBox"
      props={{
        handleSell,
      }}
    />
  );
};

const {
  statusText,
  isBuyVisible,
  isSellVisible,
  handleBuy,
  handleSell,
  handleChangeApiKey,
  cmcApiKey,
  isApproveVisible,
  handleApprove,
} = props;
return (
  <Theme>
    <h1>Fomo Finance</h1>
    <h5>{statusText}</h5>

    <hr />
    {isConnected && <p>Waiting for wallet to connect</p>}

    <div>
      <label>API Key</label>
      <input
        value={props.cmcApiKey}
        id="cmcApiKey"
        placeholder="XXXXX-XXXXX-XXXXX-XXXXX"
        type="password"
        onChange={handleChangeApiKey}
      />
    </div>

    <div class="col">{isBuyVisible && renderBuy(handleBuy)}</div>
    <div class="col">{isSellVisible && renderSell(handleSell)}</div>
  </Theme>
);
