/* INCLUDE: "common.jsx" */
const nearDevGovGigsContractAccountId = "devgovgigs.near";
const nearDevGovGigsWidgetsAccountId = "devgovgigs.near";

function widget(widgetName, widgetProps, key) {
  widgetProps = {
    ...widgetProps,
    nearDevGovGigsContractAccountId: props.nearDevGovGigsContractAccountId,
    nearDevGovGigsWidgetsAccountId: props.nearDevGovGigsWidgetsAccountId,
    referral: props.referral,
  };
  return (
    <Widget
      src={`${nearDevGovGigsWidgetsAccountId}/widget/gigs-board.${widgetName}`}
      props={widgetProps}
      key={key}
    />
  );
}

function href(widgetName, linkProps) {
  linkProps = { ...linkProps };
  if (props.nearDevGovGigsContractAccountId) {
    linkProps.nearDevGovGigsContractAccountId =
      props.nearDevGovGigsContractAccountId;
  }
  if (props.nearDevGovGigsWidgetsAccountId) {
    linkProps.nearDevGovGigsWidgetsAccountId =
      props.nearDevGovGigsWidgetsAccountId;
  }
  if (props.referral) {
    linkProps.referral = props.referral;
  }
  const linkPropsQuery = Object.entries(linkProps)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return `#/${nearDevGovGigsWidgetsAccountId}/widget/gigs-board.pages.${widgetName}${
    linkPropsQuery ? "?" : ""
  }${linkPropsQuery}`;
}
/* END_INCLUDE: "common.jsx" */

const postId = props.post.id ?? (props.id ? parseInt(props.id) : 0);
const post =
  props.post ??
  Near.view(nearDevGovGigsContractAccountId, "get_post", { post_id: postId });
if (!post) {
  return <div>Loading ...</div>;
}

console.log(post);

const snapshot = post.snapshot;

const childPostIds =
  Near.view(nearDevGovGigsContractAccountId, "get_children_ids", {
    post_id: postId,
  }) ?? [];

function readableDate(timestamp) {
  var a = new Date(timestamp);
  return a.toDateString() + " " + a.toLocaleTimeString();
}

const timestamp = readableDate(
  snapshot.timestamp ? snapshot.timestamp / 1000000 : Date.now()
);

const postSearchKeywords = props.seachKeywords ? (
  <div style={{ "font-family": "cursive" }} key="post-search-keywords">
    <span>Found keywords: </span>
    {props.seachKeywords.map((label) => {
      return <span class="badge text-bg-info me-1">{label}</span>;
    })}
  </div>
) : (
  <div key="post-search-keywords"></div>
);

const header = (
  <div className="card-header" key="header">
    <small class="text-muted">
      <div class="row justify-content-between">
        <div class="col-4">
          <Widget
            src={`neardevgov.near/widget/ProfileLine`}
            props={{ accountId: post.author_id }}
          />
        </div>
        <div class="col-5">
          <div class="d-flex justify-content-end">
            {timestamp}
            <div class="bi bi-clock-history px-2"></div>
          </div>
        </div>
      </div>
    </small>
  </div>
);

const footerSearch = props.seachKeywords ? (
  <div className="card-footer" key="footer-search">
    <small class="text-muted">{postSearchKeywords}</small>
  </div>
) : (
  <div key="footer-search"></div>
);

const emptyIcons = {
  Idea: "bi-lightbulb",
  Comment: "bi-chat",
  Submission: "bi-rocket",
  Attestation: "bi-check-circle",
  Sponsorship: "bi-cash-coin",
  Github: "bi-github",
  Like: "bi-heart",
  Reply: "bi-reply",
};

const fillIcons = {
  Idea: "bi-lightbulb-fill",
  Comment: "bi-chat-fill",
  Submission: "bi-rocket-fill",
  Attestation: "bi-check-circle-fill",
  Sponsorship: "bi-cash-coin",
  Github: "bi-github",
  Like: "bi-heart-fill",
  Reply: "bi-reply-fill",
};

const containsLike = post.likes.find((l) => l.author_id == context.accountId);
const likeBtnClass = containsLike ? fillIcons.Like : emptyIcons.Like;
const onLike = () => {
  Near.call(
    nearDevGovGigsContractAccountId,
    "add_like",
    {
      post_id: postId,
    },
    100_000_000_000_000n,
    2_000_000_000_000_000_000_000n
  );
};

const buttonsFooter = props.isPreview ? null : (
  <div class="row mt-2" key="buttons-footer">
    <div class="col-8">
      <div class="btn-group" role="group" aria-label="Basic outlined example">
        <button
          type="button"
          class="btn btn-outline-primary"
          style={{ border: "0px" }}
          onClick={onLike}
        >
          <i class={`bi ${likeBtnClass}`}> </i>
          Like ({post.likes.length ?? 0})
        </button>
        <div class="btn-group" role="group">
          <a
            class="card-link"
            href={href("Post", { id: postId })}
            role="button"
            class="btn btn-outline-primary"
            style={{ border: "0px" }}
            target="_blank"
            title="Open in new tab"
          >
            <div class="bi bi-share"> Open</div>
          </a>
        </div>
        <a
          class="card-link"
          href={href("Post", { id: postId })}
          role="button"
          class="btn btn-outline-primary"
          style={{ border: "0px" }}
          target="_blank"
          title="Open in new tab"
        >
          <div class="bi bi-arrows-expand">{` Check Replies (${childPostIds.length})`}</div>
        </a>
      </div>
    </div>
  </div>
);

const renamedPostType =
  snapshot.post_type == "Submission" ? "Solution" : snapshot.post_type;

const postLabels = post.snapshot.labels ? (
  <div class="card-title" key="post-labels">
    {post.snapshot.labels.map((label) => {
      return (
        <a href={href("Feed", { label }, label)}>
          <span class="badge text-bg-primary me-1">{label}</span>
        </a>
      );
    })}
  </div>
) : (
  <div key="post-labels"></div>
);

const postTitle =
  snapshot.post_type == "Comment" ? (
    <div key="post-title"></div>
  ) : (
    <h5 class="card-title" key="post-title">
      <div className="row justify-content-between">
        <div class="col-9">
          <i class={`bi ${emptyIcons[snapshot.post_type]}`}> </i>
          {renamedPostType}: {snapshot.name}
        </div>
      </div>
    </h5>
  );

const postExtra =
  snapshot.post_type == "Sponsorship" ? (
    <div key="post-extra">
      <h6 class="card-subtitle mb-2 text-muted">
        Maximum amount: {snapshot.amount} {snapshot.sponsorship_token}
      </h6>
      <h6 class="card-subtitle mb-2 text-muted">
        Supervisor:{" "}
        <Widget
          src={`neardevgov.near/widget/ProfileLine`}
          props={{ accountId: snapshot.supervisor }}
        />
      </h6>
    </div>
  ) : (
    <div></div>
  );

const limitedMarkdown = styled.div`
  max-height: 10em;
  
  border-bottom: 1px solid rgba(0,0,0,0.03);
    border-radius: 10px;
    
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
      background: rgba(0,0,0,0.03); 
      border-radius: 10px;
      
  }

  ::-webkit-scrollbar-thumb {
      background: rgba(0,0,0,0.175); 
      border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
      background: #888; 
  }
`;

const onMention = (accountId) => (
  <span key={accountId} className="d-inline-flex" style={{ fontWeight: 500 }}>
    <Widget
      src="neardevgov.near/widget/ProfileLine"
      props={{
        accountId: accountId.toLowerCase(),
        hideAccountId: true,
        tooltip: true,
      }}
    />
  </span>
);

const descriptionArea = (
  <limitedMarkdown className="overflow-auto" key="description-area">
    <Markdown
      class="card-text"
      text={snapshot.description}
      onMention={onMention}
    />
  </limitedMarkdown>
);

return (
  <div className={`card my-2`}>
    {header}
    <div className="card-body">
      {postLabels}
      {postTitle}
      {postExtra}
      {descriptionArea}
      {buttonsFooter}
    </div>
    {footerSearch}
  </div>
);
