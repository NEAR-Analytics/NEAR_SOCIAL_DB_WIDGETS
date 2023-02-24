/*props

widgetPath: string

*/

if (!props.widgetPath) return "send {widgetPath: string} in props";

const SOCIAL_CONTRACT = "social.near";

const [widgetAccountId, _, widget] = props.widgetPath.split("/");

//to_vec overflow rust contract
const accountsGrantedPermissions = Near.view(
  SOCIAL_CONTRACT,
  "debug_get_permissions",
  { account_id: widgetAccountId }
);

const widgetwithNodeId = Near.view(SOCIAL_CONTRACT, "get", {
  keys: [props.widgetPath],
  options: { with_node_id: true },
});

const nodeIds = [
  widgetwithNodeId[":node"],
  widgetwithNodeId[widgetAccountId][":node"],
  widgetwithNodeId[widgetAccountId]["widget"][":node"],
  widgetwithNodeId[widgetAccountId]["widget"][widget][":node"],
];
const map_filtered_accounts_granted_permissions =
  accountsGrantedPermissions.map((filter) => {
    return filter[0].AccountId;
  });

return (
  <div>
    {accountsGrantedPermissions.map((el) => {
      return (
        el[1].Granted.find((el) => nodeIds.includes(el)) && (
          <div>{el[0].AccountId || el[0].SignerPublicKey}</div>
        )
      );
    })}
  </div>
);
