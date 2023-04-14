const ownerId = "contribut3.near";
const entityId = props.entityId;
const contributorId = props.contributorId;
const accountId = context.accountId;
const isEntity = props.isEntity ?? false;

State.init({
  finishFormHidden: true,
});

if (!entityId || !contributorId) {
  return "Cannot show contribution without entity ID or contributor ID!";
}

const contribution = Near.view(
  ownerId,
  "get_contribution",
  { entity_id: entityId, contributor_id: contributorId },
  "final",
  false
);

const isAuthorized = Near.view(
  ownerId,
  "check_is_manager_or_higher",
  { account_id: accountId, entity_id: entityId },
  "final",
  false
);

const profile = Social.getr(`${isEntity ? contributorId : entityId}/profile`);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  min-height: 8em;
  max-width: 100%;
  padding: 0 0.75em;
  border-bottom: 1px solid #eaecf0;
`;

const Wrapper = styled.div`
  flex-grow: 1;
  padding: 0.75em 0;
  max-width: 100%;
`;

const ActionColumn = styled.div`
  display: "flex";
  flex-direction: row;
  justify-content: between;
  align-items: center;
`;

const TagWrapper = styled.div`
  max-width: 100%;
  margin: 0.5em 0;
`;

return (
  <Container id={accountId}>
    <Wrapper>
      <Widget
        src={`${ownerId}/widget/ProfileLine`}
        props={{
          accountId: isEntity ? contributorId : entityId,
          isEntity: !isEntity,
          imageSize: "4em",
          update: props.update,
          additionalColumn: (
            <ActionColumn>
              <Widget
                src={`${ownerId}/widget/ActiveIndicator`}
                props={{ active: !contribution.end_date }}
              />
              <Widget
                src={`${ownerId}/widget/CardMenu`}
                props={{
                  update: props.update,
                  items: [
                    isAuthorized
                      ? {
                        text: "Stop contribution",
                        icon: "bi-slash-circle",
                        id: "stop",
                        onClick: () =>
                          State.update({ finishFormHidden: false }),
                      }
                      : null,
                    {
                      text: "View details",
                      icon: "bi-info-circle",
                      href: `/#/${ownerId}/widget/Index?tab=contribution&entityId=${entityId}&contributorId=${contributorId}`,
                      onClick: () =>
                        props.update({
                          tab: "contribution",
                          content: "",
                          search: "",
                          entityId,
                          contributorId,
                        }),
                    },
                    {
                      text: "Share",
                      icon: "bi-arrow-up-right",
                      id: "share",
                    },
                  ].filter((item) => item !== null),
                }}
              />
              <Widget
                src={`${ownerId}/widget/ContributionForm`}
                props={{
                  id: `${entityId}${contributorId}ContributionForm`,
                  entityId: entityId,
                  contributorId: contributorId,
                  hidden: state.finishFormHidden,
                  onClose: () => State.update({ finishFormHidden: true }),
                }}
              />
            </ActionColumn>
          ),
          additionalRow: (
            <TagWrapper>
              <Widget
                src={`${ownerId}/widget/Tags`}
                props={{ tags: profile.tags }}
              />
            </TagWrapper>
          ),
        }}
      />
    </Wrapper>
  </Container>
);
