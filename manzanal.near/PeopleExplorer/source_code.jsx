const queries = props.predefinedQueries;
const defaultPath = props.defaultPath;
const resultState = props.resultState;
const debug = props.debug || false;
State.init({
  path: defaultPath,
});

const value = Social.get(state.path, "final");
State.update({ [resultState]: value ? Object.keys(value) : [] });

const allPeople = [];

for (let i = 0; i < state[resultState].length; ++i) {
  const accountId = state[resultState][i];

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
                  State.update({ path: q.query });
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
