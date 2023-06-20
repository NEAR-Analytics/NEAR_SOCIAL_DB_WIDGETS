/* INCLUDE: "common.jsx" */
const nearNFDevsContractAccountId =
  props.nearNFDevsContractAccountId ||
  (context.widgetSrc ?? "near-analytics.near").split("/", 1)[0];

const nearNFDevsWidgetsAccountId =
  props.nearNFDevsWidgetsAccountId ||
  (context.widgetSrc ?? "near-analytics.near").split("/", 1)[0];

function widget(widgetName, widgetProps, key) {
  widgetProps = {
    ...widgetProps,
    nearNFDevsContractAccountId: props.nearNFDevsContractAccountId,
    nearNFDevsWidgetsAccountId: props.nearNFDevsWidgetsAccountId,
    referral: props.referral,
  };

  return (
    <Widget
      src={`${nearNFDevsWidgetsAccountId}/widget/townhall-board.${widgetName}`}
      props={widgetProps}
      key={key}
    />
  );
}

function href(widgetName, linkProps) {
  linkProps = { ...linkProps };

  if (props.nearNFDevsContractAccountId) {
    linkProps.nearNFDevsContractAccountId = props.nearNFDevsContractAccountId;
  }

  if (props.nearNFDevsWidgetsAccountId) {
    linkProps.nearNFDevsWidgetsAccountId = props.nearNFDevsWidgetsAccountId;
  }

  if (props.referral) {
    linkProps.referral = props.referral;
  }

  const linkPropsQuery = Object.entries(linkProps)
    .filter(([_key, nullable]) => (nullable ?? null) !== null)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return `/#/${nearNFDevsWidgetsAccountId}/widget/townhall-board.pages.${widgetName}${
    linkPropsQuery ? "?" : ""
  }${linkPropsQuery}`;
}
/* END_INCLUDE: "common.jsx" */

const Banner = styled.div`
   {
    height: 62px;
    background: #181818;
    margin-top: -24px;
    padding: 16px 20px;

    img {
      height: 30px;
    }

    margin-bottom: 25px;
  }
`;

return (
  <>
    <Banner className="d-flex justify-content-between">
      <a href={href("Feed")}>
        <img src="https://ipfs.near.social/ipfs/bafkreibjsn3gswlcc5mvgkfv7ady2lzkd2htm55l472suarbd34qryh2uy"></img>
      </a>
      <div>
        <a href="#" class="text-white me-2"></a>

        <div class="btn-group" role="group">
          <button
            type="button"
            class="btn btn-outline-light rounded-circle"
            style={{
              width: "30px",
              height: "30px",
              padding: "6px 0px",
              borderWidth: "0.5px",
              lineHeight: "0px",
            }}
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-question-lg"></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <a
                target="_blank"
                class="dropdown-item"
                href="https://github.com/near/devgigsboard-widgets/issues/new?assignees=&labels=bug&template=bug_report.md&title="
              >
                Report a bug
              </a>
            </li>
            <li>
              <a
                target="_blank"
                class="dropdown-item"
                href="https://github.com/near/devgigsboard-widgets/issues/new?assignees=&labels=enhancement&template=feature-request.md&title="
              >
                Suggest an improvement
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Banner>
  </>
);
