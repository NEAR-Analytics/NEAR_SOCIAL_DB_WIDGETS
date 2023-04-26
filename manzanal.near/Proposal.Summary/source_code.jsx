const ownerId = "contribut3.near";
const accountId = props.accountId ?? context.accountId;
const cid = props.cid;
const vendorId = props.vendorId;
const size = props.size ?? "1em";

State.init({
  proposal: null,
  proposalIsFetched: false,
  request: null,
  requestIsFetched: false,
});

if (!state.proposalIsFetched) {
  Near.asyncView(
    ownerId,
    "get_proposal",
    { project_id: accountId, cid, vendor_id: vendorId },
    "final",
    false
  ).then((request) => State.update({ proposal, proposalIsFetched: true }));
}

if (!state.requestIsFetched) {
  Near.asyncView(
    ownerId,
    "get_request",
    { account_id: accountId, cid, vendor_id: vendorId },
    "final",
    false
  ).then((request) => State.update({ request, requestIsFetched: true }));
}

if (!proposalIsFetched || !requestIsFetched) return <>Loading...</>;

const Container = styled.div`
  width: 100%;
  color: #101828;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 24px;
  gap: 8px;
  background: #fafafa;
  border-bottom: 1px solid #eceef0;
  border-radius: 8px;
`;

const Title = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  color: #101828;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.125em;
  font-style: normal;
  font-weight: 400;
  font-size: 0.75em;
  line-height: 1em;
  color: #11181c;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 0.4em;
  flex: none;
  order: 1;
  flex-grow: 0;
  font-style: normal;
  font-weight: 500;
  font-size: 0.75em;
  line-height: 1em;
  color: #11181c;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.25em;
  width: 100%;
`;

const Description = styled.div`
  padding-left: 1em;
  border-left: 3px solid #b2ddff;
  width: 100%;
`;

const Price = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.125em;

  span:first-child {
    font-style: normal;
    font-weight: 400;
    font-size: 0.75em;
    line-height: 1em;
    text-decoration-line: line-through;
    color: #7e868c;
  }

  span:last-child {
    font-style: normal;
    font-weight: 700;
    font-size: 0.75em;
    line-height: 1em;
    text-decoration-line: none;
    color: #11181c;
  }
`;

const Quote = styles.div``;

const price =
  state.proposal.price !== state.request.budget ? (
    <>
      <span>NH {state.request.budget}</span>
      {" → "}
      <span>NH {state.proposal.price}</span>
    </>
  ) : (
    <span>NH {state.proposal.price}</span>
  );

return (
  <Container>
    <Quote>
      <Column>
        <Row>
          <Detail>
            Type: <b>{state.proposal.proposal_type}</b>
          </Detail>
          <Price>{price}</Price>
        </Row>
        <Description>
          <Widget
            src={`${ownerId}/widget/DescriptionArea`}
            props={{ description: state.proposal.description }}
          />
        </Description>
      </Column>
    </Quote>
  </Container>
);
