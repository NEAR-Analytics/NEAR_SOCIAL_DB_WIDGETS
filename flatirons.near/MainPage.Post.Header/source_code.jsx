const accountId = props.accountId;
const blockHeight = props.blockHeight;
const postType = props.postType ?? "post";
const link = props.link;

const ButtonLink = styled.a`
  padding: 8px;
  height: 32px;
  border: 1px solid #d7dbdf;
  border-radius: 6px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: ${(p) => (p.primary ? "#006ADC" : "#11181C")} !important;
  background: #fbfcfd;

  &:hover,
  &:focus {
    background: #ecedee;
    text-decoration: none;
    outline: none;
  }
`;

let graphqlMessage = "";

function hideUser() {
  const query =
    `mutation HideUser { insert_user_centric_user_reputation(
    objects: {base_account_id: "` +
    context.accountId +
    `", target_account_id: "` +
    accountId +
    `", hide: "true"}
  ) {
    returning {
      base_account_id
      hide
      target_account_id
    }
  }
}`;
  let graphqlMessage = null;
  let userReputationResponse;
  try {
    userReputationResponse = fetch(
      "https://query-api-hasura-vcqilefdcq-uc.a.run.app/v1/graphql",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
      }
    );
  } catch (e) {
    graphqlMessage = "Unable to hide user";
  }

  if (
    userReputationResponse?.status == 200 &&
    !userReputationResponse.body.errors
  ) {
    graphqlMessage = "User Hidden, reload.";
  } else {
    graphqlMessage = userReputationResponse.body.errors;
  }
}

return (
  <div className="d-flex flex-row align-items-center">
    <div className="flex-grow-1 text-truncate">
      <a
        className="text-dark text-decoration-none text-truncate"
        href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
      >
        <Widget
          src="mob.near/widget/Profile.ShortInlineBlock"
          props={{ accountId, tooltip: true }}
        />
      </a>
      {graphqlMessage}
    </div>
    <span className="text-nowrap text-muted">
      <small>
        {blockHeight === "now" ? (
          "now"
        ) : (
          <a className="text-muted" href={link}>
            <Widget src="mob.near/widget/TimeAgo" props={{ blockHeight }} />
          </a>
        )}
      </small>
      {blockHeight !== "now" && (
        <span>
          <a
            href="javascript:void"
            className="link-secondary ms-2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fs-6 bi bi-three-dots" />
          </a>
          <ul className="dropdown-menu">
            <li>
              <Widget
                src="mob.near/widget/CopyButton"
                props={{
                  text: `https://near.social/${link}`,
                  className: "btn btn-outline-dark dropdown-item",
                  label: `Copy link to ${postType}`,
                }}
              />
            </li>
            <li className="dropdown-item">
              <a
                className="link-dark text-decoration-none"
                href={`${link}&raw=true`}
              >
                View raw markdown source
              </a>
            </li>
            <li className="dropdown-item" disabled>
              Hide {postType}
            </li>

            <li className="dropdown-item">
              <ButtonLink
                onClick={() =>
                  State.update({
                    activeTab: "indexer-status",
                    selected_indexer: indexerName,
                  })
                }
              >
                Hide User
              </ButtonLink>
            </li>
          </ul>
        </span>
      )}
    </span>
  </div>
);
