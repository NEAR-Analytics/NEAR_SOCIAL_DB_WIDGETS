// const accountId = props.accountId ?? context.accountId; //context.accountId

// const accountId = *;

// const tag = props.tag;

const handleSearch = () => {
  Console.log("tag ", state.tag);

  if (JSON.stringify(data) !== JSON.stringify(state.data || {})) {
    State.update({
      data,
      allItems: processData(data),
    });
  }
};
// const meme = "meme";
// let tag = "meme";

//Initializing the state
State.init({
  tag: state.tag ?? "meme",
});
// state.tag ?? meme;
let keys = `${accountId ?? "*"}/widget/*`;

if (state.tag) {
  //   const taggedWidgets = Social.keys(
  //     `${accountId ?? "*"}/widget/*/metadata/tags/${tag}`,
  //     "final"
  //   );
  const taggedWidgets = Social.keys(
    `${accountId ?? "*"}/widget/*/metadata/tags/${state.tag}`,
    "final"
  );

  //   if (taggedWidgets === null) {
  //     return "Loading tags";
  //   }

  keys = Object.entries(taggedWidgets)
    .map((kv) => Object.keys(kv[1].widget).map((w) => `${kv[0]}/widget/${w}`))
    .flat();

  //   if (!keys.length) {
  //     state.tag = "";
  //     // return `No widgets found by tag ${state.tag}`;
  //   }
}

const data = Social.keys(keys, "final", {
  return_type: "BlockHeight",
});

// if (data === null) {
// state.tag = "app"
// //   return "Loading widgets";
// }

const processData = (data) => {
  const accounts = Object.entries(data);

  const allItems = accounts
    .map((account) => {
      const accountId = account[0];
      return Object.entries(account[1].widget).map((kv) => ({
        accountId,
        widgetName: kv[0],
        blockHeight: kv[1],
      }));
    })
    .flat();

  allItems.sort((a, b) => b.blockHeight - a.blockHeight);
  return allItems;
};

const onChangeTag = (tag) => {
  State.update({
    tag,
    data,
    allItems: processData(data),
  });
  console.log("tag ", state.tag);
};

const renderTag = (tag, tagBadge) => (
  <a href={makeLink(accountId, tag)}>{tagBadge}</a>
);

const renderItem = (a) => {
  return (
    <a
      href={`#/${a.accountId}/widget/${a.widgetName}`}
      className="text-decoration-none"
      key={JSON.stringify(a)}
    >
      <Widget
        src="mob.near/widget/WidgetImage"
        props={{
          tooltip: true,
          accountId: a.accountId,
          widgetName: a.widgetName,
        }}
      />
    </a>
  );
};

if (JSON.stringify(data) !== JSON.stringify(state.data || {})) {
  State.update({
    data,
    allItems: processData(data),
  });
}

return (
  <>
    <div className="mb-2">
      Enter Tag Name:
      <input type="text" onChange={(e) => onChangeTag(e.target.value)} />
    </div>
    <button className="btn btn-primary mt-3" onClick={handleSearch}>
      SEARCH
    </button>
    <div className="d-flex flex-wrap gap-1 my-3">
      {state.allItems
        .slice(0, props.limit ? parseInt(props.limit) : 999)
        .map(renderItem)}
    </div>
  </>
);
