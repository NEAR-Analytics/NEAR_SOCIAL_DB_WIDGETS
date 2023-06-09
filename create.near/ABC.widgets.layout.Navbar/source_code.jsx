/* INCLUDE: "common.jsx" */
const nearDevGovGigsContractAccountId =
  props.nearDevGovGigsContractAccountId ||
  (context.widgetSrc ?? "devgovgigs.near").split("/", 1)[0];
const nearDevGovGigsWidgetsAccountId =
  props.nearDevGovGigsWidgetsAccountId ||
  (context.widgetSrc ?? "create.near").split("/", 1)[0];

function widget(widgetName, widgetProps, key) {
  widgetProps = {
    ...widgetProps,
    nearDevGovGigsContractAccountId: props.nearDevGovGigsContractAccountId,
    nearDevGovGigsWidgetsAccountId: props.nearDevGovGigsWidgetsAccountId,
    referral: props.referral,
  };
  return (
    <Widget
      src={`${nearDevGovGigsWidgetsAccountId}/widget/ABC.${widgetName}`}
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
  return `#/${nearDevGovGigsWidgetsAccountId}/widget/ABC.${widgetName}${
    linkPropsQuery ? "?" : ""
  }${linkPropsQuery}`;
}
/* END_INCLUDE: "common.jsx" */

return (
  <div class="card border-secondary">
    <div class="nav navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item ">
            <a class="nav-link active" href={href("Feed")}>
              <i class="bi-balloon-heart"> </i>
              Community
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href={href("Widgets")}>
              <i class="bi-gear"> </i>
              Gadgets
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link active" href={href("Projects")}>
              <i class="bi-clipboard"> </i>
              Projects
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link active" href={href("Badges")}>
              <i class="bi-patch-check"> </i>
              Badges
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link active" href={href("Teams")}>
              <i class="bi-buildings"> </i>
              Teams
            </a>
          </li>

          {props.children ? (
            <li class="nav-item active ms-2">{props.children}</li>
          ) : null}
        </ul>
      </div>
    </div>
  </div>
);
