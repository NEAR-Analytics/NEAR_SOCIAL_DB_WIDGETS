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

const Banner = styled.div`
  {
    position: fixed;
    left: calc(-50vw + 50%);
    width: 100vw;
    height: 100px;
    background: #232323;
    z-index: 2;
    margin-top: -24px;
  }
`;

const Logo = styled.div`
{
  position:fixed;
  padding: 32px 0;
  z-index: 3;
  margin-top: -24px;

  img {
    height: 36px;
  }
}
`;

const Scroll = styled.div`
{
  z-index: -1;
  margin-top: calc(-24px + 100px + 35px);
}`;

const Gradient = styled.div`
{
  position: absolute;
  width: 1057.31px;
  height: 2620.61px;
  left: 1986.1px;
  top: -332.99px;

  background: linear-gradient(180deg, #00CCFF 0.57%, #3252A6 100.57%);
  opacity: 0.22;
  filter: blur(250px);
  transform: rotate(99.78deg);
}
`;

return (
  <>
    <Banner>
      <div class="row"></div>
    </Banner>
    <Gradient></Gradient>
    <Logo>
      <img src="https://ipfs.near.social/ipfs/bafkreifm5y7r6bqcjtef6wytrp7ysdxocmgmjffjziorqya4p7kbtamntu"></img>
    </Logo>
    <Scroll>
      {widget("components.layout.Controls")}
      {widget("components.layout.Navbar", {
        children: props.navbarChildren,
      })}
      {props.children}
    </Scroll>
  </>
);
