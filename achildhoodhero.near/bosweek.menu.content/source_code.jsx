const menu = context.accountId
  ? Social.get(`${context.accountId}/settings/near.social/page.menu`)
  : undefined;

if (menu === null) {
  return "";
}

const defaultWidgets = [
  {
    src: "achildhoodhero.near/widget/nearweek-newsletter",
  },
  {
    src: "nearweekapp.near/widget/NEARWEEKNews",
    requiresLogin: false,
  },
  {
    src: "nearweekapp.near/widget/Easy-DAO-Payout-Proposal",
  },
];

const widgets = (menu && JSON.parse(menu)) ?? defaultWidgets;

const Div = styled.div`
  position: relative;
  @media (hover: hover) {
    > .edit-link {
      display: none;
    }
  }
  &:hover {
    > .edit-link {
      display: inline;
    }
  }
`;

return (
  <Div>
    {widgets.map(
      ({ src, requiresLogin }, i) =>
        (!requiresLogin || context.accountId) && (
          <div key={i} className="text-bg-light rounded-4 p-3 mb-3">
            <Widget src={src} />
          </div>
        )
    )}
  </Div>
);
