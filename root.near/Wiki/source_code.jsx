const articleId = props.articleId ?? "";

const article = Near.view(
  "thewiki.near",
  "get_article",
  {
    article_id: articleId,
  },
  props.blockId
);

let articleNavigation = null;
if (article.navigation_id) {
  articleNavigation = Near.view(
    "thewiki.near",
    "get_article",
    {
      article_id: article.navigation_id,
    },
    props.blockId
  );
}

return (
  <div>
    {article ? (
      <div>
        <div className="row justify-content-md-center">
          {articleNavigation && (
            <div className="article-navigation col-md-3">
              <Markdown text={articleNavigation.body} />
            </div>
          )}
          <div className="article col">
            <Markdown text={article.body} />
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
