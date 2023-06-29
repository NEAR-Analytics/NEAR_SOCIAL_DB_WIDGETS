let data = Social.index("kudo", "answer");

if (!data) return "Loading answers";

const upvotes = Social.index("kudo", "upvote");
if (!upvotes) return "Loading upvotes";

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
  navigation: "rubycop.near/widget/Kudos.Navigation",
  item: "rubycop.near/widget/Kudos.Kudo.Item",
  itemNew: "rubycop.near/widget/Kudos.Kudo.New",
  mintSBT: "rubycop.near/widget/Kudos.MintSBT",
  //   kudoPage: "rubycop.near/widget/Kudos.Kudo.Page",
  //   comment: "rubycop.near/widget/Kudos.Comment",
  //   commentReply: "rubycop.near/widget/Kudos.Comment.Reply",
};

const kudosContract = "kudos-contract.near";
const registryContract = "registry-unstable.i-am-human.testnet";

State.init({
  selectedItem: "My",
});

const handleSelect = (itemType) => {
  State.update({ selectedItem: itemType });
};

const isIAmHuman = () => {
  Near.view(registryContract, "is_human", { account: context.accountId });
};

const Container = styled.div`
  margin: 20px;
`;

const Section = styled.div`
  padding: 20px;
  background: #F8F8F9;
  border-radius: 10px;
`;

const CenterSection = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;

  @media (max-width: 768px) {
    margin: 20px 0;
    background: #F8F8F9;
  }
`;

const H5 = styled.h5`
  margin-bottom: 20px;
`;

return (
  <div>
    <Widget src={widgets.header} props={{ isIAmHuman }} />
    <Container className="d-flex row">
      <Section className="col-md-3">
        <H5>Home</H5>
        <Widget
          src={widgets.navigation}
          props={{
            selectedItem: state.selectedItem,
            handleSelect,
          }}
        />
      </Section>
      <CenterSection className="col-md-9">
        <h4>{state.selectedItem} Kudos</h4>

        <div className="d-flex flex-wrap">
          {data.map((kudo, index) => (
            <div className="col col-md-6 p-3">
              <Widget
                key={index}
                src={widgets.item}
                props={{
                  isIAmHuman,
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
          ))}
        </div>
      </CenterSection>
    </Container>
  </div>
);
