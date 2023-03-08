const queries = props.predefinedQueries;
const defaultPath = props.defaultPath;
const onUpdateSearchResult = props.onUpdateSearchResult;
const debug = props.debug || false;
if (!onUpdateSearchResult)
  return "Must provide a callback function over props.onUpdateSearchResult";
State.init({
  path: defaultPath,
  accounts: [],
});

const onChangePath = (path) => {
  const value = Social.get(path, "final");
  const accounts = Object.keys(value);
  onUpdateSearchResult(accounts);
  State.update({ path: path, accounts: accounts });
};

const allPeople = [];

for (let i = 0; i < state.accounts.length; ++i) {
  const accountId = state.accounts[i];

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

return (
  <div>
    <div class="mb-2">
      <input
        type="text"
        value={state.path}
        onChange={(e) => onChangePath(e.target.value)}
        placeholder={"*/widget/*/metadata/tags/app"}
      />
    </div>
    <div class="d-flex flex-wrap flex-row mb-2">
      <div class="btn-toolbar" role="toolbar" aria-label="Generated queries">
        {queries &&
          queries.length &&
          queries.map((q, i) => {
            return (
              <button
                type="button"
                key={`query_${i}`}
                class="btn btn-primary btn-sm mr-2"
                onClick={() => {
                  onChangePath(q.query);
                }}
              >
                {q.name}
              </button>
            );
          })}
      </div>
      <div>{debug && allPeople}</div>
    </div>
  </div>
);
