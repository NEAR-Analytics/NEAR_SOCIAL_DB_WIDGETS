const accountId = props.accountId ?? context.accountId;
// ========= HANDLER SET =========
const getPublicationParamsAllArticles = () => ({
  index: {
    wiki_test: JSON.stringify({
      key: "wikitest-v0.0.0",
      value: {
        articleId: "articleA",
        body: "body A (index)",
      },
    }),
  },
});
// ========= HANDLER GET =========
const clickHandlerGetStructure = () => {
  const questions = Social.index("poll_question", "question-v3.1.0");
  console.log("questions", questions);
  const wikiTestData = Social.get(`silkking.near/index/poll_question`, "final");
  console.log("silkking.near/index/poll_question with get", wikiTestData);
};

// ========= RETURN =========
return (
  <div>
    <p>Press button and check log in browser</p>
    <CommitButton data={getPublicationParamsAllArticles()}>
      SET Data
    </CommitButton>
    <button onClick={clickHandlerGetStructure}>GET Data</button>
  </div>
);
