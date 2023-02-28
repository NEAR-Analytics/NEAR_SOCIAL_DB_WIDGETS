/*
---props---
count(count: number)?: function,
*/
const authorForWidget = "eugenewolf507.near";
const addressForArticles = "wikiTest2Article";

// if (typeof props.widgetPath !== "string")
//   return "send {widgetPath} as string in props";

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
if (resultArticles === null) return "loading...";
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
// ========== GET ARRAY OF BLOCK HEIGHT AND LAST EDITOR ==========
let blocksChanges =
  filteredArticles &&
  filteredArticles.map((item) => ({
    blockHeight: item.blockHeight,
    lastEditor: item.lastEditor,
  }));

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
          state.selectedBlockHeight.blockHeight != blockHeight
            ? ""
            : "list-group-item-info"
        }`}
        onClick={() => {
          State.update({ selectedBlockHeight: blockHeight });
        }}
      >
        #{blockHeight.blockHeight} *{" "}
        {getDatastringFromBlockHeight(blockHeight.blockHeight)}
      </button>
    </div>
  );
};

function blockHeightToWidgetCode(blockHeightObject) {
  const index = blocksChanges.findIndex(
    (el) => el.blockHeight == blockHeightObject.blockHeight
  );
  const prevBlockHeightObject = blocksChanges[index + 1];
  return (
    <Widget
      style={{ minHeight: "200px" }}
      key={blockHeightObject.blockHeight}
      src={`${authorForWidget}/widget/WikiOnSocialDB_History.ArticleHistoryCard`}
      props={{
        pathToCurrentArticle: `${blockHeightObject.lastEditor}/${addressForArticles}/main`,
        currentBlockHeight: blockHeightObject.blockHeight,
        pathToPrevArticle: `${prevBlockHeightObject.lastEditor}/${addressForArticles}/main`,
        prevBlockHeight: prevBlockHeightObject.blockHeight,
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
        pathToWidget: `${
          blocksChanges[index + 1].lastEditor
        }/${addressForArticles}/main`,
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
    <h1 class="text-center">Widget History</h1>
    {!blocksChanges ? (
      <div>incorrent widget path</div>
    ) : (
      <div>
        <div div class="card mb-3">
          <h3 class="card-header">{blocksChanges.length} Commits</h3>
          <div class="list-group">
            {blocksChanges
              .slice(0, 5)
              .map((height) => renderBlockChangesLink(height))}
            <div class="collapse" id="collapseExample">
              {blocksChanges
                .slice(5)
                .map((height) => renderBlockChangesLink(height))}
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
          <div>{blockHeightToWidgetCode(state.selectedBlockHeight)}</div>
        )}

        {state.selectedTab == "render" && (
          <div>{blockHeightToWidgetRender(state.selectedBlockHeight)}</div>
        )}
      </div>
    )}
  </div>
);
