/* INCLUDE: "common.jsx" */
const contractAccountId =
  props.contractAccountId ||
  (context.widgetSrc ?? "web4_profile.near").split("/", 1)[0];
const widgetAccountId =
  props.widgetAccountId ||
  (context.widgetSrc ?? "web4_profile.near").split("/", 1)[0];

function widget(widgetName, widgetProps, key) {
  widgetProps = {
    ...widgetProps,
    contractAccountId: props.contractAccountId,
    widgetAccountId: props.widgetAccountId,
    referral: props.referral,
  };
  return (
    <Widget
      src={`${widgetAccountId}/widget/${widgetName}`}
      props={widgetProps}
      key={key}
    />
  );
}

function href(widgetName, linkProps) {
  linkProps = { ...linkProps };
  if (props.contractAccountId) {
    linkProps.contractAccountId = props.contractAccountId;
  }
  if (props.widgetAccountId) {
    linkProps.widgetAccountId = props.widgetAccountId;
  }
  if (props.referral) {
    linkProps.referral = props.referral;
  }
  const linkPropsQuery = Object.entries(linkProps)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return `#/${widgetAccountId}/widget/pages.${widgetName}${
    linkPropsQuery ? "?" : ""
  }${linkPropsQuery}`;
}
/* END_INCLUDE: "common.jsx" */

if (!context.accountId) {
  return <div>Please log in to be able to create Little Link profile</div>;
}

const rpcUrl = "https://rpc.mainnet.near.org";
const factoryContractId = "web4_profile.nearukraineguild.near";

const profileContractId =
  Near.view(factoryContractId, "get_registered_contract_by_creator", {
    creator_id: context.accountId,
  }) || "";

if (profileContractId === null || profileContractId === undefined) {
  return <div>Fetching data ...</div>;
} else if (profileContractId === "") {
  return widget("components.profiles.ProfileCreator", {
    rpcUrl: rpcUrl,
    factoryContractId: factoryContractId,
  });
} else {
  const fields = Near.view(profileContractId, "get_data");

  return widget("components.profiles.ProfileEditor", {
    profileContractId: profileContractId,
    ...(fields || {}),
  });
}
