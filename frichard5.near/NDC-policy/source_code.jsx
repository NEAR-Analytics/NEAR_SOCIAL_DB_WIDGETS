const widgetProvider = props.widgetProvider;
const account = props.account || "marketing.sputnik-dao.near";
const apiUrl = `https://api.pikespeak.ai/daos/policy/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const Label = styled.span`
  color:#8c8c8c;
  font-size: 11px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;

const GeneralInfos = styled.div`
    padding: 10px;
    background: rgba(68, 152, 224, 0.1);
    border-radius: 4px;
    width: 49%;
`;

const membersFormatter = (roles) => {
  let memberList = [];
  if (Array.isArray(roles.kind) && roles.kind.length) {
    memberList = roles.kind.map((m) => {
      return (
        <a href={`https://explorer.near.org/accounts/${m}`} target="_blank">
          {m}
        </a>
      );
    });
  } else if (roles.kind.length) {
    memberList = [roles.kind];
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>{memberList}</div>
  );
};

const permissionsFormatter = (roles) => {
  const permissions = roles.permissions.map((p) => (
    <div>{p.replace("*:", "")}</div>
  ));
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {permissions}
    </div>
  );
};

const columns = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "kind",
    label: "Members",
    formatter: membersFormatter,
  },
  {
    id: "permissions",
    label: "Permissions",
    formatter: permissionsFormatter,
  },
];

const parseNano = (nano) => {
  return Number(nano) / Math.pow(10, 9) / 86400;
};

const parseNear = (near) => {
  return (Number(near) / Math.pow(10, 24)).toFixed(2);
};

const GenericTable = (
  <Widget
    src={`${widgetProvider}/widget/generic_table`}
    props={{
      title: `Roles and permissions`,
      columns,
      data: state.roles,
    }}
  />
);

const fetchPolicy = () => {
  const policy = fetch(apiUrl, {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  });
  policy.body &&
    State.update({
      policy: policy.body.state.policy,
      roles: policy.body.state.policy.roles,
      config: policy.body.state.config,
    });
};

if (!state.policy || state.account != account) fetchPolicy();

return (
  <div style={{ marginTop: "40px" }}>
    {state.policy && (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <GeneralInfos>
          <h2>Infos</h2>
          <InfoWrapper>
            <Label>Name</Label>
            <span>{state.config.name}</span>
          </InfoWrapper>
          <InfoWrapper>
            <Label>Purpose</Label>
            <span>{state.config.purpose}</span>
          </InfoWrapper>
        </GeneralInfos>
        <GeneralInfos>
          <h2>Policy</h2>
          <InfoWrapper>
            <Label>Proposal period</Label>
            <span>{parseNano(state.policy.proposal_period)} days</span>
          </InfoWrapper>
          <InfoWrapper>
            <Label>Proposal bond</Label>
            <span>{parseNear(state.policy.proposal_bond)} NEAR</span>
          </InfoWrapper>
          <InfoWrapper>
            <Label>Bounty forgiveness period</Label>
            <span>
              {parseNano(state.policy.bounty_forgiveness_period)} days
            </span>
          </InfoWrapper>
          <InfoWrapper>
            <Label>Bounty bond</Label>
            <span>{parseNear(state.policy.bounty_bond)} NEAR</span>
          </InfoWrapper>
        </GeneralInfos>
      </div>
    )}
    {state.policy && GenericTable}
  </div>
);
