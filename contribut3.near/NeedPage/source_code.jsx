const ownerId = "contribut3.near";
const accountId = props.accountId;
const cid = props.cid;

if (!accountId || !cid) {
  return "Cannot show the request page without an account ID and a CID!";
}

State.init({
  content: props.content ?? "requests",
  search: props.search ?? "",
});

const need = Near.view(
  ownerId,
  "get_contribution_need",
  { account_id: accountId, cid },
  "final",
  true
);

const isAuthorized = Near.view(
  ownerId,
  "check_is_manager_or_higher",
  { entity_id: accountId, account_id: context.accountId },
  "final"
);

const profile = Social.getr(`${accountId}/profile`);

const body = (
  <div className="px-3">
    <div className="d-flex flex-row justify-content-start" id={accountId}>
      <div className="flex-grow-1 py-3">
        <div className="d-flex flex-row justify-content-between align-items-start">
          <h1 className="flex-grow-1">
            Need for{" "}
            {typeof need.contribution_type === "string"
              ? need.contribution_type
              : need.contribution_type.Other}
          </h1>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <a
              className="btn me-2 mb-2 text-light"
              style={{
                backgroundColor: "#6941C6",
                borderColor: "#6941C6",
              }}
            // href={`https://near.social/#/${ownerId}/widget/Entity?accountId=${accountId}`}
            >
              <i className="bi-person-plus" />
              <span className="text-nowrap">Invite contributor</span>
            </a>
            <Widget
              src={`${ownerId}/widget/CardMenu`}
              props={{
                update: props.update,
                items: [
                  {
                    text: "Create new request",
                    icon: "bi-boxes",
                  },
                  {
                    text: "Invite contributors",
                    icon: "bi-person-plus",
                  },
                  {
                    text: "Delete project",
                    icon: "bi-trash",
                  },
                ],
              }}
            />
          </div>
        </div>
        <span className="text-muted me-2">
          Created {new Date(Number(entity.start_date)).toLocaleDateString()}
        </span>
        <Widget
          src={`${ownerId}/widget/ActiveIndicator`}
          props={{ active: entity.status === "Active" }}
        />
      </div>
      <Widget src={`${ownerId}/widget/Tags`} pros={{ tags: profile.tags }} />
    </div>
    <Markdown text={profile.description || "s ".repeat(1000)} />
    <div className="d-flex flex-row justify-content-between align-items-center">
      <Widget
        src={`${ownerId}/widget/SocialLinks`}
        props={{ links: profile.linktree ?? {} }}
      />
      <Widget
        src={`${ownerId}/widget/ProfileLine`}
        props={{ accountId: founder }}
      />
    </div>
  </div>
);

const proposalsCount = (
  Near.view(
    ownerId,
    "get_entity_contribution_requests",
    { entity_id: accountId },
    "final",
    true
  ) ?? []
).length;

const invitesCount = Object.keys(
  Near.view(
    ownerId,
    "get_entity_invites",
    { account_id: accountId },
    "final",
    true
  ) ?? {}
).length;

const contentSelector = (
  <Widget
    src={`${ownerId}/widget/TabSelector`}
    props={{
      tab: "entity",
      content: state.content,
      search: state.search,
      accountId: props.accountId,
      update: (content) => State.update({ content }),
      buttons: [
        {
          id: "requests",
          text: "Requests",
          icon: "bi-boxes",
        },
        isAuthorized
          ? {
            id: "proposals",
            text: "Proposals",
            icon: "bi-person-down",
            count: proposalsCount,
          }
          : null,
        isAuthorized
          ? {
            id: "invitations",
            text: "Invitations",
            icon: "bi-hourglass",
            count: invitesCount,
          }
          : null,
        {
          id: "contributions",
          text: "Contributes to",
          icon: "bi-person-up",
        },
        {
          id: "contributors",
          text: "Contributors",
          icon: "bi-people",
        },
      ].filter((x) => x !== null),
    }}
  />
);

const searchBar = (
  <div className="w-25 col-12 col-md-10 col-lg-8">
    <div className="card card-sm">
      <div className="card-body row p-0 ps-2 align-items-center">
        <div className="col-auto pe-0 me-0">
          <i className="bi-search" />
        </div>
        <div className="col ms-0">
          <input
            className="form-control border-0"
            type="search"
            value={state.search}
            placeholder="Search"
            onChange={(e) => State.update({ search: e.target.value })}
          />
        </div>
      </div>
    </div>
  </div>
);

const content = {
  requests: (
    <Widget
      src={`${ownerId}/widget/NeedList`}
      props={{ accountId, search: state.search, update: props.update }}
    />
  ),
  proposals: (
    <Widget
      src={`${ownerId}/widget/ContributionRequestList`}
      props={{ accountId, search: state.search, update: props.update }}
    />
  ),
  contributions: (
    <Widget
      src={`${ownerId}/widget/ContributionList`}
      props={{ search: state.search, update: props.update }}
    />
  ),
  contributors: (
    <Widget
      src={`${ownerId}/widget/ContributorList`}
      props={{ accountId, search: state.search, update: props.update }}
    />
  ),
  invitations: (
    <Widget
      src={`${ownerId}/widget/InviteList`}
      props={{ accountId, search: state.search, update: props.update }}
    />
  ),
}[state.content];

return (
  <div className="">
    <div className="mb-5">{body}</div>
    <div className="d-flex flex-row justify-content-between ps-3">
      {contentSelector}
      {searchBar}
    </div>
    <div className="px-3 pt-3">{content}</div>
  </div>
);
