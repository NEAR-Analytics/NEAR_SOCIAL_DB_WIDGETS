const widgetProvider = props.widgetProvider;
const account = props.account || "marketing.sputnik-dao.near";
const apiUrl = `https://api.pikespeak.ai/daos/policy/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

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
      policy: policy.body,
      roles: policy.body.state.policy.roles,
    });
};
!state.policy && fetchPolicy();

return <div>{GenericTable}</div>;
