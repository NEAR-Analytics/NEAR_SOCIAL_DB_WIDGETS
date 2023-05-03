return (
  <div className="row">
    <div className="mb-2 col-lg-6">
      <div className="">
        ContractID
        <input
          type="text"
          placeholder={props.state.contractId}
          onChange={(e) => onChangeContract(e.target.value)}
        />
      </div>
      <div className="">
        Token ID
        <input
          type="text"
          placeholder={props.state.tokenId}
          onChange={(e) => onChangeToken(e.target.value)}
        />
      </div>

      <div className="">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={props.state.fewfar}
            onChange={selectFewFar}
            id="fewfarbox"
          />
          <label className="form-check-label" htmlFor="myCheckbox">
            List to Few and Far
          </label>
        </div>
      </div>
      {false && (
        <div className="">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={props.state.mintbase}
              onChange={selectMintbase}
              id="mintbasebox"
            />
            <label className="form-check-label" htmlFor="myCheckbox">
              List to Mintbase
            </label>
          </div>
        </div>
      )}
      <div className="">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={props.state.tradeport}
            onChange={selectTradeport}
            id="tradeportbox"
          />
          <label className="form-check-label" htmlFor="myCheckbox">
            List to Tradeport
          </label>
        </div>
      </div>
      <div className="">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={props.state.custom}
            onChange={selectCustom}
            id="custombox"
          />
          <label className="form-check-label" htmlFor="myCheckbox">
            Enter Custom Marketplace Address
          </label>
        </div>
        {props.state.custom && (
          <div className="">
            Custom Marketplace
            <input
              type="text"
              placeholder={props.state.customMarketLink}
              onChange={(e) => onChangeCustomMarket(e.target.value)}
            />
          </div>
        )}
        {props.state.custom && !props.state.validMarketLink && (
          <div className="alert alert-danger">
            <i className="bi bi-x"></i> Not a Valid NEAR Contract for your
            custom Marketplace
          </div>
        )}
        <div className=" mb-2">
          Enter Price You Want to List (In NEAR) (WIP-Buggy)
          <input
            type="number"
            placeholder={props.state.amount / 1e24}
            onChange={(e) => onChangeAmount(e.target.value)}
          />
          <p>
            * You will pay some gas in Ⓝ to deposit NEAR to marketplace address
            then list your NFT
          </p>
        </div>
      </div>
    </div>
    <Widget
      src="0xprometheus.near/widget/display"
      props={{
        props,
      }}
    />
  </div>
);
