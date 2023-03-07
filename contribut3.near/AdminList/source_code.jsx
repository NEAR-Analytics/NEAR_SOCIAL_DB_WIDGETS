const ownerId = "contribut3.near";
const limit = 10;
const search = props.search ?? "";

State.init({
  entities: [],
  shown: [],
  from: 0,
  hasMore: true,
});

Near.asyncView(
  ownerId,
  "get_admin_entities",
  { account_id: context.accountId },
  "final",
  false
).then((entities) => State.update({ entities: entities.sort() }));

const allEntities = (
  Near.view(
    ownerId,
    "get_admin_entities",
    { account_id: context.accountId },
    "final",
    false
  ) ?? []
).filter((accountId) => accountId.includes(search));

const loadMore = () =>
  State.update({
    shown: [
      ...state.shown,
      state.entities.slice(state.from, state.from + limit),
    ],
    from: state.from + limit,
    hasMore: state.from + limit < state.entities.length,
  });

if (!allEntities || allEntities.length === 0) {
  return "No entities with Admin access for your account!";
}

const WidgetContainer = styled.div`
  margin-bottom: 0.5em;
`;

return (
  <>
    {allEntities.map((accountId) => (
      <WidgetContainer key={accountId}>
        <Widget
          src={`${ownerId}/widget/Entity`}
          props={{
            accountId,
            notStandalone: false,
            inboxView: true,
            update: props.update,
          }}
        />
      </WidgetContainer>
    ))}
  </>
);
