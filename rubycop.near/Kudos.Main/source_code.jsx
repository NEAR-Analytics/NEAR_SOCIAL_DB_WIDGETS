let data = Social.index("kudo", "answer");
if (!data) {
  return "Loading answers";
}
const upvotes = Social.index("kudo", "upvote");
if (!upvotes) {
  return "Loading upvotes";
}
const blackList = ["webuidl.near"];
data = data.filter((d) => !blackList.includes(d.accountId));

let upvotesMap = {};
for (let i = 0; i < upvotes.length; i++) {
  const vote = upvotes[i];
  const upvoteBlockHeight = vote.value.blockHeight;
  if (!upvotesMap[upvoteBlockHeight]) {
    upvotesMap[upvoteBlockHeight] = 0;
  }
  upvotesMap[upvoteBlockHeight] += 1;
}

// moving into contract in future
// const fetchKudos = () => {
//   const items = Near.view(conrtactName, contractMethod);
//   State.update({ kudos: items });
// };

const widgets = {
  header: "rubycop.near/widget/Kudos.Header",
  filter: "rubycop.near/widget/Kudos.Filter",
  item: "rubycop.near/widget/Kudos.Kudo.Item",
  itemNew: "rubycop.near/widget/Kudos.Kudo.New",
  mintSBT: "rubycop.near/widget/Kudos.MintSBT",
  //   kudoPage: "rubycop.near/widget/Kudos.Kudo.Page",
  //   comment: "rubycop.near/widget/Kudos.Comment",
  //   commentReply: "rubycop.near/widget/Kudos.Comment.Reply",
};

const Container = styled.div`
  margin: 20px;
  padding: 16px;
  background: #F8F8F9;
  border-radius: 10px;
`;

return (
  <>
    <Widget src={widgets.header} />
    <Container>
      <Widget src={widgets.filter} />
    </Container>
    <Container className="d-grid gap-3">
      {data.map((kudo, index) => (
        <Widget
          key={index}
          src={widgets.item}
          props={{
            accountId: kudo.accountId,
            description: kudo.value.answer,
            upvotes: upvotesMap[kudo.blockHeight]
              ? upvotesMap[kudo.blockHeight]
              : 0,
            tags: kudo.tags ?? [],
            createdAt: kudo.createdAt ?? 1687561302337,
          }}
        />
      ))}
    </Container>
  </>
);
