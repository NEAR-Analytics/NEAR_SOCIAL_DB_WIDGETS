const ownerId = "contribut3.near";
const search = props.search;
const accountId = props.accountId;

State.init({
  invites: [],
  shown: [],
  from: 0,
  hasMore: true,
});

Near.asyncView(
  ownerId,
  accountId ? "get_entity_invites" : "get_contributor_invites",
  { account_id: props.accountId ?? context.accountId },
  "final",
  false
).then((invites) => State.update({ invites: invites.sort() }));

const loadMore = () =>
  State.update({
    shown: state.invites.slice(0, state.from + limit),
    from: state.from + limit,
    hasMore: state.from + limit < state.invites.length,
  });

const WidgetContainer = styled.div`
  margin-bottom: 0.5em;
`;

return (
  <InfiniteScroll loadMore={loadMore} hasMore={state.hasMore}>
    {state.entities
      .filter((accountId) => accountId.includes(search))
      .map((entityId) => (
        <WidgetContainer key={entityId}>
          <Widget
            src={`${ownerId}/widget/Invite`}
            props={{
              entityId: accountId ?? entityId,
              accountId: accountId ? entityId : null,
              update: props.update,
            }}
          />
        </WidgetContainer>
      ))}
  </InfiniteScroll>
);
