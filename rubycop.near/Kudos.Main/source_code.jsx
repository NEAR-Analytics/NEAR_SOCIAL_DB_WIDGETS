const mockData = [
  {
    accountId: "rubycop.near",
    votes: 5,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quam enim, dignissim sed ante at, convallis maximus enim.",
    tags: ["ndc", "near"],
    createdAt: new Date().getTime(),
  },
  {
    accountId: "test.near",
    votes: 15,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quam enim, dignissim sed ante at, convallis maximus enim.",
    tags: ["near"],
    createdAt: new Date().getTime(),
  },
];

State.init({
  kudos: mockData,
});

const fetchKudos = () => {
  const items = Near.view(conrtactName, contractMethod);
  State.update({ kudos: items });
};

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
`;

return (
  <>
    <Widget src={widgets.header} />
    <Container>
      <Widget src={widgets.filter} />
    </Container>
    <Container>
      {state.kudos.map((kudo, index) => (
        <Widget key={index} src={widgets.item} props={{ kudo }} />
      ))}
    </Container>
  </>
);
