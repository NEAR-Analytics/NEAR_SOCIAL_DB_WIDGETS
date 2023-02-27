/*
---props---
props.widgetPath?: string,
*/
const authorForWidget = "eugenewolf507.near";
const addressForArticles = "wikiTest2Article";
const initWidgetPath = props.widgetPath || "devgovgigs.near/widget/Ideas";

State.init({
  widgetPath: initWidgetPath,
});

// === START ===
const handler = () => {
  // ============ WIDGETS
  const widgetPath = "devgovgigs.near/widget/Ideas";

  const historyBlocksRequestKeysWidgets = Social.keys(
    `${widgetPath}`,
    "final",
    {
      return_type: "History",
    }
  );
  //   const historyBlocksRequestGetWidget = Social.get(`${widgetPath}`, "final");

  console.log(
    "historyBlocksRequestKeysWidgets",
    historyBlocksRequestKeysWidgets
  );
  //   console.log("historyBlocksRequestGetWidget", historyBlocksRequestGetWidget);

  // ============ ARTICLES
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
  console.log("filteredArticles", filteredArticles);
};

// === END ===

return (
  <div>
    {/* === START === */}
    <button onClick={handler}>GET DATA (delete thos button)</button>
    {/* === END === */}
    <h1 class="text-center">Widget History</h1>

    <div class="input-group mb-3">
      <input
        class="form-control"
        placeholder={initWidgetPath}
        defaultValue={state.widgetPath || initWidgetPath}
        onBlur={(e) => {
          State.update({
            widgetPath: e.target.value,
          });
        }}
      />
    </div>

    <Widget
      src={`${authorForWidget}/widget/WikiOnSocialDB_History.History`}
      props={{
        widgetPath: state.widgetPath,
      }}
    />
  </div>
);
