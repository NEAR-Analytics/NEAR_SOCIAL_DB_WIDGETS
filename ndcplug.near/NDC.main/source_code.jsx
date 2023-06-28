const handleSelect = (item) => {
  State.update({ selectedHouse: item.id });
};

const Container = styled.div`
  padding: 30px 0;
`;

const ActivityContainer = styled.div`
  overflow-y: scroll;
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
    <Widget src="ndcplug.near/widget/NDC.main.header" />

    <Container className="d-flex row">
      <Left className="col-lg">
        <Widget src="ndcplug.near/widget/NDC.profileCard" />
        <Widget
          src="ndcplug.near/widget/NDC.linkCard"
          props={{
            title: "Community Leaderboard",
            subtitle: "See which communities are onboarding the most humans",
            link: "https://i-am-human.app/community-scoreboard",
          }}
        />
      </Left>
      <Center className="col-lg-6 p-2 p-md-3">
        <Widget src="ndcplug.near/widget/NDC.verifyHuman" />
        <Widget src="7418d5cb7d7657e526b8bccf28750939105828d0f5b34a7254bd107477d84a2c/widget/ProgressMeterBarWidget" />
      </Center>

      <div className="col-lg">
        <Right className="col">
          <H5>Funding Dashboard</H5>
          <div className="d-flex justify-content-center">
            <Widget src="frichard5.near/widget/NDC-alldaos_overview" />
          </div>
        </Right>
        <Right className="col">
          <H5>NDC Docs</H5>
          <ActivityContainer className="d-flex justify-content-center">
            <Widget src="neardigitalcollective.near/widget/NDCDocs" />
          </ActivityContainer>
        </Right>
        <Right className="col">
          <H5>Easy Poll</H5>
          <ActivityContainer className="d-flex justify-content-center">
            <Widget src="neardigitalcollective.near/widget/EasyPoll.Main" />
          </ActivityContainer>
        </Right>
        <Right className="col">
          <H5>Say A Lot</H5>
          <ActivityContainer className="d-flex justify-content-center">
            <Widget src="sayalot.near/widget/SayALot" />
          </ActivityContainer>
        </Right>
      </div>
    </Container>
  </div>
);
