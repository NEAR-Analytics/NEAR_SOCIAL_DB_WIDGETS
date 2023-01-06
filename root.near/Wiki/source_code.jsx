const articleId = props.articleId ?? "";
const blockId = props.blockId ?? "final";

initState({ articleId, blockId });

const article = Near.view(
  "thewiki.near",
  "get_article",
  {
    article_id: state.articleId,
  },
  state.blockId
);

let articleNavigation = null;
if (article.navigation_id) {
  articleNavigation = Near.view(
    "thewiki.near",
    "get_article",
    {
      article_id: article.navigation_id,
    },
    state.blockId
  );
}

const updateArticle = (event) => {
  console.log(event);
  State.update({
    articleId: event.target.href.substr("https://near.social/".length),
  });
};

return (
  <div>
    {article ? (
      <div>
        <div className="row justify-content-md-center">
          {articleNavigation && (
            <div className="article-navigation col-md-3">
              <Markdown
                text={articleNavigation.body}
                onLinkClick={updateArticle}
              />
            </div>
          )}
          <div className="article col">
            <Markdown text={article.body} onLinkClick={updateArticle} />
          </div>
        </div>
        <div className="mt-5 alert alert-secondary">
          <div>
            Last edit by{" "}
            <Widget
              src="mob.near/widget/Profile"
              props={{ accountId: content.author }}
            />
            <br />
            Edited on {article.timestamp}
            <br />
            Edit versions: {article.edit_version + 1}
          </div>
        </div>
      </div>
    ) : (
      "Article doesn't exists"
    )}
  </div>
);
