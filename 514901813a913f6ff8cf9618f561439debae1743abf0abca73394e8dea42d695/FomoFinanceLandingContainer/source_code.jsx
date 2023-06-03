/**
 * Testable container for the landing page

 */

State.update({ ...props });

const Theme = styled.div`
.error-text {
  color: red
}
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
  errorText,
  isConnected,
} = props;
return (
  <Theme>
    <h1>Fomo Finance</h1>
    <h5>{statusText}</h5>
    <h5 class="error-text">{errorText && `Ah, Shit! ${errorText}`}</h5>

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
    <Widget
      src="514901813a913f6ff8cf9618f561439debae1743abf0abca73394e8dea42d695/widget/SwapBox"
      props={{
        isApproveVisible,
        isTitleVisible: false,
        isBuyVisible,
        isSellVisible,
        isConnected,
        onPressBuy: handleBuy,
        onPressSell: handleSell,
        onPressApprove: handleApprove,
        sender: "TODO",
        balance: "TODO",
      }}
    />
  </Theme>
);
