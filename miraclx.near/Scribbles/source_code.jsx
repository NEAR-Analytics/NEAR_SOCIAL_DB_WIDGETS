const scope = props.scope ?? context.scope;

State.init({
  query: "**",
  queryModTime: Date.now(),
  trie: {},
});

function handleQuery(e) {
  State.update({ query: e.target.value });
  setTimeout(() => console.log(10), 1000);
  return true;
}

let Styles = styled.span``;

return (
  <>
    <div
      class="input-group"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <input type="text" value={state.query} onChange={handleQuery} />
      <button
        class="btn btn-outline-secondary"
        data-toggle="tooltip"
        data-placement="top"
        title="Tooltip on top"
      >
        🔗
      </button>
    </div>

    <hr />

    <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link text-dark active"
          id="home-tab"
          data-bs-toggle="tab"
          data-bs-target="#home"
          type="button"
          role="tab"
          aria-controls="home"
          aria-selected="true"
        >
          Tree
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link text-dark"
          id="profile-tab"
          data-bs-toggle="tab"
          data-bs-target="#profile"
          type="button"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
        >
          Raw
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        {state.query}
      </div>
      <div
        class="tab-pane fade"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        Profile Content
      </div>
    </div>
  </>
);
