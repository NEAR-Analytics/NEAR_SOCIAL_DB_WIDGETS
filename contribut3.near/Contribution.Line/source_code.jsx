const ownerId = "contribut3.near";
const projectId = props.projectId;
const vendorId = props.vendorId;
const cid = props.cid;
const size = props.size ?? "1em";

State.init({
  request: null,
  requestIsFetched: false,
  contribution: null,
  contributionIsFetched: false,
});

if (!state.requestIsFetched) {
  Near.asyncView(
    ownerId,
    "get_request",
    { account_id: projectId, cid },
    "final",
    false
  ).then((request) => State.update({ request, requestIsFetched: true }));
}

if (!state.contributionIsFetched) {
  Near.asyncView(
    ownerId,
    "get_contribution",
    { project_id: projectId, cid, vendor_id: vendorId },
    "final",
    false
  ).then((contribution) =>
    State.update({ contribution, contributionIsFetched: true })
  );
}

if (!state.requestIsFetched || !state.contributionIsFetched) {
  return <>Loading...</>;
}

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

const Details = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0px 0px;
  gap: 1.5em;
  flex: none;
  order: 4;
  align-self: stretch;
  flex-grow: 0;
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

const lastAction = state.contribution.actions.length > 0 ? state.contribution.actions[state.contribution.actions.length - 1] : null;

const lastActivity = (
  <Item>
    {lastAction ? (<>{lastAction.description} at {new Date(Number(lastAction.start_date)).toLocaleDateString()}</>) : <>Contract has started</>}
  </Item>
);

const budget = (
  <Item>
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 6.25V9.25M13.5 4.75V7.75M12.75 1C14.5865 1 15.5799 1.28107 16.0741 1.49908C16.1399 1.52812 16.1728 1.54263 16.2678 1.63328C16.3247 1.68761 16.4287 1.84705 16.4554 1.92107C16.5 2.04455 16.5 2.11205 16.5 2.24706V10.3084C16.5 10.9899 16.5 11.3307 16.3978 11.5059C16.2938 11.6841 16.1936 11.7669 15.999 11.8354C15.8076 11.9027 15.4215 11.8285 14.6491 11.6801C14.1085 11.5762 13.4674 11.5 12.75 11.5C10.5 11.5 8.25 13 5.25 13C3.41347 13 2.42015 12.7189 1.92591 12.5009C1.86009 12.4719 1.82718 12.4574 1.7322 12.3667C1.67526 12.3124 1.57134 12.153 1.5446 12.0789C1.5 11.9554 1.5 11.8879 1.5 11.7529L1.5 3.69164C1.5 3.01006 1.5 2.66928 1.60221 2.49411C1.70618 2.31592 1.80644 2.23309 2.00104 2.16461C2.19235 2.09729 2.57853 2.17149 3.35087 2.31989C3.89146 2.42376 4.53261 2.5 5.25 2.5C7.5 2.5 9.75 1 12.75 1ZM10.875 7C10.875 8.03553 10.0355 8.875 9 8.875C7.96447 8.875 7.125 8.03553 7.125 7C7.125 5.96447 7.96447 5.125 9 5.125C10.0355 5.125 10.875 5.96447 10.875 7Z"
        stroke="#7E868C"
        stroke-width="1.35"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    NH {state.request.budget}
  </Item>
);

const contributionType = (
  <Item>
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 14.75C13 13.7033 13 13.18 12.8708 12.7541C12.58 11.7953 11.8297 11.045 10.8709 10.7542C10.445 10.625 9.92167 10.625 8.875 10.625H5.125C4.07833 10.625 3.55499 10.625 3.12914 10.7542C2.17034 11.045 1.42003 11.7953 1.12918 12.7541C1 13.18 1 13.7033 1 14.75M10.375 4.625C10.375 6.48896 8.86396 8 7 8C5.13604 8 3.625 6.48896 3.625 4.625C3.625 2.76104 5.13604 1.25 7 1.25C8.86396 1.25 10.375 2.76104 10.375 4.625Z"
        stroke="#7E868C"
        stroke-width="1.35"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    {state.request.request_type}
  </Item>
);

const Label = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1.25em;
  color: #344054;
`;

return (
  <Container>
    <Label>Project</Label>
    <Widget
      src={`${ownerId}/widget/Project.Line`}
      props={{ accountId: projectId, size: "1.5em" }}
    />
    <Label>Vendor</Label>
    <Widget
      src={`${ownerId}/widget/Vendor.Line`}
      props={{ accountId: vendorId, size: "1.5em" }}
    />
    <Title>{state.request.title}</Title>
    <Details>
      {deadline}
      {budget}
      {contributionType}
    </Details>
  </Container>
);
