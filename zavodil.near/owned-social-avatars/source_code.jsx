let appName = "avtr";
let ownerId = "zavodil.near";
let userId = context.accountId;
let contractId = "avtr.near";

const owned_tokens = Near.view(contractId, "nft_tokens_for_owner", {
  account_id: userId,
});

if (!owned_tokens.length) {
  return (
    <div class="text-center">
      Mint Social Avatar to set it as a Profile Picture
    </div>
  );
}

let tokenImg = styled.img`
width: 100px;
height: 100px;
    `;

let previews = [];
let modals = [];

owned_tokens.map((token) => {
  let price = 0;
  try {
    price = new Big(JSON.parse(token.metadata.extra).mint_price)
      .div(new Big(10).pow(24))
      .toFixed(0);
  } catch (e) {
    console.log(e);
  }

  const token_id = token.token_id.replace("#", "-").replace(" ", "");

  previews.push(
    <tokenImg
      src={token.metadata.media}
      class="float-start"
      type="button"
      data-bs-toggle="modal"
      data-bs-target={`#token-${token_id}`}
    />
  );

  modals.push(
    <div
      class="modal fade"
      id={`token-${token.token_id}`}
      tabindex="-1"
      aria-labelledby={`token-${token_id}Label`}
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id={`token-${token_id}Label`}>
              Token {token.token_id}
              {price > 0 && (
                <span class="ms-1 badge bg-success">
                  Mint Price: {price} NEAR
                </span>
              )}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <img src={token.metadata.media} />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <CommitButton
              data={{
                profile: {
                  image: {
                    url: null,
                    nft: {
                      contractId,
                      tokenId: token.token_id,
                    },
                  },
                },
              }}
            >
              Set profile picture
            </CommitButton>
          </div>
        </div>
      </div>
    </div>
  );
});

return (
  <>
    <div class="text-center">
      <h4>Social Avatars you owned</h4>
      <div>{previews}</div>
    </div>
    {modals}
  </>
);
