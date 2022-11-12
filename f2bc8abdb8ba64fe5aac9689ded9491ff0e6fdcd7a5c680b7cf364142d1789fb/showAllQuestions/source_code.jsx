const accountId = props.accountId ?? "*";

const data = Social.keys(`${accountId}/post/poll_question`, "final", {
  return_type: "History",
});

// console.log(data);

if (!data) {
  return "Loading";
}

const processData = (data) => {
  const accounts = Object.entries(data);

  const allQuestions = accounts
    .map((account) => {
      const accountId = account[0];
      const blockHeights = account[1].post.poll_question;
      return blockHeights.map((blockHeight) => ({
        accountId,
        blockHeight,
      }));
    })
    .flat();

  allQuestions.sort((a, b) => b.blockHeight - a.blockHeight);
  return allQuestions;
};

// console.log(processData(data));

const questionToWidget = (a) => {
  //   {
  //     console.log(a);
  //   }
  return (
    <div key={JSON.stringify(a)} style={{ minHeight: "200px" }}>
      <a
        className="text-decoration-none"
        //Check how href is done in memes widget of mob.near
        href={`#`}
      >
        <Widget
          src="f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/AddMeme"
          props={a}
        />
      </a>
    </div>
  );
};

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
