let avatarId = props.id ?? -1;
initState({ tokens: [] });

if (!state.tokens.length) {
  Near.asyncView("avtr.near", "nft_tokens", {}).then((tokens) =>
    State.update({ tokens })
  );

  return "Loading";
}

console.log(state.tokens);

let tokenDiv = styled.div`
width: 10rem;
height: 12rem;
background-image: url(${(props) => props.media});
background-size: auto;
    background-repeat: no-repeat;
vertical-align: bottom;
overflow: hidden;
    `;

let tokenOwner = styled.div`
    margin-top: 10rem;
        font-size: 0.7rem!important;
        background-color: #616161;
        color: #FFF;
    `;

let previews = [];
let modals = [];
let activeAvatar = null;

state.tokens.map((token) => {
  let price = 0;
  try {
    price = new Big(JSON.parse(token.metadata.extra).mint_price)
      .div(new Big(10).pow(24))
      .toFixed(1);
  } catch (e) {
    console.log(e);
  }

  const token_id = token.token_id.replace("#", "-").replace(" ", "");

  previews.push(
    <>
      <div class="float-start align-bottom">
        <tokenDiv
          media={token.metadata.media}
          type="button"
          data-bs-toggle="modal"
          data-bs-target={`#token-${token_id}`}
        >
          <tokenOwner>{token.owner_id}</tokenOwner>
        </tokenDiv>
      </div>
    </>
  );

  if (avatarId >= 0 && `Avatar-${avatarId}` === token_id) {
    activeAvatar = (
      <div class="modal-body text-center mb-5">
        <div class="row justify-content-md-center">
          <h5 class="modal-title pb-2" id={`token-${token_id}Label`}>
            Token {token.token_id}
            {price > 0 && (
              <span class="ms-1 badge bg-success">
                Mint Price: {price} NEAR
              </span>
            )}
          </h5>
          <div class="col-5">
            <img src={token.metadata.media} class=" text-center" />
          </div>
        </div>
        <div class="pt-2">
          Token owner:
          <Widget
            src={`zavodil.near/widget/ProfileLine`}
            props={{ accountId: token.owner_id }}
          />
        </div>
      </div>
    );
  }

  modals.push(
    <div
      class="modal fade"
      id={`token-${token_id}`}
      tabindex="-1"
      aria-labelledby={`token-${token_id}Label`}
      role="dialog"
      aria-hidden="true"
    >
      {`Avatar-${avatarId}`}
      {token_id}
      <div class="modal-dialog ">
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
          <div class="modal-body text-center">
            <img src={token.metadata.media} />
            <div class="pt-2 overflow-hidden">
              Token owner:
              <Widget
                src={`zavodil.near/widget/ProfileLine`}
                props={{ accountId: token.owner_id }}
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

return (
  <>
    <div class="row">
      <div class="col">
        <div class="text-center">
          {activeAvatar}
          <h4>All Social Avatars</h4>
          <div class="pt-1">{previews}</div>
        </div>
        {modals}
      </div>
    </div>
    <div class="row pt-2 pb-5 text-center">
      <div class="col">
        <a
          href="/#/zavodil.near/widget/social-avatar-editor"
          class="btn btn-success"
        >
          Mint Social Avatar
        </a>
      </div>
    </div>
  </>
);
