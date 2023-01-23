const ownerId = "contribut3.near";
const entityId = props.entityId;
const contributorId = props.contributorId;

if (!entityId || !contributorId) {
  return (
    <div>
      Cannot show contribution request without entityId or contributorId!
    </div>
  );
}

const contributionRequest =
  props.contributionRequest ??
  Near.view(ownerId, "get_contribution_request", {
    entity_id: entityId,
    contributor_id: contributorId,
  });
if (!contributionRequest) {
  return <div>Loading...</div>;
}

const snapshot = post.snapshot;
// If this post is displayed under another post. Used to limit the size.
const isUnderPost = props.isUnderPost ? true : false;

const shareButton = props.isPreview ? null : (
  <a
    class="card-link"
    href={`https://near.social/#/${ownerId}/widget/ContributionRequest?entityId=${entityId}&contributorId=${contributorId}`}
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
            props={{ accountId: contributorId }}
          />
        </div>
        <div class="col-5">
          <div class="d-flex justify-content-end">{shareButton}</div>
        </div>
      </div>
    </small>
  </div>
);

const entityLink = (
  <Widget src={`mob.near/widget/ProfileLine`} props={{ accountId: entityId }} />
);

const postTitle = (
  <h5 class="card-title">
    <div className="row justify-content-between">
      <div class="col-9">Contribution Request for {entityLink}</div>
    </div>
  </h5>
);

const description = isPreview
  ? snapshot.description
  : contributionRequest.description;

// Should make sure the posts under the currently top viewed post are limited in size.
const descriptionArea = isUnderPost ? (
  <limitedMarkdown className="overflow-auto">
    <Markdown class="card-text" text={description}></Markdown>
  </limitedMarkdown>
) : (
  <Markdown class="card-text" text={description}></Markdown>
);

return (
  <div className={`card my-2`}>
    {header}
    <div className="card-body">
      {postTitle}
      {descriptionArea}
    </div>
  </div>
);
