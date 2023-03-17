const ERROR_WIDGET = "evrything.near/widget/Everything.Error";
const LIMIT = 10;
const NUM_COLUMNS_SM = 1;
const NUM_COLUMNS_LG = 3;

const type = props.type;

if (!type) {
  return (
    <Widget
      src={ERROR_WIDGET}
      props={{
        message: `provided type: "${props.type}" is not valid.`,
      }}
    />
  );
}

State.init({
  widgets: [],
  cursor: 0,
});

const loadThings = async () =>
  asyncFetch(type.queries?.getAll.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: type.queries?.getAll.query
        .replace("LIMIT", LIMIT)
        .replace("OFFSET", state.cursor),
    }),
  }).then((res) => {
    if (res.body) {
      const things = res.body.data?.findThings;

      things.map((thing) => {
        state.widgets.push(
          <div key={thing.id}>
            <Widget
              src={"evrything.near/widget/Everything.View.Thing"}
              props={{
                thingId: thing.id,
                type: thing.type,
              }}
            />
          </div>
        );
      });

      state.cursor = state.cursor + LIMIT;

      State.update();
    }
  });

return (
  <InfiniteScroll
    loadMore={loadThings}
    hasMore={state.widgets.length % LIMIT === 0}
  >
    <Masonry breakpointCols={{ default: NUM_COLUMNS_LG, 800: NUM_COLUMNS_SM }}>
      {state.widgets}
    </Masonry>
  </InfiniteScroll>
);
