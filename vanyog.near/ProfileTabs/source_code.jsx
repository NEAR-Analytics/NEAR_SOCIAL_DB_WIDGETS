const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading";
}

State.init({ loadarticles: true });

const articlesNum = Near.view("thewiki.near", "get_num_articles");
const articles = Near.view("thewiki.near", "get_article_ids_paged", {
  from_index: 0,
  limit: 250,
});

console.log("articles", articles);

const description = profile.description;

const pills = [
  { id: "main", title: "Main" },
  { id: "articles", title: "Articles" },
  { id: "authors", title: "Authors" },
  { id: "create", title: "Create Article" },
];

const handleArticle = (e, articleId) => {
  State.update({ ...state, articleId: articleId, authorId: undefined });
};

const handleAuthor = (e, authorId) => {
  State.update({ ...state, articleId: undefined, authorId });
};

const article =
  state?.articleId &&
  Near.view("thewiki.near", "get_article", {
    article_id: state?.articleId,
  });

console.log("article", article);

const authorArticles =
  state?.authorId &&
  Near.view("thewiki.near", "get_account", {
    account_id: state?.authorId,
  });

console.log("authorArticles", authorArticles);

const mainPage = Near.view("thewiki.near", "get_article", {
  article_id: "",
});

console.log("mainPage", mainPage);

const getDate = (timestamp) => {
  const newTimestamp = timestamp.slice(0, timestamp.length - 6);
  const date = new Date(Number(newTimestamp));
  return date.toDateString();
};

const saveArticle = (args) => {
  Near.call("thewiki.near", "post_article", args, "30000000000000");
};

return (
  <>
    <ul className="nav nav-pills nav-fill mb-4" id="pills-tab" role="tablist">
      {pills.map(({ id, title }, i) => (
        <li className="nav-item" role="presentation" key={i}>
          <button
            className={`nav-link ${i === 0 ? "active" : ""}`}
            id={`pills-${id}-tab`}
            data-bs-toggle="pill"
            data-bs-target={`#pills-${id}`}
            type="button"
            role="tab"
            aria-controls={`pills-${id}`}
            aria-selected={i === 0}
            onClick={() => {
              const key = `load${id}`;
              !state[key] && State.update({ [key]: true });
              State.update({ articleId: undefined, authorId: undefined });
            }}
          >
            {title}
          </button>
        </li>
      ))}
    </ul>

    <div className="tab-content" id="pills-tabContent">
      <div
        className="tab-pane fade show active"
        id="pills-main"
        role="tabpanel"
        aria-labelledby="pills-main-tab"
      >
        {mainPage && <Markdown text={mainPage.body} />}
      </div>

      <div
        className="tab-pane fade"
        id="pills-articles"
        role="tabpanel"
        aria-labelledby="pills-articles-tab"
      >
        {state.loadarticles && (
          <div>
            {!state?.articleId && <h1>Articles</h1>}

            {state?.articleId ? (
              <div>
                <button
                  onClick={() => {
                    State.update({ articleId: undefined });
                  }}
                >
                  {" "}
                  Back to articles{" "}
                </button>
                <button
                  onClick={() => {
                    State.update({ editArticle: true });
                  }}
                >
                  Edit Article{" "}
                </button>

                {state.editArticle && (
                  <>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        if (!state.note || article.body === state.note) return;

                        const args = {
                          article_id: state?.articleId,
                          body: state.note,
                          navigation_id: null,
                        };

                        saveArticle(args);
                      }}
                    >
                      Save Article{" "}
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        State.update({
                          editArticle: false,
                          note: article.body,
                        });
                      }}
                    >
                      Cancel{" "}
                    </button>
                    <textarea
                      id="textarea1"
                      type="text"
                      rows={10}
                      className="form-control mt-2"
                      value={state.note || article.body}
                      onChange={(e) => {
                        State.update({ ...state, note: e.target.value });
                      }}
                    />
                  </>
                )}

                <Markdown text={article.body} />

                {article && (
                  <div className="mt-5 alert alert-secondary">
                    <div>
                      Last edit by{" "}
                      <a
                        href=""
                        style={{ textDecoration: "underline" }}
                        onClick={(e) => handleAuthor(e, article.author)}
                      >
                        {article.author}
                      </a>
                      <br />
                      Edited on {getDate(article.timestamp)}
                      <br />
                      Edit versions: {article.edit_version + 1}
                    </div>
                    {buttons}
                  </div>
                )}
              </div>
            ) : state?.authorId ? (
              <div>
                <h4>Author: {state.authorId}</h4>
                <ul>
                  {authorArticles &&
                    authorArticles.articles &&
                    authorArticles.articles.map((article, index) => (
                      <li>
                        <a
                          href="#"
                          onClick={(e) =>
                            handleArticle(
                              e,
                              articles[articles.length - index - 1]
                            )
                          }
                        >
                          #{index + 1} {article}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            ) : (
              <ul>
                {articles &&
                  articles.map((article, index, articles) => (
                    <li key={article}>
                      #{" "}
                      <a
                        href="#"
                        onClick={(e) =>
                          handleArticle(
                            e,
                            articles[articles.length - index - 1]
                          )
                        }
                      >
                        {articles.length - index}{" "}
                        {index === articles.length - 1
                          ? "main page"
                          : articles[articles.length - index - 1]}
                      </a>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div
        className="tab-pane fade"
        id="pills-authors"
        role="tabpanel"
        aria-labelledby="pills-authors-tab"
      >
        {state.loadauthors && (
          <div>
            <Widget src="eugenewolf507.near/widget/TestWiki_Authors" />
          </div>
        )}
      </div>

      <div
        className="tab-pane fade"
        id="pills-create"
        role="tabpanel"
        aria-labelledby="pills-create-tab"
      >
        {state.loadcreate && (
          <div>
            <h1 className="mb-3"> Create Article</h1>
            <Widget src="vanyog.near/widget/CreateWikiArticle" />
          </div>
        )}
      </div>
    </div>
  </>
);
