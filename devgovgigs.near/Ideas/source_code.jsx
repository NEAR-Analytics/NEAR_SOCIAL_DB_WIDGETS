const ownerId = "devgovgigs.near";
const postId = "Root";
const postIds = Near.view(ownerId, "get_children_ids").reverse();

// TODO: Sort ideas based on how much in total USD equivalent was pledged through sponsorships.
// TODO: Sort ideas based on a criteria that includes social activity, like attestations.

const Card = styled.div`
  &:hover {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
  }

`;

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
          parentId: null,
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
          parentId: null,
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
          parentId: null,
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
          parentId: null,
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
          parentId: null,
        }}
      />
    </div>
  </div>
);

return (
  <div>
    <div class="card border-secondary">
      <div class="nav navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <div class="navbar-brand">
            <Widget
              src="mob.near/widget/ProfileImage"
              props={{
                metadata,
                accountId,
                widgetName,
                style: { height: "2.5em", width: "2.5em", minWidth: "2.5em" },
                className: "me-2",
              }}
            />
          </div>
          <div class="nav navbar-brand h1">Create</div>

          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                  data-bs-toggle="collapse"
                  href={`#collapseIdeaEditor${postId}`}
                  role="button"
                  aria-expanded="false"
                  aria-controls={`collapseIdeaEditor${postId}`}
                >
                  <i class="bi-lightbulb"> </i>
                  Idea
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link active"
                  href="#"
                  data-bs-toggle="collapse"
                  href={`#collapseSubmissionEditor${postId}`}
                  role="button"
                  aria-expanded="false"
                  aria-controls={`collapseSubmissionEditor${postId}`}
                >
                  <i class="bi-rocket"> </i>
                  Solution
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link active"
                  href="#"
                  data-bs-toggle="collapse"
                  href={`#collapseAttestationEditor${postId}`}
                  role="button"
                  aria-expanded="false"
                  aria-controls={`collapseAttestationEditor${postId}`}
                >
                  <i class="bi-check-circle"> </i>
                  Attestation
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link active"
                  href="#"
                  data-bs-toggle="collapse"
                  href={`#collapseSponsorshipEditor${postId}`}
                  role="button"
                  aria-expanded="false"
                  aria-controls={`collapseSponsorshipEditor${postId}`}
                >
                  <i class="bi-cash-coin"> </i>
                  Sponsorship
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {editorsFooter}
    </div>

    {postIds
      ? postIds.map((postId) => {
          return (
            <Widget src={`${ownerId}/widget/Post`} props={{ id: postId }} />
          );
        })
      : ""}
  </div>
);
