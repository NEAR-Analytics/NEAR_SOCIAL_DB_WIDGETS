// const accountId = props.accountId ?? "*";

const data = Social.index("poll_question", "question");
// const data = Social.keys(`${accountId}/post/poll__question/question`, "final", {
//   return_type: "History",
// });

// console.log("data: ", data);

if (!data) {
  return "Loading";
}

const processData = (data) => {
  const allQuestions = data.reverse().map((questionData) => {
    // console.log("questionData: ", questionData);
    const accountId = questionData.accountId;
    const question = questionData.value.data.question;
    const questionTimestamp = questionData.value.data.timestamp;
    const questionBlockHeight = questionData.blockHeight;

    return {
      accountId,
      question,
      questionTimestamp,
      questionBlockHeight,
    };
  });
  return allQuestions;
};

console.log("pd: ", processData(data));

// const processData = (data) => {
//   const accounts = Object.entries(data);
//   // console.log("accts: ", accounts);

//   const allQuestions = accounts
//     .map((account) => {
//       // console.log("acc: ", account);
//       const accountId = account[0];
//       const blockHeights = account[1].post.poll__question.question;
//       // console.log("bh: ", blockHeights);
//       return blockHeights.map((blockHeight) => ({
//         accountId,
//         blockHeight,
//       }));
//     })
//     .flat();

//   allQuestions.sort((a, b) => b.blockHeight - a.blockHeight);

//   return allQuestions;
// };

// console.log("processData: ", processData(data));

const questionToWidget = (a) => (
  <div key={JSON.stringify(a)} style={{ minHeight: "200px" }}>
    <Widget
      src="f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/answer_poll"
      props={a}
    />
  </div>
);

State.init({
  widgets: [],
});

if (JSON.stringify(data) !== JSON.stringify(state.data || {})) {
  State.update({
    data,
    allQuestions: processData(data),
  });
}

const makeMoreQuestions = () => {
  const newQuestions = state.allQuestions
    .slice(state.widgets.length, state.widgets.length + 10)
    .map(questionToWidget);
  newQuestions.forEach((question) => state.widgets.push(question));
  State.update();
};

return (
  <div
    className="px-2 mx-auto"
    style={{ background: "#fff", maxWidth: "42em" }}
  >
    {context.accountId && (
      <Widget src="f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/PollQuestion" />
    )}

    <InfiniteScroll
      pageStart={0}
      loadMore={makeMoreQuestions}
      hasMore={state.widgets.length < state.allQuestions.length}
      loader={<div className="loader">Loading ...</div>}
    >
      {state.widgets}
    </InfiniteScroll>
  </div>
);
