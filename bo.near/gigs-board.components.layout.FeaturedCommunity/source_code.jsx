/* INCLUDE: "common.jsx" */
const nearDevGovGigsContractAccountId =
  props.nearDevGovGigsContractAccountId ||
  (context.widgetSrc ?? "devgovgigs.near").split("/", 1)[0];
const nearDevGovGigsWidgetsAccountId =
  props.nearDevGovGigsWidgetsAccountId ||
  (context.widgetSrc ?? "devgovgigs.near").split("/", 1)[0];

function widget(widgetName, widgetProps, key) {
  widgetProps = {
    ...widgetProps,
    nearDevGovGigsContractAccountId: props.nearDevGovGigsContractAccountId,
    nearDevGovGigsWidgetsAccountId: props.nearDevGovGigsWidgetsAccountId,
    referral: props.referral,
  };
  return (
    <Widget
      src={`${nearDevGovGigsWidgetsAccountId}/widget/gigs-board.${widgetName}`}
      props={widgetProps}
      key={key}
    />
  );
}

function href(widgetName, linkProps) {
  linkProps = { ...linkProps };
  if (props.nearDevGovGigsContractAccountId) {
    linkProps.nearDevGovGigsContractAccountId =
      props.nearDevGovGigsContractAccountId;
  }
  if (props.nearDevGovGigsWidgetsAccountId) {
    linkProps.nearDevGovGigsWidgetsAccountId =
      props.nearDevGovGigsWidgetsAccountId;
  }
  if (props.referral) {
    linkProps.referral = props.referral;
  }
  const linkPropsQuery = Object.entries(linkProps)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return `#/${nearDevGovGigsWidgetsAccountId}/widget/gigs-board.pages.${widgetName}${
    linkPropsQuery ? "?" : ""
  }${linkPropsQuery}`;
}
/* END_INCLUDE: "common.jsx" */

const Card = styled.div`
   {
    border: 1px solid #eceef0;

    /* Shadow/sm */
    box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
      0px 1px 2px rgba(16, 24, 40, 0.06);
    border-radius: 16px;
  }
`;

return <div class="card">
      <img src="https://ipfs.near.social/ipfs/bafkreifuflol4fgihxcgpxkl56lygpgdisdfbizrjpt4jhir7mvx3ddh4a" class="card-img-top"></img>
      <div class="nav navbar-brand h1 p-2">Zero Knowledge</div>
<div class="mt-2 text-secondary">
Building a zero knowledge ecosystem on NEAR.
</div>
</div>;
// return <Card>
//         <div class="p-3">
//             <div class="d-flex flex-row align-items-center">
//             <img src="https://ipfs.near.social/ipfs/bafkreihbjm67uavkjkvfqomzx5v63t6kossqwfuptdxfb4vbcpbw3gezdm"></img>

//         </div>
//         <div class="border-top p-3">
//             <a class="btn btn-light rounded-5 border w-100">View Details</a>
//         </div>
//     </Card>;