return (
  <div className="col-lg-6 border border-secondary rounded">
    <p>
      Collection Name:{" "}
      <span className="font-weight-bold">{props.state.nftMetadata.name}</span>
    </p>
    <p>
      NFT Name: <span className="">{props.state.tokenInfo.metadata.title}</span>
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
);
