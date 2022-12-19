const scope = props.scope ?? context.scope;

State.init({
  path: "**",
  pathModTime: Date.now(),
  isTreeView: true,
  newQuery: !true,
  trie: {},
  rawData: {},
});

function switchTab(newView) {
  if (!state.isTreeView && newView == "tree") {
    State.update({ isTreeView: true });
  } else if (state.isTreeView && newView == "raw") {
    State.update({ isTreeView: false });
  }
}

function handleQuery(path) {
  State.update({ path, newQuery: true });
  if (state.isTreeView) {
    Social.keys(state.path, "final");
  } else {
    // Social.keys(state.path, "final");
  }
  // console.log(state.path);
  // // while (!(keys && Object.keys(keys).length)) {
  // //   console.log(keys);
  // // }
  // console.log(keys);
  // State.update({ loading: false });
  // return true;
}

function treeView() {
  console.log("new tree");
  State.update({ newQuery: false });
  return (
    <>
      {state.path}

      {state.isTreeView}
    </>
  );
}

function rawView() {
  console.log("new raw");
  State.update({ newQuery: false });
  let text = "Hellur World";
  return (
    <>
      <Markdown
        text={`\`\`\`json
${text}
\`\`\``}
      />
    </>
  );
}

let Styles = styled.span``;

function after(cond, els) {
  if (cond) return els;
  return (
    <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status"></div>
    </div>
  );
}

return (
  <>
    <div class="input-group">
      <input
        type="text"
        value={state.path}
        onChange={(e) => handleQuery(e.target.value)}
      />
      <button class="btn btn-outline-secondary" title="Copy Permalink">
        🔗
      </button>
    </div>

    <hr />

    {after(
      !state.newQuery,
      <>
        <ul
          class="nav nav-tabs justify-content-center"
          id="myTab"
          role="tablist"
        >
          <li class="nav-item" role="presentation">
            <button
              class="nav-link text-dark active"
              id="tree-tab"
              data-bs-toggle="tab"
              data-bs-target="#tree"
              type="button"
              role="tab"
              aria-controls="tree"
              aria-selected={state.isTreeView}
              onClick={() => switchTab("tree")}
            >
              Tree
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link text-dark"
              id="raw-tab"
              data-bs-toggle="tab"
              data-bs-target="#raw"
              type="button"
              role="tab"
              aria-controls="raw"
              aria-selected={!state.isTreeView}
              onClick={() => switchTab("raw")}
            >
              Raw
            </button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="tree"
            role="tabpanel"
            aria-labelledby="tree-tab"
          >
            {state.isTreeView ? treeView() : <></>}
          </div>
          <div
            class="tab-pane fade"
            id="raw"
            role="tabpanel"
            aria-labelledby="raw-tab"
          >
            {!state.isTreeView ? rawView() : <></>}
          </div>
        </div>
      </>
    )}
  </>
);

// {state.loading ? (
//   <div class="d-flex justify-content-center">
//     <div class="spinner-border" role="status"></div>
//   </div>
// ) : }
