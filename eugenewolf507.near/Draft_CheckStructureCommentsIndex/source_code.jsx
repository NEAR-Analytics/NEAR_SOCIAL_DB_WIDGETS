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
  const questionsIndex = Social.index("poll_question", "question-v3.1.0");
  console.log("questionsIndex", questionsIndex);
  const getData = Social.get(`mob.near/**`, "final");
  console.log("getData", getData);
  const getData = Social.get(`mob.near/**`, "final");
  console.log("getData", getData);
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
