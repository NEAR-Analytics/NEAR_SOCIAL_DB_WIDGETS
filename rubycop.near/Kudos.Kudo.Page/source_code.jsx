const { kudo } = props;

const widgets = {
  item: "rubycop.near/widget/Kudos.Kudo.Item",
};

// const comments = Social.index(`kudos/${kudo.id}/comments`);
const comments = [
  {
    id: 1,
    accountId: "rubycop.near",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quam enim, dignissim sed ante at, convallis maximus enim.",
    createdAt: 2323234234,
  },
  {
    id: 2,
    accountId: "test.near",
    description: "Lorem ipsum dolor ",
    createdAt: 1323254234,
  },
];

return (
  <div className="d-flex flex-wrap">
    <div className="col col-md-6 p-3">
      <h4>Kudo</h4>
      <Widget
        src={widgets.item}
        props={{
          isIAmHuman,
          replyTo: kudo.id,
          accountId: kudo.accountId,
          description: kudo.value.answer,
          upvotes: upvotesMap[kudo.blockHeight]
            ? upvotesMap[kudo.blockHeight]
            : 0,
          tags: kudo.tags ?? [],
          createdAt: kudo.createdAt,
        }}
      />
    </div>
    <div className="col col-md-6 p-3 d-grid gap-3">
      <h4>Comments</h4>
      {comments.map((comment) => (
        <Widget
          src={widgets.item}
          props={{
            isIAmHuman,
            replyTo: comment.id,
            accountId: comment.accountId,
            description: comment.description,
            createdAt: comment.createdAt,
            tags: [],
          }}
        />
      ))}
    </div>
  </div>
);
