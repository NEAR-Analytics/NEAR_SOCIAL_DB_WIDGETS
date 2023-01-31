const accountId = props.accountId ?? context.accountId;
// ========= HANDLER SET =========
const getPublicationParamsAllArticles = () => ({
  index: {
    wiki_test: {
      key: "wikitest-v0.0.0",
      value: {
        articleId: "articleA",
        author: "EV",
        body: "body A (index)",
      },
    },
  },
});

// ========= HANDLER GET =========
const clickHandlerGetStructure = () => {
  // const answers = Social.index("poll_question", "answer-v3.1.0");
  // console.log(answers);
  // const questions = Social.index("poll_question", "question-v3.1.0");
  // console.log(questions);
  const articles = Social.index("wiki_test", "wikitest-v0.0.0");
  console.log(articles);
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
