/*
---props---

widgetPath: string,
count(count: number)?: function,
*/
const authorForWidget = "eugenewolf507.near";
const addressForArticles = "wikiTest2Article";

if (typeof props.widgetPath !== "string")
  return "send {widgetPath} as string in props";

State.init({
  selectedTab: "code",
  selectedBlockHeight: null,
});

// ========== GET INDEX ARRAY FOR ARTICLES ==========
const postsIndex = Social.index(addressForArticles, "main", {
  order: "desc",
  accountId: undefined,
});
// ========== GET ALL ARTICLES ==========
const resultArticles =
  postsIndex &&
  postsIndex.reduce((acc, { accountId, blockHeight }) => {
    const postData = Social.get(
      `${accountId}/${addressForArticles}/main`,
      blockHeight
    );
    const postDataWithBlockHeight = { ...JSON.parse(postData), blockHeight };
    return [...acc, postDataWithBlockHeight];
  }, []);
// ========== FIND ALL VERSIONS OF ONE ARTICLE ==========
const filteredArticles =
  resultArticles.length &&
  resultArticles.reduce((acc, article) => {
    if (article.articleId === "FirstNewDBTest") {
      return [...acc, article];
    } else {
      return acc;
    }
  }, []);

if (filteredArticles === null) return "loading...";

let blocksChanges = filteredArticles.map((item) => ({
  blockHeight: item.blockHeight,
  lastEditor: item.lastEditor,
}));
// console.log("blocksChanges", blocksChanges);

// === END ===

if (props.count) props.count(blocksChanges.length);

// if (blocksChanges) blocksChanges = blocksChanges?.sort((a, b) => b - a);

if (!state.selectedBlockHeight) state.selectedBlockHeight = blocksChanges[0];

function getDatastringFromBlockHeight(blockHeight) {
  const block = Near.block(blockHeight);
  const date = new Date(block.header.timestamp_nanosec / 1e6);
  return date.toDateString() + " " + date.toLocaleTimeString();
}

const renderBlockChangesLink = (blockHeight) => {
  return (
    <div>
      <button
        className={`list-group-item list-group-item-action ${
          state.selectedBlockHeight != blockHeight ? "" : "list-group-item-info"
        }`}
        onClick={() => {
          State.update({ selectedBlockHeight: blockHeight });
        }}
      >
        #{blockHeight} * {getDatastringFromBlockHeight(blockHeight)}
      </button>
    </div>
  );
};

function blockHeightToWidgetCode(blockHeight) {
  const index = blocksChanges.findIndex((el) => el.blockHeight == blockHeight);
  return (
    <Widget
      style={{ minHeight: "200px" }}
      key={blockHeight}
      src={`${authorForWidget}/widget/WikiOnSocialDB_History.ArticleHistoryCard`}
      props={{
        pathToWidget: props.widgetPath,
        currentBlockHeight: blockHeight,
        prevBlockHeight: blocksChanges[index + 1].blockHeight,
      }}
    />
  );
}

function blockHeightToWidgetRender(blockHeight) {
  const index = blocksChanges.findIndex((el) => el.blockHeight == blockHeight);
  return (
    <Widget
      style={{ minHeight: "200px" }}
      key={blockHeight}
      src={`bozon.near/widget/WidgetHistory.RenderCode`}
      props={{
        pathToWidget: props.widgetPath,
        currentBlockHeight: blockHeight,
        prevBlockHeight: blocksChanges[index + 1].blockHeight,
      }}
    />
  );
}

//styles forked from calebjacob.near/widget/Activity
const Tabs = styled.div`
  display: flex;
  padding: 0 12px;
  height: 48px;
  border-bottom: 1px solid #ECEEF0;
`;

const TabsButton = styled.button`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;

  &:hover {
    color: #11181C;
  }

  &::after {
    content: '';
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 12px;
    right: 12px;
    height: 3px;
    background: #0091FF;
  }
`;

return (
  <div>
    {/* === START === */}
    <button onClick={handler}>GET DATA (delete thos button)</button>
    {/* === END === */}

    {!blocksChanges ? (
      <div>incorrent widget path</div>
    ) : (
      <div>
        <div div class="card mb-3">
          <h3 class="card-header">{blocksChanges.length} Commits</h3>
          <div class="list-group">
            {blocksChanges
              .slice(0, 5)
              .map((height) => renderBlockChangesLink(height.blockHeight))}
            <div class="collapse" id="collapseExample">
              {blocksChanges
                .slice(5)
                .map((height) => renderBlockChangesLink(height.blockHeight))}
            </div>
            {blocksChanges.length > 5 && (
              <button
                class="list-group-item active"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Show all
              </button>
            )}
          </div>
        </div>

        <Tabs>
          <TabsButton
            type="button"
            onClick={() =>
              State.update({
                selectedTab: "code",
              })
            }
            selected={state.selectedTab == "code"}
          >
            Code
          </TabsButton>

          <TabsButton
            type="button"
            onClick={() =>
              State.update({
                selectedTab: "render",
              })
            }
            selected={state.selectedTab == "render"}
          >
            Render
          </TabsButton>
        </Tabs>

        {state.selectedTab == "code" && (
          <div>
            {blockHeightToWidgetCode(state.selectedBlockHeight.blockHeight)}
          </div>
        )}

        {state.selectedTab == "render" && (
          <div>
            {blockHeightToWidgetRender(state.selectedBlockHeight.blockHeight)}
          </div>
        )}
      </div>
    )}
  </div>
);
