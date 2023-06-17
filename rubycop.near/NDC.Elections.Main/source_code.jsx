// TODO: Should be grabbed from contract side
const props = {
  contractName: "elections-v2.gwg.testnet",
  ndcOrganization: "test",
  groups: [
    {
      title: "Council of Advisors",
      src: "https://ipfs.near.social/ipfs/bafkreie4rfa63zedwnpbwm5lglqrwqhahcnf6slllqmq7sh46ngf5y4vsq",
      leftVotes: 0,
      maxVotes: 10,
      submitted: true,
      id: 2,
      typ: "CouncileOfAdvisors",
      ref_link: "example.com",
      start: 1689820065441,
      end: 1690820065441,
      quorum: 100,
      voters_num: 150,
      seats: 10,
      result: [],
      voters: [],
      votes: {
        available: 0,
        total: 10,
      },
    },
    {
      title: "House of Merit",
      src: "https://ipfs.near.social/ipfs/bafkreie4rfa63zedwnpbwm5lglqrwqhahcnf6slllqmq7sh46ngf5y4vsq",
      leftVotes: 5,
      maxVotes: 10,
      submitted: false,
      id: 3,
      typ: "HouseOfMerit",
      title: "House Of Merit",
      ref_link: "example.com",
      start: 1685820065441,
      end: 1696820065441,
      quorum: 100,
      voters_num: 150,
      seats: 10,
      result: [
        ["zomland.near", 150],
        ["asfsdfsfdfddfsdfdfsdfdf.near", 150],
        ["blabla.near", 10],
        ["rubycop.near", 50],
        ["candidate1.near", 0],
      ],
      voters: [
        {
          accountId: "rubycop.near",
          candidateId: "zomland.near",
          txn_url: "3ZunLtfdnkAC1oTgUxy5KXJb7qQWULmcFpVvkaq2pd6b",
        },
        {
          accountId: "voter1.near",
          candidateId: "zomland.near",
          txn_url: "3ZunLtfdnkAC1oTgUxy5KXJb7qQWULmcFpVvkaq2pd6b",
        },
        {
          accountId: "voter1",
          candidateId: "candidate1.near",
          txn_url: "3ZunLtfdnkAC1oTgUxy5KXJb7qQWULmcFpVvkaq2pd6b",
        },
      ],
      votes: {
        available: 3,
        total: 3,
      },
    },
    {
      title: "Transparency Commission",
      src: "https://ipfs.near.social/ipfs/bafkreie4rfa63zedwnpbwm5lglqrwqhahcnf6slllqmq7sh46ngf5y4vsq",
      leftVotes: 10,
      maxVotes: 10,
      submitted: true,
      id: 4,
      typ: "TransparancyCommision",
      ref_link: "example.com",
      start: 1685820065441,
      end: 1686820065441,
      quorum: 100,
      voters_num: 150,
      seats: 10,
      result: [],
      voters: [],
      votes: {
        available: 0,
        total: 1,
      },
    },
  ],
};

// TODO: Should be grabbed from indexer
const humanVoted = 800;
const totalHumal = 1000;
const myVotes = [
  { candidateId: "zomland.near", time: 1686820065441, typ: "House Of Merit" },
  {
    candidateId: "rubycop.near",
    time: 1686820065441,
    typ: "Councile Of Advisors",
  },
  {
    candidateId: "blabla.near",
    time: 1686820065441,
    typ: "Transparancy Commision",
  },
  {
    candidateId: "zomland.near",
    time: 1686820065441,
    typ: "Transparancy Commision",
  },
];

const widgets = {
  header: "rubycop.near/widget/NDC.Elections.Header",
  houses: "rubycop.near/widget/NDC.Elections.Houses",
  candidates: "rubycop.near/widget/NDC-elections", // should be renamed to NDC.Elections.Candidates
  statistic: "rubycop.near/widget/NDC.Elections.Statistic",
  activities: "rubycop.near/widget/NDC.Elections.Activities",
};

const { groups } = props;

State.init({
  selectedGroup: groups[0].id,
});

const handleSelect = (item) => {
  State.update({ selectedGroup: item.id });
};

const Container = styled.div`
  padding: 30px 0;
`;

const Left = styled.div`
  padding: 20px;
  background: #F8F8F9;
  border-radius: 8px;
`;

const Center = styled.div`
`;

const Right = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  background: #F8F8F9;
  border-radius: 8px;
`;

const H5 = styled.h5`
  margin-bottom: 20px;
`;

return (
  <div>
    {props.groups.map((group) => (
      <>
        {group.id === state.selectedGroup && (
          <Widget
            key={i}
            src={widgets.header}
            props={{
              startTime: group.start,
              endTime: group.end,
              type: "Election",
            }}
          />
        )}
      </>
    ))}
    <Container className="d-flex row">
      <Left className="col-lg">
        <H5>To Vote</H5>
        <Widget
          key={i}
          src={widgets.houses}
          props={{
            selectedGroup: state.selectedGroup,
            groups: groups,
            handleSelect: (item) => handleSelect(item),
          }}
        />
      </Left>
      <Center className="col-lg-6 p-2 p-md-3">
        {props.groups.map((group) => (
          <>
            {group.id === state.selectedGroup && (
              <Widget
                key={i}
                src={widgets.candidates}
                props={{
                  contractName: props.contractName,
                  ndcOrganization: props.ndcOrganization,
                  ...group,
                }}
              />
            )}
          </>
        ))}
      </Center>

      <div className="col-lg">
        <Right className="col">
          <H5>General</H5>
          <div className="d-flex justify-content-center">
            <Widget
              src={widgets.statistic}
              props={{
                voted: humanVoted,
                total: totalHumal,
              }}
            />
          </div>
        </Right>
        <Right className="col">
          <H5>My voting activity</H5>
          <div className="d-flex justify-content-center">
            <Widget
              src={widgets.activities}
              props={{
                myVotes: myVotes,
              }}
            />
          </div>
        </Right>
      </div>
    </Container>
  </div>
);
