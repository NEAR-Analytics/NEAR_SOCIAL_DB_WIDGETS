const ownerId = "contribut3.near";
const accountId = props.accountId;
const notStandalone = props.notStandalone ?? false;
const isPreview = props.isPreview ?? false;

if (!accountId) {
  return "Cannot show entity without account ID!";
}

State.init({
  content: props.content ?? "requests",
});

const entity = Near.view(
  ownerId,
  "get_entity",
  { account_id: accountId },
  "final"
);

const currentContributor = Near.view(
  ownerId,
  "get_contribution",
  { entity_id: accountId, contributor_id: context.accountId },
  "final"
);

const isAuthorized =
  !!currentContributor && currentContributor.permissions.includes("Admin");

const contributions = Near.view(
  ownerId,
  "get_entity_contributions",
  { entity_id: accountId },
  "final"
);

const [[founder]] = (contributions ?? []).filter((contribution) => {
  const [_, details] = contribution;
  const all = [...details.history, details.current];
  return all.some((detail) => detail.description === "");
});

const body = (
  <div className="px-3">
    <div className="d-flex flex-row justify-content-start" id={accountId}>
      <div className="flex-grow-1 py-3">
        <Widget
          src={`${ownerId}/widget/ProfileLine`}
          props={{
            accountId,
            isEntity: true,
            imageSize: "4em",
            update: props.update,
            additionalColumn: (
              <div className="d-flex flex-row justify-content-end align-items-start ps-4 py-3">
                <a
                  className="btn me-2 text-light"
                  style={{ backgroundColor: "#6941C6", borderColor: "#6941C6" }}
                  href={`https://near.social/#/${ownerId}/widget/Entity?accountId=${accountId}`}
                >
                  <i className="bi-person-up" />
                  <span>Invite to contribute</span>
                </a>
              </div>
            ),
            additionalRow: (
              <>
                <div className="d-flex flex-row justify-content-start align-items-center">
                  <span className="text-muted">
                    Created{" "}
                    {new Date(Number(entity.start_date)).toLocaleDateString()}
                  </span>
                  <Widget
                    src={`${ownerId}/widget/ActivityIndicator`}
                    props={{ active: entity.status === "Active" }}
                  />
                </div>
              </>
            ),
          }}
        />
      </div>
    </div>
    <div className="text-truncate my-2">{profile.description}</div>
    <div className="text-truncate text-muted">
      {tags.length > 0 ? (
        <>
          {tags.map((tag) => (
            <span
              className="d-inline-block mx-1 py-1 px-2 badge border border-secondary text-secondary text-muted text-center"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  </div>
);

const contentSelectButton = ({ id, text, icon }) => (
  <a
    className={`btn ${state.content === id ? "btn-secondary" : "btn-outline-secondary"
      }`}
    href={`https://near.social/#/${ownerId}/widget/Index?tab=dashboard&content=${id}${props.search ? "&search=" + props.search : ""
      }&accountId=${accountId}`}
    onClick={() => State.update({ content: id })}
  >
    <i className={icon} />
    <span>{text}</span>
  </a>
);

const contentSelector = (
  <div className="btn-group" role="group" aria-label="Content Tab Selector">
    {contentSelectButton({
      id: "requests",
      text: "Requests",
      icon: "bi-boxes",
    })}
    {contentSelectButton({
      id: "contributions",
      text: "Contributions",
      icon: "bi-people",
    })}
  </div>
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
  contributions: (
    <Widget
      src={`${ownerId}/widget/ContributionList`}
      props={{ search: state.search, update: props.update }}
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
