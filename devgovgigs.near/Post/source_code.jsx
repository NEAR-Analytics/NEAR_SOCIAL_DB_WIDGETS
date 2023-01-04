const ownerId = "devgovgigs.near";
const postId = props.post.id ?? (props.id ? parseInt(props.id) : 0);
const post = props.post ?? Near.view(ownerId, "get_post", { post_id: postId });
const snapshot = post.snapshot;
// If this post is displayed under another post. Used to limit the size.
const isUnderPost = props.isUnderPost ? true : false;

const childPostIdsUnordered =
  Near.view(ownerId, "get_children_ids", {
    post_id: postId,
  }) ?? [];

const childPostIds = props.isPreview ? [] : childPostIdsUnordered.reverse();

function readableDate(timestamp) {
  var a = new Date(timestamp);
  return a.toDateString() + " " + a.toLocaleTimeString();
}

const timestamp = readableDate(
  snapshot.timestamp ? snapshot.timestamp / 1000000 : Date.now()
);

// TODO: Implement editing posts.
// const editControl =
//   post.author_id == context.accountId && !props.isPreview ? (
//     <a class="card-link px-2" role="button" title="Edit post">
//       <div class="bi bi-pencil-square"></div>
//     </a>
//   ) : null;

const editControl = null;

const shareButton = props.isPreview ? null : (
  <a
    class="card-link"
    href={`https://near.social/#/devgovgigs.near/widget/Post?id=${postId}`}
    role="button"
    target="_blank"
    title="Open in new tab"
  >
    <div class="bi bi-share"></div>
  </a>
);

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
            {shareButton}
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
  Idea: "border-secondary",
  Comment: "border-secondary",
  Submission: "border-secondary",
  Attestation: "border-secondary",
  Sponsorship: "border-secondary",
};

const containsLike = props.isPreview
  ? false
  : post.likes.find((l) => l.author_id == context.accountId);
const likeBtnClass = containsLike ? fillIcons.Like : emptyIcons.Like;
const onLike = () => {
  Near.call(ownerId, "add_like", {
    post_id: postId,
  });
};

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
              <a
                class="dropdown-item"
                href="#"
                data-bs-toggle="collapse"
                href={`#collapseIdeaEditor${postId}`}
                role="button"
                aria-expanded="false"
                aria-controls={`collapseIdeaEditor${postId}`}
              >
                <i class={`bi ${emptyIcons.Idea}`}> </i> Idea
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                href="#"
                data-bs-toggle="collapse"
                href={`#collapseSubmissionEditor${postId}`}
                role="button"
                aria-expanded="false"
                aria-controls={`collapseSubmissionEditor${postId}`}
              >
                <i class={`bi ${emptyIcons.Submission}`}> </i> Solution
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                href="#"
                data-bs-toggle="collapse"
                href={`#collapseAttestationEditor${postId}`}
                role="button"
                aria-expanded="false"
                aria-controls={`collapseAttestationEditor${postId}`}
              >
                <i class={`bi ${emptyIcons.Attestation}`}> </i> Attestation
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                href="#"
                data-bs-toggle="collapse"
                href={`#collapseSponsorshipEditor${postId}`}
                role="button"
                aria-expanded="false"
                aria-controls={`collapseSponsorshipEditor${postId}`}
              >
                <i class={`bi ${emptyIcons.Sponsorship}`}> </i> Sponsorship
              </a>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <a
                class="dropdown-item"
                href="#"
                data-bs-toggle="collapse"
                href={`#collapseCommentEditor${postId}`}
                role="button"
                aria-expanded="false"
                aria-controls={`collapseCommentEditor${postId}`}
              >
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

const editorsFooter = props.isPreview ? null : (
  <div class="row" id={`accordion${postId}`}>
    <div
      class="collapse"
      id={`collapseCommentEditor${postId}`}
      data-bs-parent={`#accordion${postId}`}
    >
      <Widget
        src={`${ownerId}/widget/PostEditor`}
        props={{
          postType: "Comment",
          parentId: postId,
        }}
      />
    </div>
    <div
      class="collapse"
      id={`collapseIdeaEditor${postId}`}
      data-bs-parent={`#accordion${postId}`}
    >
      <Widget
        src={`${ownerId}/widget/PostEditor`}
        props={{
          postType: "Idea",
          parentId: postId,
        }}
      />
    </div>
    <div
      class="collapse"
      id={`collapseSubmissionEditor${postId}`}
      data-bs-parent={`#accordion${postId}`}
    >
      <Widget
        src={`${ownerId}/widget/PostEditor`}
        props={{
          postType: "Submission",
          parentId: postId,
        }}
      />
    </div>
    <div
      class="collapse"
      id={`collapseAttestationEditor${postId}`}
      data-bs-parent={`#accordion${postId}`}
    >
      <Widget
        src={`${ownerId}/widget/PostEditor`}
        props={{
          postType: "Attestation",
          parentId: postId,
        }}
      />
    </div>
    <div
      class="collapse"
      id={`collapseSponsorshipEditor${postId}`}
      data-bs-parent={`#accordion${postId}`}
    >
      <Widget
        src={`${ownerId}/widget/PostEditor`}
        props={{
          postType: "Sponsorship",
          parentId: postId,
        }}
      />
    </div>
  </div>
);

const renamedPostType =
  snapshot.post_type == "Submission" ? "Solution" : snapshot.post_type;

const postTitle =
  snapshot.post_type == "Comment" ? null : (
    <h5 class="card-title">
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
                  props={{ id: childId, isUnderPost: true }}
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

const limitedMarkdown = styled.div`
      max-height: 20em;
`;

// Should make sure the posts under the currently top viewed post are limited in size.
const descriptionArea = isUnderPost ? (
  <limitedMarkdown className="overflow-auto">
    <Markdown class="card-text" text={snapshot.description}></Markdown>
  </limitedMarkdown>
) : (
  <Markdown class="card-text" text={snapshot.description}></Markdown>
);

return (
  <Card className={`card my-2 ${borders[snapshot.post_type]}`}>
    {header}
    <div className="card-body">
      {postTitle}
      {postExtra}
      {descriptionArea}
      {buttonsFooter}
      {editorsFooter}
      {postsList}
    </div>
  </Card>
);
