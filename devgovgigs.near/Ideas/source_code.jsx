const ownerId = "devgovgigs.near";
const postId = "Root";

initState({
  recency: props.recency,
  label: props.label,
  isBoardsSelected: false,
});

const defaultSelectedLabels = props.label ? [{ name: props.label }] : [];

const home = "https://near.social/#/devgovgigs.near/widget/Ideas";

const labels = Near.view(ownerId, "get_all_labels");
const wrappedLabels = labels.map((l) => {
  return { name: l };
});

const onHomeClick = () => {
  State.update({
    recency: null,
    label: null,
    isBoardsSelected: false,
  });
};

const onRecentClick = () => {
  State.update({
    recency: "all",
    label: null,
    isBoardsSelected: false,
  });
};

const onLabelSelected = (selectedLabels) => {
  if (selectedLabels.length == 1) {
    console.log("Selected label %s", selectedLabels[0].name);
    State.update({
      label: selectedLabels[0].name,
      recency: null,
    });
  } else {
    console.log("Unselected label");
    State.update({
      recency: props.recency,
      label: null,
      isBoardsSelected: false,
    });
  }
};

const onBoardsClick = () => {
  State.update({
    isBoardsSelected: true,
  });
};

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

const controls = (
  <div class="card border-secondary mb-2">
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
                <i class="bi-lightbulb-fill"> </i>
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
                <i class="bi-rocket-fill"> </i>
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
                <i class="bi-check-circle-fill"> </i>
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
);

const navbar = (
  <div class="card border-secondary">
    <div class="nav navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item ">
            <a
              class="nav-link active button"
              onClick={onHomeClick}
              role="button"
            >
              <i class="bi-house-fill"> </i>
              Home
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" onClick={onRecentClick} role="button">
              <i class="bi-fire"> </i>
              Recent
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" onClick={onBoardsClick} role="button">
              <i class="bi-kanban"> </i>
              Boards
            </a>
          </li>
          <li class="nav-item active ms-2">
            <Typeahead
              clearButton
              id="basic-typeahead-single"
              labelKey="name"
              onChange={onLabelSelected}
              options={wrappedLabels}
              placeholder="Search"
              defaultSelected={defaultSelectedLabels}
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
);

return (
  <div>
    {controls}
    {navbar}
    {state.isBoardsSelected ? (
      <Widget src={`${ownerId}/widget/KanbanBoardList`} />
    ) : (
      <Widget
        src={`${ownerId}/widget/IdeasList`}
        props={{ recency: state.recency, label: state.label }}
      />
    )}
  </div>
);
