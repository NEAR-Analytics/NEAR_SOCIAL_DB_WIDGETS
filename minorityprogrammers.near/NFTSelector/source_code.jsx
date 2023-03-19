const image = props.image;
const onChange = props.onChange;

State.init({
  url: image.url,
  nft: image.nft ?? {},
});

return (
  <div>
    <div
      className="p-2"
      style={{
        background: "#fdfdfd",
        border: "solid 1px #dee2e6",
        borderTop: 0,
        borderBottomLeftRadius: ".375rem",
        borderBottomRightRadius: ".375rem",
        minHeight: "9em",
      }}
    >
      <div>
        NFT contract
        <input type="text" value={state.nft.contractId} />
        NFT token id
        <input type="text" value={state.nft.tokenId} />
        <div className="mt-2">
          <Widget
            src={`sainthiago.near/widget/nft-selector`}
            props={{
              onChange: ({ contractId, tokenId }) => {
                State.update({
                  nft: { contractId: contractId, tokenId: tokenId },
                });
              },
            }}
          />
        </div>
      </div>
    </div>
  </div>
);
