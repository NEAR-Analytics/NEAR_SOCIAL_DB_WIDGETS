const ownerId = "contribut3.near";
const accountId = props.accountId;

if (!accountId) {
  return "Cannot show entity without account ID!";
}

const availableContent = [
  "proposals",
  "invitations",
  "requests",
  "contributions",
  "contributors",
  "graph",
];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "requests";
  }

  return content;
};

State.init({
  contributionFormHidden: true,
});

const entity = Near.view(
  ownerId,
  "get_entity",
  { account_id: accountId },
  "final"
);

const isAuthorized = Near.view(
  ownerId,
  "check_is_manager_or_higher",
  { entity_id: accountId, account_id: context.accountId },
  "final"
);

const founders =
  Near.view(
    ownerId,
    "get_founders",
    { account_id: accountId },
    "final",
    true
  ) || [];

const profile = Social.getr(`${accountId}/profile`);

const controls = isAuthorized ? (
  <div className="d-flex flex-row justify-content-between align-items-center">
    <a
      className="btn btn-outline-secondary me-2"
      style={{ width: "8em" }}
      href={`/#/${ownerId}/widget/Index?tab=create&content=entity&accountId=${accountId}`}
      onClick={() =>
        props.update({ tab: "create", content: "entity", accountId })
      }
    >
      <i className="bi-pencil-square" />
      <span>Edit project</span>
    </a>
    <Widget
      src={`${ownerId}/widget/CardMenu`}
      props={{
        update: props.update,
        items: [
          {
            text: "Create new request",
            icon: "bi-boxes",
            href: `/#/${ownerId}/widget/Index?tab=create&content=request&accountId=${accountId}`,
            onClick: () =>
              props.update({ tab: "create", content: "request", accountId }),
          },
          // {
          //   text: "Invite contributors",
          //   icon: "bi-person-plus",
          // },
          // {
          //   text: "Delete project",
          //   icon: "bi-trash",
          // },
        ],
      }}
    />
  </div>
) : (
  <div className="d-flex flex-column justify-content-start align-items-stretch">
    <a
      className="btn btn-success me-2 text-light"
      style={{ width: "13em" }}
      onClick={() => State.update({ contributionFormHidden: false })}
    >
      <i className="bi-person-up" />
      <span className="text-nowrap">Propose contribution</span>
    </a>
    <Widget
      src={`${ownerId}/widget/ContributionRequestForm`}
      props={{
        id: `${accountId}ContributionRequestForm`,
        entity: accountId,
        hidden: state.contributionFormHidden,
        onClose: () => State.update({ contributionFormHidden: true }),
      }}
    />
  </div>
);

const body = (
  <div className="px-3">
    <div className="d-flex flex-row justify-content-start" id={accountId}>
      <div className="flex-grow-1 py-3">
        <Widget
          src={`${ownerId}/widget/ProfileLine`}
          props={{
            accountId,
            isEntity: true,
            imageSize: "4em",
            update: props.update,
            additionalColumn: controls,
            additionalRow: (
              <>
                <div className="d-flex flex-row justify-content-start align-items-center">
                  <span className="text-muted me-2">
                    Created{" "}
                    {new Date(
                      Number(contributor.start_date)
                    ).toLocaleDateString()}
                  </span>
                  <Widget
                    src={`${ownerId}/widget/ActiveIndicator`}
                    props={{ active: contributor.status === "Active" }}
                  />
                </div>
                <Widget
                  src={`${ownerId}/widget/Tags`}
                  pros={{ tags: profile.tags }}
                />
              </>
            ),
          }}
        />
      </div>
    </div>
    <Widget
      src={`${ownerId}/widget/DescriptionArea`}
      props={{ description: profile.description }}
    />
    <div className="d-flex flex-row justify-content-between align-items-center">
      <Widget
        src={`${ownerId}/widget/SocialLinks`}
        props={{ links: profile.linktree ?? {} }}
      />
      <div>
        {founders.map((founder) => (
          <Widget
            src={`${ownerId}/widget/ProfileLine`}
            props={{
              accountId: founder,
              isEntity: false,
              update: props.update,
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

const proposalsCount = Object.keys(
  Near.view(
    ownerId,
    "get_entity_contribution_requests",
    { account_id: accountId },
    "final",
    true
  ) ?? []
).length;

const invitesCount = Object.keys(
  Near.view(
    ownerId,
    "get_entity_invites",
    { account_id: accountId },
    "final",
    true
  ) ?? {}
).length;

const contentSelector = (
  <Widget
    src={`${ownerId}/widget/TabSelector`}
    props={{
      tab: "entity",
      content: getContent(props.content),
      search: props.search,
      accountId: props.accountId,
      update: props.update,
      buttons: [
        {
          id: "requests",
          text: "Requests",
          icon: "bi-boxes",
        },
        isAuthorized
          ? {
            id: "proposals",
            text: "Proposals",
            icon: "bi-person-down",
            count: contributorsCount,
          }
          : null,
        isAuthorized
          ? {
            id: "invitations",
            text: "Invitations",
            icon: "bi-hourglass",
            count: contributorsCount,
          }
          : null,
        {
          id: "contributions",
          text: "In-Graph",
          icon: "bi-person-up",
        },
        {
          id: "graph",
          text: "Out-Graph",
          icon: "bi-ui-checks-grid",
        },
        {
          id: "contributors",
          text: "Contributors",
          icon: "bi-people",
        },
      ].filter((x) => x !== null),
    }}
  />
);

const content = {
  requests: (
    <Widget
      src={`${ownerId}/widget/NeedList`}
      props={{ accountId, search: props.search, update: props.update }}
    />
  ),
  proposals: (
    <Widget
      src={`${ownerId}/widget/ContributionRequestList`}
      props={{ accountId, search: props.search, update: props.update }}
    />
  ),
  contributions: (
    <Widget
      src={`${ownerId}/widget/ContributionList`}
      props={{
        accountId,
        isEntity: true,
        search: props.search,
        update: props.update,
      }}
    />
  ),
  graph: (
    <Widget
      src={`${ownerId}/widget/ContributionList`}
      props={{
        accountId,
        search: props.search,
        update: props.update,
      }}
    />
  ),
  contributors: (
    <Widget
      src={`${ownerId}/widget/ContributorList`}
      props={{ accountId, search: props.search, update: props.update }}
    />
  ),
  invitations: (
    <Widget
      src={`${ownerId}/widget/InviteList`}
      props={{ accountId, search: props.search, update: props.update }}
    />
  ),
}[getContent(props.content)];

return (
  <div>
    <div className="mb-5">{body}</div>
    <div className="d-flex flex-row justify-content-between ps-3">
      {contentSelector}
      <Widget
        src={`${ownerId}/widget/SearchInput`}
        props={{ search: props.search, update: props.update }}
      />
    </div>
    <div className="px-3 pt-3">{content}</div>
  </div>
);
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.16877 2.5816C7.64262 2.5816 7.13802 2.80739 6.76598 3.2093C6.39394 3.61121 6.18493 4.15631 6.18493 4.72469V8.68117C6.18493 8.81234 6.1367 8.93813 6.05084 9.03088C5.96499 9.12363 5.84854 9.17573 5.72712 9.17573H2.06466C1.53851 9.17573 1.03392 9.40152 0.661875 9.80343C0.289833 10.2053 0.0808229 10.7504 0.0808229 11.3188V15.2753C0.0808229 15.5567 0.132136 15.8354 0.231834 16.0954C0.331531 16.3554 0.477659 16.5917 0.661875 16.7907C0.846091 16.9897 1.06479 17.1476 1.30548 17.2553C1.54617 17.363 1.80414 17.4184 2.06466 17.4184H11.8312C12.0918 17.4184 12.3497 17.363 12.5904 17.2553C12.8311 17.1476 13.0498 16.9897 13.234 16.7907C13.4182 16.5917 13.5644 16.3554 13.6641 16.0954C13.7638 15.8354 13.8151 15.5567 13.8151 15.2753V11.3188C13.8151 11.1877 13.8633 11.0619 13.9492 10.9691C14.035 10.8764 14.1515 10.8243 14.2729 10.8243H17.9353C18.4615 10.8243 18.9661 10.5985 19.3381 10.1966C19.7102 9.79466 19.9192 9.24956 19.9192 8.68117V4.72469C19.9192 4.15631 19.7102 3.61121 19.3381 3.2093C18.9661 2.80739 18.4615 2.5816 17.9353 2.5816H8.16877ZM17.9353 9.17573H13.8151V4.23014H17.9353C18.0568 4.23014 18.1732 4.28224 18.2591 4.37499C18.3449 4.46774 18.3932 4.59353 18.3932 4.72469V8.68117C18.3932 8.81234 18.3449 8.93813 18.2591 9.03088C18.1732 9.12363 18.0568 9.17573 17.9353 9.17573ZM12.289 9.17573H7.71096V4.72469C7.71096 4.59353 7.75919 4.46774 7.84505 4.37499C7.9309 4.28224 8.04735 4.23014 8.16877 4.23014H12.289V9.17573ZM6.18493 10.8243V15.7699H2.06466C1.94324 15.7699 1.82679 15.7178 1.74094 15.625C1.65508 15.5323 1.60685 15.4065 1.60685 15.2753V11.3188C1.60685 11.1877 1.65508 11.0619 1.74094 10.9691C1.82679 10.8764 1.94324 10.8243 2.06466 10.8243H6.18493ZM7.71096 10.8243H12.289V15.2753C12.289 15.4065 12.2408 15.5323 12.155 15.625C12.0691 15.7178 11.9527 15.7699 11.8312 15.7699H7.71096V10.8243Z" fill="#667085"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.70694 3.15358C7.09365 2.73582 7.61935 2.5 8.16877 2.5H17.9353C18.4848 2.5 19.0105 2.73582 19.3972 3.15358C19.7837 3.57115 20 4.13638 20 4.72469V8.68117C20 9.26949 19.7837 9.83472 19.3972 10.2523C19.0105 10.67 18.4848 10.9059 17.9353 10.9059H14.2729C14.1747 10.9059 14.0794 10.9479 14.0082 11.0248C13.9368 11.1019 13.8959 11.2076 13.8959 11.3188V15.2753C13.8959 15.5667 13.8428 15.8554 13.7394 16.1249C13.6361 16.3944 13.4845 16.6396 13.2931 16.8464C13.1016 17.0532 12.874 17.2176 12.6232 17.3299C12.3723 17.4421 12.1032 17.5 11.8312 17.5H2.06466C1.79274 17.5 1.52362 17.4421 1.27273 17.3299C1.02186 17.2176 0.794275 17.0532 0.602827 16.8464C0.411389 16.6396 0.259798 16.3944 0.156461 16.1249C0.0531272 15.8554 0 15.5667 0 15.2753V11.3188C0 10.7305 0.216288 10.1653 0.602827 9.74771C0.989538 9.32996 1.51525 9.09413 2.06466 9.09413H5.72712C5.82527 9.09413 5.92061 9.05206 5.99179 8.97516C6.06315 8.89807 6.10411 8.79241 6.10411 8.68117V4.72469C6.10411 4.13638 6.3204 3.57115 6.70694 3.15358ZM8.16877 2.6632C7.66589 2.6632 7.1824 2.87896 6.82503 3.26502C6.46749 3.65127 6.26575 4.17624 6.26575 4.72469V8.68117C6.26575 8.83227 6.21024 8.97819 6.10989 9.0866C6.00937 9.19519 5.87181 9.25734 5.72712 9.25734H2.06466C1.56178 9.25734 1.07829 9.47309 0.720923 9.85915C0.363379 10.2454 0.161646 10.7704 0.161646 11.3188V15.2753C0.161646 15.5468 0.211146 15.8154 0.307206 16.066C0.403263 16.3165 0.543928 16.5438 0.720923 16.735C0.897907 16.9262 1.10772 17.0775 1.33823 17.1807C1.56871 17.2838 1.81554 17.3368 2.06466 17.3368H11.8312C12.0804 17.3368 12.3272 17.2838 12.5577 17.1807C12.7882 17.0775 12.998 16.9262 13.175 16.735C13.352 16.5438 13.4926 16.3165 13.5887 16.066C13.6847 15.8154 13.7342 15.5468 13.7342 15.2753V11.3188C13.7342 11.1677 13.7898 11.0218 13.8901 10.9134C13.9906 10.8048 14.1282 10.7427 14.2729 10.7427H17.9353C18.4382 10.7427 18.9217 10.5269 19.2791 10.1408C19.6366 9.7546 19.8384 9.22963 19.8384 8.68117V4.72469C19.8384 4.17624 19.6366 3.65127 19.2791 3.26502C18.9217 2.87896 18.4382 2.6632 17.9353 2.6632H8.16877ZM8.16877 4.31174C8.07062 4.31174 7.97528 4.35381 7.9041 4.43071C7.83274 4.50779 7.79178 4.61346 7.79178 4.72469V9.09413H12.2082V4.31174H8.16877ZM7.786 4.31927C7.88653 4.21067 8.02408 4.14853 8.16877 4.14853H12.3699V9.25734H7.63014V4.72469C7.63014 4.5736 7.68565 4.42768 7.786 4.31927ZM13.7342 4.14853H17.9353C18.08 4.14853 18.2176 4.21067 18.3181 4.31927C18.4185 4.42768 18.474 4.5736 18.474 4.72469V8.68117C18.474 8.83227 18.4185 8.97819 18.3181 9.0866C18.2176 9.19519 18.08 9.25734 17.9353 9.25734H13.7342V4.14853ZM13.8959 4.31174V9.09413H17.9353C18.0335 9.09413 18.1288 9.05206 18.2 8.97516C18.2714 8.89807 18.3123 8.79241 18.3123 8.68117V4.72469C18.3123 4.61346 18.2714 4.50779 18.2 4.43071C18.1288 4.35381 18.0335 4.31174 17.9353 4.31174H13.8959ZM2.06466 10.9059C1.96651 10.9059 1.87117 10.9479 1.79999 11.0248C1.72863 11.1019 1.68767 11.2076 1.68767 11.3188V15.2753C1.68767 15.3865 1.72863 15.4922 1.79999 15.5693C1.87117 15.6462 1.96651 15.6883 2.06466 15.6883H6.10411V10.9059H2.06466ZM1.68189 10.9134C1.78242 10.8048 1.91997 10.7427 2.06466 10.7427H6.26575V15.8515H2.06466C1.91997 15.8515 1.78242 15.7893 1.68189 15.6807C1.58154 15.5723 1.52603 15.4264 1.52603 15.2753V11.3188C1.52603 11.1677 1.58154 11.0218 1.68189 10.9134ZM7.63014 10.7427H12.3699V15.2753C12.3699 15.4264 12.3144 15.5723 12.214 15.6807C12.1135 15.7893 11.9759 15.8515 11.8312 15.8515H7.63014V10.7427ZM7.79178 10.9059V15.6883H11.8312C11.9294 15.6883 12.0247 15.6462 12.0959 15.5693C12.1673 15.4922 12.2082 15.3865 12.2082 15.2753V10.9059H7.79178Z" fill="#667085"/>
</svg>
