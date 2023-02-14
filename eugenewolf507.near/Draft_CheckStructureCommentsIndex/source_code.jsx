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
  const accountId = "mob.near";

  const posts = Social.get(`${accountId}/post/main`, 84445357);
  console.log("postsGet", posts);
  const postsIndex = Social.index("post", "main", {
    limit: 10,
    order: "desc",
    accountId,
  });
  console.log(postsIndex);
  console.log("==================");

  postsIndex.forEach(({ accountId, blockHeight }) => {
    const postData = Social.get(`${accountId}/post/main`, blockHeight);
    console.log(postData);
    console.log(accountId, blockHeight);
  });

  //   const questionsIndex = Social.index("poll_question", "question-v3.1.0");
  //   console.log("questionsIndex", questionsIndex);
  //   const questionsGet = Social.get(`*/index/poll_question/`, "final");
  //   console.log("questionsGet", questionsGet);
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
