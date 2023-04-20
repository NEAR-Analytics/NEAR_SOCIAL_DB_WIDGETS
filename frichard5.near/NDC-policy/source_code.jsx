const widgetProvider = props.widgetProvider;
const account = props.account || "marketing.sputnik-dao.near";
const apiUrl = `https://api.pikespeak.ai/daos/policy/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const membersFormatter = (data) => {
  const members = data.policy.roles;
  let memberList;
  if (Array.isArray(members) && members.length) {
    memberList = members.map((m) => {
      return (
        <a href={`https://explorer.near.org/accounts/${m}`} target="_blank">
          {m}
        </a>
      );
    });
    return memberList;
  } else if (members.length) {
    memberList = [
      <a href={`https://explorer.near.org/accounts/${members}`} target="_blank">
        {members}
      </a>,
    ];
  }
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
    id: "new_users",
    label: "new users",
  },
  {
    id: "permissions",
    label: "Permissions",
    //formatter: amountsFormatter("amounts_in"),
  },
];

const GenericTable = (
  <Widget
    src={`${widgetProvider}/widget/generic_table`}
    props={{
      title: `Roles and permissions`,
      columns,
      data: state.policy,
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
    });
};
!state.policy && fetchPolicy();

console.log("POLICY", state.policy);

return <div>{GenericTable}</div>;
