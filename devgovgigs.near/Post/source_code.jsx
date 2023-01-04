const ownerId = "devgovgigs.near";
const postId = props.post.id ?? (props.id ? parseInt(props.id) : 0);
const post = props.post ?? Near.view(ownerId, "get_post", { post_id: postId });
const snapshot = post.snapshot;

const childPostIds = Near.view(ownerId, "get_children_ids", {
  post_id: postId,
});

function readableDate(timestamp) {
  var a = new Date(timestamp);
  return a.toDateString() + " " + a.toLocaleTimeString();
}

const timestamp = readableDate(
  snapshot.timestamp ? snapshot.timestamp / 1000000 : Date.now()
);

const editControl =
  post.author_id == context.accountId ? (
    <a class="card-link px-2" role="button" title="Edit post">
      <div class="bi bi-pencil-square"></div>
    </a>
  ) : null;

const header = (
  <div className="card-header">
    <small class="text-muted">
      <div class="row justify-content-between">
        <div class="col-4">
          <Widget
            src={`mob.near/widget/ProfileLine`}
            props={{ accountId: post.author_id }}
          />
        </div>
        <div class="col-5">
          <div class="d-flex justify-content-end">
            {editControl}
            {timestamp}
            <div class="bi bi-clock-history px-2"></div>
            <a
              class="card-link"
              href={`https://near.social/#/devgovgigs.near/widget/Post?id=${postId}`}
              role="button"
              target="_blank"
              title="Open in new tab"
            >
              <div class="bi bi-share"></div>
            </a>
          </div>
        </div>
      </div>
    </small>
  </div>
);

const emptyIcons = {
  Idea: "bi-lightbulb",
  Comment: "bi-chat",
  Submission: "bi-rocket",
  Attestation: "bi-check-circle",
  Sponsorship: "bi-cash-coin",
  Like: "bi-heart",
  Reply: "bi-reply",
};

const fillIcons = {
  Idea: "bi-lightbulb-fill",
  Comment: "bi-chat-fill",
  Submission: "bi-rocket-fill",
  Attestation: "bi-check-circle-fill",
  Sponsorship: "bi-cash-coin",
  Like: "bi-heart-fill",
  Reply: "bi-reply-fill",
};

const borders = {
  Idea: "border-primary",
  Comment: "border-light",
  Submission: "border-secondary",
  Attestation: "border-success",
  Sponsorship: "border-success",
};

const containsLike = props.isPreview
  ? false
  : post.likes.find((l) => l.author_id == context.accountId);
const likeBtnClass = containsLike ? emptyIcons.Like : fillIcons.Like;
const onLike = () => {
  Near.call(ownerId, "like", {
    post_type: "Sponsorship",
    post_id: sponsorship_id,
  });
};

const Button = styled.button`
.btn-bd-primary {
  --bs-btn-font-weight: 600;
  --bs-btn-color: var(--bs-white);
  --bs-btn-bg: var(--bd-violet);
  --bs-btn-border-color: var(--bd-violet);
  --bs-btn-border-radius: .5rem;
  --bs-btn-hover-color: var(--bs-white);
  --bs-btn-hover-bg: #{shade-color($bd-violet, 10%)};
  --bs-btn-hover-border-color: #{shade-color($bd-violet, 10%)};
  --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
  --bs-btn-active-color: var(--bs-btn-hover-color);
  --bs-btn-active-bg: #{shade-color($bd-violet, 20%)};
  --bs-btn-active-border-color: #{shade-color($bd-violet, 20%)};
}
`;

const buttonsFooter = props.isPreview ? null : (
  <div class="row">
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
          <button
            type="button"
            class="btn btn-outline-primary"
            style={{ border: "0px" }}
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class={`bi ${emptyIcons.Reply}`}> </i> Reply
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#">
                <i class={`bi ${emptyIcons.Idea}`}> </i> Idea
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                <i class={`bi ${emptyIcons.Submission}`}> </i> Solution
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                <i class={`bi ${emptyIcons.Attestation}`}> </i> Attestation
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                <i class={`bi ${emptyIcons.Sponsorship}`}> </i> Sponsorship
              </a>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <a class="dropdown-item" href="#">
                <i class={`bi ${emptyIcons.Comment}`}> </i> Comment
              </a>
            </li>
          </ul>
        </div>
        <button
          type="button"
          class="btn btn-outline-primary"
          style={{ border: "0px" }}
          data-bs-toggle="collapse"
          href={`#collapseChildPosts${postId}`}
          aria-expanded="false"
          aria-controls={`collapseChildPosts${postId}`}
        >
          <i class="bi bi-arrows-expand"> </i> Expand Replies
        </button>
      </div>
    </div>
  </div>
);

const postTitle =
  snapshot.post_type == "Comment" ? null : (
    <h5 class="card-title">
      <div className="row justify-content-between">
        <div class="col-9">
          <i class={`bi ${emptyIcons[snapshot.post_type]}`}> </i>
          {snapshot.post_type}: {snapshot.name}
        </div>
      </div>
    </h5>
  );

const postExtra =
  snapshot.post_type == "Sponsorship" ? (
    <div>
      <h6 class="card-subtitle mb-2 text-muted">
        Maximum amount: {snapshot.amount} {snapshot.sponsorship_token}
      </h6>
      <h6 class="card-subtitle mb-2 text-muted">
        Supervisor:{" "}
        <Widget
          src={`mob.near/widget/ProfileLine`}
          props={{ accountId: snapshot.supervisor }}
        />
      </h6>
    </div>
  ) : null;

const postsList =
  props.isPreview || childPostIds.length == 0 ? null : (
    <div class="row">
      <div class="collapse" id={`collapseChildPosts${postId}`}>
        {childPostIds
          ? childPostIds.map((childId) => {
              return (
                <Widget
                  src={`${ownerId}/widget/Post`}
                  props={{ id: childId }}
                />
              );
            })
          : ""}
      </div>
    </div>
  );

const Card = styled.div`
  &:hover {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
  }

`;

return (
  <Card className={`card my-2 ${borders[snapshot.post_type]}`}>
    {header}
    <div className="card-body">
      {postTitle}
      {postExtra}
      <Markdown class="card-text" text={snapshot.description}></Markdown>
      {buttonsFooter}
      {postsList}
    </div>
  </Card>
);
