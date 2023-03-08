const badgeName = props.badge_name;
const admins = ["manzanal.near", "infinity.near"];
const isAdmin = admins.includes(context.accountId);
const limit = props.limit || 24;
if (!badgeName) return "Provide a badgeName";
const badgesQuery = Social.getr(`*/badge/${badgeName}/*`, "final");
if (!badgesQuery) return "Loading...";
if (Object.keys(badgesQuery).length == 0) return "Badge does not exist";
let badgeInfo = Object.values(badgesQuery)[0].badge[badgeName].info;
const widgetBuilderQuery = "*/widget/*";
const featureBuilderQuery = "*/widget/*/metadata/tags/app";
const predefinedQueries = [
  { name: "Widget Builders", query: widgetBuilderQuery },
  { name: "Feature Builders", query: featureBuilderQuery },
];

const data = Social.keys(`*/badge/${badgeName}/holder/*`, "final");

if (!data) {
  return "Loading";
}
State.init({
  accountsOnPath: [],
  activeTab: "owners",
  peopleSelected: [],
  badgeInfo: {
    key: "",
    name: "",
    description: "",
    image: "",
  },
});

const BadgeImg = styled.img`
  objectFit: "cover";
  objectPosition: "center";
  height: ${size};
  width: ${size};
`;

let accounts = Object.keys(data);
const numAccounts = accounts.length;
accounts = accounts.slice(numAccounts - limit, numAccounts);
const allPeople = [];

for (let i = 0; i < accounts.length; ++i) {
  const accountId = accounts[i];

  allPeople.push(
    <a
      href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
      className="text-decoration-none"
      key={`people_${i}`}
    >
      <Widget
        src="mob.near/widget/ProfileImage"
        props={{
          accountId,
          tooltip: true,
          className: "d-inline-block overflow-hidden",
        }}
      />
    </a>
  );
}

const onProfileClick = (accountId) => {
  if (state.peopleSelected.includes(accountId)) {
    // remove account
    State.update({
      peopleSelected: [...state.peopleSelected.filter((i) => i !== accountId)],
    });
  } else {
    // add account
    State.update({ peopleSelected: [...state.peopleSelected, accountId] });
  }
};

const noBadgepeople = [];
const pathQueryPeople = [];
for (let i = 0; i < state.accountsOnPath.length; ++i) {
  const accountId = state.accountsOnPath[i];
  const isSelected = state.peopleSelected.includes(accountId);
  const hasBadge = accounts.includes(accountId);
  if (!hasBadge) noBadgepeople.push(accountId);

  pathQueryPeople.push(
    <button
      className={`btn ${
        isSelected ? "btn-outline-primary" : "text-decoration-none"
      }`}
      key={`people_on_path_${i}`}
      onClick={() => {
        !hasBadge && onProfileClick(accountId);
      }}
    >
      <Widget
        src="mob.near/widget/ProfileImage"
        props={{
          accountId,
          tooltip: true,
          className: "d-inline-block overflow-hidden",
        }}
      />
      {hasBadge && (
        <span class="position-absolute top-10 start-90 translate-middle p-2 bg-secondary border border-light rounded-circle">
          <span class="visually-hidden">Account with badge</span>
        </span>
      )}
    </button>
  );
}
const mintButton = (badgeData, buttonText, holders) => {
  return (
    <CommitButton
      data={{
        badge: {
          [badgeData.key]: {
            info: badgeData.info,
            holder: {
              [holders]: "",
            },
          },
        },
      }}
    >
      {buttonText}
      <span class="badge badge-info">{holders.length}</span>
    </CommitButton>
  );
};

const createNewBadgeForm = () => {
  return (
    <>
      <div class="form-group row">
        <label for="name" class="col-sm-2 col-form-label">
          Key (unique)
        </label>
        <div class="col-sm-10">
          <input
            type="text"
            className={`form-control`}
            id="name"
            value={state.badgeInfo.key}
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="name" class="col-sm-2 col-form-label">
          Name
        </label>
        <div class="col-sm-10">
          <input
            type="text"
            className={`form-control`}
            id="name"
            value={state.badgeInfo.name}
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="description" class="col-sm-2 col-form-label">
          Description
        </label>
        <div class="col-sm-10">
          <input
            type="text"
            className={`form-control`}
            id="name"
            value={state.badgeInfo.description}
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="description" class="col-sm-2 col-form-label">
          Image
        </label>

        <div class="col-sm-10">
          <IpfsImageUpload image={state.badgeInfo.image} />
        </div>

        <div class="ratio ratio-1x1 overflow-hidden" style={{ width: "8rem" }}>
          {state.badgeInfo.image.cid && (
            <img
              src={`https://ipfs.near.social/ipfs/${state.badgeInfo.image.cid}`}
              alt="badge"
            />
          )}
        </div>
      </div>
      {mintButton(
        {
          key: state.badgeInfo.key.replace(/ /g, ""),
          info: {
            name: state.badgeInfo.name,
            description: state.badgeInfo.description,
            image: {
              url: `https://ipfs.near.social/ipfs/${state.badgeInfo.image.cid}`,
            },
          },
        },
        "Create new Badge",
        []
      )}
    </>
  );
};
const badgeDetails = () => {
  return (
    <>
      <div class="form-group row">
        <label for="name" class="col-sm-2 col-form-label">
          Key (unique)
        </label>
        <div class="col-sm-10">
          <p class="form-control-plaintext">{badgeName}</p>
        </div>
      </div>
      <div class="form-group row">
        <label for="name" class="col-sm-2 col-form-label">
          Name
        </label>
        <div class="col-sm-10">
          <p class="form-control-plaintext">{badgeInfo.name}</p>
        </div>
      </div>
      <div class="form-group row">
        <label for="description" class="col-sm-2 col-form-label">
          Description
        </label>
        <div class="col-sm-10">
          <p class="form-control-plaintext">{badgeInfo.description}</p>
        </div>
      </div>
      <div class="form-group row">
        <label for="description" class="col-sm-2 col-form-label">
          Image
        </label>
        <div class="ratio ratio-1x1 overflow-hidden" style={{ width: "8rem" }}>
          <BadgeImg
            src={badgeInfo.image.url}
            alt="badge"
            title={badgeInfo.description}
          />
        </div>
      </div>
    </>
  );
};

const navItemButton = (tabId, tabText, disabled) => {
  return (
    <button
      className={`${disabled ? "disabled" : ""}  nav-link ${
        state.activeTab == tabId ? "active" : ""
      }`}
      id={tabId}
      data-mdb-toggle="tab"
      role="tab"
      aria-controls={tabId}
      aria-selected="true"
      onClick={() => {
        State.update({ activeTab: tabId });
      }}
    >
      {tabText}
    </button>
  );
};
const onUpdateSearchResult = (result) => {
  State.update({ accountsOnPath: result });
};

return (
  <div>
    <div class="d-flex flex-row">
      <Widget
        class="mr-6"
        src="manzanal.near/widget/Badge"
        props={{ badge_name: badgeName, size: "8rem", full_card: true }}
      />
    </div>

    <ul class="nav nav-tabs my-3" id="ex1" role="tablist">
      <li class="nav-item" role="presentation">
        {navItemButton("owners", "Owners")}
      </li>
      <li class="nav-item" role="presentation">
        {navItemButton("info", "Info")}
      </li>
      <li class="nav-item" role="presentation">
        {navItemButton("add_owners", "Add new owners", !isAdmin)}
      </li>
      <li class="nav-item" role="presentation">
        {navItemButton("create", "Create new badge", !isAdmin)}
      </li>
    </ul>

    <div class="tab-content" id="add_owners">
      <div
        className={`tab-pane fade ${
          state.activeTab == "owners" ? "show active" : ""
        }`}
        id="owners"
        role="tabpanel"
        aria-labelledby="owners"
      >
        <div>
          <div class="d-flex flex-wrap gap-1">{allPeople}</div>
          <div>Total {numAccounts} profiles</div>
        </div>
      </div>
      <div
        className={`tab-pane fade ${
          state.activeTab == "info" ? "show active" : ""
        }`}
        id="info"
        role="tabpanel"
        aria-labelledby="info"
      >
        {badgeDetails()}
      </div>
      <div
        className={`tab-pane fade ${
          state.activeTab == "add_owners" ? "show active" : ""
        }`}
        id="add_owners"
        role="tabpanel"
        aria-labelledby="add_owners"
      >
        <div>
          <Widget
            src="manzanal.near/widget/PeopleExplorer"
            props={{
              onUpdateSearchResult: onUpdateSearchResult,
              predefinedQueries: predefinedQueries,
              debug: false,
            }}
          />
          <div>
            <div class="d-flex flex-wrap gap-1">{pathQueryPeople}</div>
            <div>Total {pathQueryPeople.length} profiles</div>

            {mintButton(
              { key: badgeName, info: badgeInfo },
              "Mint badge to all no badge people",
              noBadgepeople
            )}
            {mintButton(
              { key: badgeName, info: badgeInfo },
              "Mint badge to selected people",
              state.peopleSelected
            )}
          </div>
        </div>
      </div>
    </div>
    <div
      className={`tab-pane fade ${
        state.activeTab == "create" ? "show active" : ""
      }`}
      id="create"
      role="tabpanel"
      aria-labelledby="create"
    >
      {createNewBadgeForm()}
    </div>
  </div>
);
