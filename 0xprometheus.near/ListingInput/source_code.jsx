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
    <div className="col-lg-6 border border-secondary rounded">
      <p>
        Collection Name:{" "}
        <span className="font-weight-bold">{props.state.nftMetadata.name}</span>
      </p>
      <p>
        NFT Name:{" "}
        <span className="">{props.state.tokenInfo.metadata.title}</span>
      </p>
      <p className="">
        Description: {props.state.tokenInfo.metadata.description}
      </p>
      <p>
        <a href={props.state.tokenInfo.media} target="_blank">
          {props.state.tokenInfo.media}
        </a>
      </p>
      {!props.state.ownsNFT && (
        <div className="alert alert-danger">
          <i className="bi bi-x"></i> You do not own this NFT & cannot list or
          transfer it
        </div>
      )}
      {props.state.ownsNFT && (
        <div className="alert alert-success">
          <i className="bi bi-x"></i> You own this NFT
        </div>
      )}
      <Widget
        src="mob.near/widget/NftImage"
        props={{
          nft: {
            tokenId: props.state.tokenId,
            contractId: props.state.contractId,
          },
          className: "col-lg-12",
        }}
      />
      <div className="col-lg-12">
        <h3> Listed Markets</h3>
        <div>
          <ul>
            {typeof props.state.tokenInfo.approved_account_ids === "object" &&
              Object.keys(props.state.tokenInfo.approved_account_ids).map(
                (key) => (
                  <li>
                    <a
                      href={"https://explorer.near.org/accounts/" + key}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {key}: {props.state.tokenInfo.approved_account_ids[key]}
                    </a>
                  </li>
                )
              )}
          </ul>
        </div>
      </div>
    </div>
  </div>
);
