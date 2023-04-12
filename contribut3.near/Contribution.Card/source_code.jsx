const ownerId = "contribut3.near";
const projectId = props.projectId;
const vendorId = props.vendorId;
const cid = props.cid;
const isVendorView = props.isVendorView ?? false;

State.init({
  contribution: null,
  contributionIsFetched: false,
  request: null,
  requestIsFetched: false,
});

if (!state.contributionIsFetched) {
  Near.asyncView(
    ownerId,
    "get_contribution",
    { project_id: projectId, vendor_id: vendorId, cid },
    "final",
    false
  ).then((contribution) => State.update({ contribution, contributionIsFetched: true }));
}

if (!state.requestIsFetched) {
  Near.asyncView(
    ownerId,
    "get_request",
    { account_id: projectId, cid },
    "final",
    false
  ).then((request) => State.update({ request, requestIsFetched: true }));
}

if (!state.contributionIsFetched || !state.requestIsFetched) {
  return <>Loading...</>;
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const completedDate = new Date(Number(state.contribution.status.Completed));
const completedDateString = `Completed ${completedDate.toLocaleDateString()}`;

const Completed = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: .75em;
  line-height: 1em;
  color: #11181c;
`;

const feedback = isVendorView ? state.contribution.project_feedback : state.contribution.vendor_feedback;

const Feedback = styled.p`
  font-style: italic;
  font-weight: 400;
  font-size: .95em;
  line-height: 1.5em;
  color: #11181c;
  border-left: 6px solid #00ec97;
  padding-left: .625em;
`;

const Title = styled.h3`
  font-style: normal;
  font-weight: 600;
  font-size: 1em;
  line-height: 1.4em;
  color: #101828;
`;

const body = (
  <>
    <Row>
      <Widget
        src={`${ownerId}/widget/ProfileLine`}
        props={{
          accountId: isVendorView ? projectId : vendorId,
          imageSize: "2em",
          update: props.update,
          isEntity: isVendorView,
        }}
      />
      <Completed>{completedDateString}</Completed>
    </Row>
    <Title>{state.request.title}</Title>
    <Feedback>"{feedback}"</Feedback>
  </>
);

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const startDate = new Date(Number(state.contribution.actions[0].start_date));
const price = state.contribution.price;
const type = state.request.request_type;

const footer = (
  <Footer>
  </Footer>
);

return <Widget src={`${ownerId}/widget/Card`} props={{ body, footer }} />;
