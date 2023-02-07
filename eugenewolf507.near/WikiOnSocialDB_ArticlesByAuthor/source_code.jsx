const addressForArticles = "wikiTest";
const authorForWidget = "eugenewolf507.near";
const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}
const profile = props.profile ?? Social.getr(`${accountId}/profile`);
if (profile === null) {
  return "Loading";
}

const getDateLastEdit = (timestamp) => {
  const date = new Date(Number(timestamp));
  const dateString = `${date.toLocaleDateString()} / ${date.toLocaleTimeString()}`;
  return dateString;
};

const wikiTestData = Social.get(`*/${addressForArticles}/articles/**`, "final");
const wikiTestArr = wikiTestData && Object.values(wikiTestData);
const resultArticles =
  wikiTestArr &&
  wikiTestArr.reduce(
    (acc, account) =>
      acc.concat(Object.values(account[addressForArticles].articles)),
    []
  );

resultArticles.length &&
  resultArticles.sort((a, b) => {
    return Number(b.timeLastEdit) - Number(a.timeLastEdit);
  });

const filteredArticles =
  resultArticles.length &&
  resultArticles.reduce((acc, article) => {
    if (acc.some(({ articleId }) => articleId === article.articleId)) {
      return acc;
    } else {
      return [...acc, article];
    }
  }, []);

const filteredArticlesByUser =
  filteredArticles.length &&
  filteredArticles.reduce((acc, article) => {
    if (article.author === props.author) {
      return [...acc, article];
    } else {
      return acc;
    }
  }, []);

return (
  <>
    <Widget
      src={`${authorForWidget}/widget/WikiOnSocialDB_MainNavigation`}
      props={{ currentNavPill: "authors" }}
    />
    <div>
      Author:
      <a
        href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${props.author}`}
        target="_blank"
      >
        {props.author}
      </a>
      <ol>
        {filteredArticlesByUser &&
          filteredArticlesByUser.map((article, index) => (
            <li key={article.articleId}>
              <a href="">
                {article.articleId}{" "}
                <small>
                  (last edited:
                  {getDateLastEdit(article.timeLastEdit)})
                </small>
              </a>
            </li>
          ))}
      </ol>
    </div>
  </>
);
