const addressForArticles = "wikiTest";
const authorForWidget = "eugenewolf507.near";
const mOKEDAYTHOR = "vanyog.near";
const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}
const profile = props.profile ?? Social.getr(`${accountId}/profile`);
if (profile === null) {
  return "Loading";
}

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

console.log(filteredArticles);
return <div>Hello World</div>;
