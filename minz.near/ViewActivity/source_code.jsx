const event_id = props.event_id;
const accountId = context.accountId;
const CONTRACT = "event_org.near";
// let data = Social.getr(`${event_creator}/published_events/${event_id}`);
const data = Near.view(CONTRACT, "get_event", { event_id: event_id });
const participants = data.cur_participants;

const participantWidgets = participants.map((accountId) => {
  return (
    <>
      <Widget src={`mob.near/widget/ProfileLine`} props={{ accountId }} />
    </>
  );
});

const EventImage = styled.img`
  max-width: 400px;
  max-height: 300px;
  margin-bottom: 16px;
  align-self: center;
`;

const Card = styled.div`
display: flex;
flex-direction: column;
width: 400px;
padding: 20px;
border: 1px solid gray;
`;

const Title = styled.div`
display: flex;
align-items: baseline;
`;

const TitleText = styled.h5`
flex: 1;
`;

const NumPersons = styled.div``;

const Organizer = styled.div`
font-size: 14px;
`;

const Description = styled.div`
font-size: 14px;
color: gray
`;

const Join = styled.div`
margin-top: 16px;
display: flex;
align-items: center;
flex-direction: column;
`;

const JoinBy = styled.div`
font-style: italic;
color: gray;
font-size: 12px;
`;

const ParticipantCount = styled.div`
margin-top: 8px;
`;

function callJoin() {
  Near.call({
    contractName: CONTRACT,
    methodName: "join",
    args: {
      account_id: accountId,
      event_id: event_id,
    },
    deposit: data.price,
  });
}

function callClaim() {
  Near.call({
    contractName: CONTRACT,
    methodName: "claim",
    args: {
      event_id: event_id,
    },
  });
}

function button(data) {
  let deadline = new Date(data.deadline / 1000000);
  let today = new Date();
  if (data.status == "WAITING") {
    if (deadline > today) {
      if (!data.cur_participants.includes(accountId)) {
        return (
          <Join>
            <button onClick={callJoin}>
              Join for{" "}
              <b>{Math.round((data.price / 1e24) * 100) / 100} NEAR </b>
            </button>{" "}
            <JoinBy>
              Join by{" "}
              {new Date(data.deadline / 1000000).toISOString().substring(0, 10)}
            </JoinBy>
          </Join>
        );
      }
    } else {
      return (
        <Join>
          <button onClick={callClaim}>End Event</button>{" "}
          <JoinBy>
            Event deadline
            {new Date(data.deadline / 1000000)
              .toISOString()
              .substring(0, 10)}{" "}
            passed
          </JoinBy>
        </Join>
      );
    }
  } else {
    return (
      <JoinBy>
        <br />
        Event deadline
        {new Date(data.deadline / 1000000).toISOString().substring(0, 10)}{" "}
        passed
      </JoinBy>
    );
  }
}

return (
  <Card>
    {data.image_link && (
      <EventImage src={`https://ipfs.near.social/ipfs/${data.image_link}`} />
    )}
    <Title>
      <TitleText>{data.title || "Untitled"}</TitleText>
      <NumPersons>
        {data.min_num} - {data.max_num} people
      </NumPersons>
    </Title>
    <Organizer>
      Organized by
      <Widget
        src={`mob.near/widget/ProfileLine`}
        props={{ accountId: data.owner }}
      />
    </Organizer>
    {data.description && <Description>{data.description}</Description>}
    <ParticipantCount>
      {participants.length > 0
        ? participants.length +
          (participants.length > 1 ? " participants:" : " participant:")
        : "Join to be the first participant!"}
    </ParticipantCount>
    {participantWidgets}
    {button(data)}
  </Card>
);
