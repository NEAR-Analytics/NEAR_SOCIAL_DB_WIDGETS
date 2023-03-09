const ownerId = "contribut3.near";
const accountId = props.accountId;

if (!accountId) {
  return "Cannot show contributor without account ID!";
}

State.init({
  contributor: null,
  contributorFetched: false,
  isEntity: false,
  isEntityFetched: false,
  profile: null,
  profileFetched: false,
});

if (!state.contributorFetched) {
  Near.asyncView(
    ownerId,
    "get_contributor",
    { account_id: accountId },
    "final",
    false
  ).then((contributor) =>
    State.update({ contributor, contributorFetched: true })
  );
}

if (!state.contributor) {
  return "Loading...";
}

if (!state.isEntityFetched) {
  Near.asyncView(
    ownerId,
    "check_is_entity",
    { account_id: accountId },
    "final",
    false
  ).then((isEntity) => State.update({ isEntity, isEntityFetched: true }));
}

const active = state.contributor.looking_for_work;

if (!state.profileFetched) {
  const profile = Social.get(`${accountId}/profile/**`, "final", {
    subscribe: false,
  });
  State.update({ profile, profileFetched: true });
}

const contributionTypes = state.contributor.contribution_types.reduce(
  (ob, contributionType) =>
    typeof contributionType === "object"
      ? { ...ob, [contributionType.Other]: "" }
      : { ...ob, [contributionType]: "" },
  {}
);

if (contributionTypes && "Other" in contributionTypes) {
  contributionTypes[contributionTypes.Other] = "";
  delete contributionTypes.Other;
}

const skills = state.contributor.skills.reduce(
  (ob, skill) => ({ ...ob, [skill]: "" }),
  {}
);

const tags = { ...skills, ...contributionTypes } || state.profile.tags;

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
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: row;
  justify-content: between;
  align-items: center;
`;

const TypeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  span {
    margin-left: 0.5em;
  }
`;

const DescriptionWrapper = styled.div`
  max-width: 100%;
  margin-top: 0.5em;
`;

return (
  <Container id={accountId}>
    <Wrapper>
      <Widget
        src={`${ownerId}/widget/ProfileLine`}
        props={{
          accountId,
          isEntity,
          imageSize: "3em",
          update: props.update,
          additionalColumn: (
            <ActionColumn show={!inboxView}>
              <Widget
                src={`${ownerId}/widget/ActiveIndicator`}
                props={{
                  active,
                  activeText: "Available",
                  inactiveText: "Not avilable",
                }}
              />
              <Widget
                src={`${ownerId}/widget/CardMenu`}
                props={{
                  update: props.update,
                  items: [
                    {
                      text: "Invite to contribute",
                      icon: "bi-person-plus",
                      href: `/#/${ownerId}/widget/Index?tab=create&content=invite&accountId=${accountId}`,
                      onClick: () =>
                        props.update({
                          tab: "create",
                          content: "invite",
                          search: "",
                          accountId,
                        }),
                    },
                    {
                      text: "View details",
                      icon: "bi-info-circle",
                      href: `/#/${ownerId}/widget/Index?tab=contributor&accountId=${accountId}`,
                      onClick: () =>
                        props.update({
                          tab: "contributor",
                          content: "",
                          search: "",
                          accountId,
                        }),
                    },
                    {
                      text: "Share",
                      icon: "bi-arrow-up-right",
                      id: "share",
                    },
                  ],
                }}
              />
            </ActionColumn>
          ),
          additionalRow: (
            <>
              <TypeContainer>
                <i>
                  {!state.isEntity ? (
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.6666 18C16.6666 16.837 16.6666 16.2555 16.5231 15.7824C16.1999 14.717 15.3662 13.8834 14.3009 13.5602C13.8277 13.4167 13.2462 13.4167 12.0832 13.4167H7.91659C6.75362 13.4167 6.17213 13.4167 5.69897 13.5602C4.63363 13.8834 3.79995 14.717 3.47678 15.7824C3.33325 16.2555 3.33325 16.837 3.33325 18M13.7499 6.75C13.7499 8.82107 12.071 10.5 9.99992 10.5C7.92885 10.5 6.24992 8.82107 6.24992 6.75C6.24992 4.67893 7.92885 3 9.99992 3C12.071 3 13.7499 4.67893 13.7499 6.75Z"
                        stroke="#667085"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.6666 18C16.6666 16.837 16.6666 16.2555 16.5231 15.7824C16.1999 14.717 15.3662 13.8834 14.3009 13.5602C13.8277 13.4167 13.2462 13.4167 12.0832 13.4167H 7.91659C6.75362 13.4167 6.17213 13.4167 5.69897 13.5602C4.63363 13.8834 3.79995 14.717 3.47678 15.7824C3.33325 16.2555 3.33325 16.837 3.33325 18M13.7499 6.75C13.74 99 8.82107 12.071 10.5 9.99992 10.5C7.92885 10.5 6.24992 8.82107 6.24992 6.75C6.24992 4.67893 7.92885 3 9.99992 3C12.071 3 13.7499 4.67893 13.7499 6.75Z"
                        stroke="#667085"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </i>
                <span>
                  {state.isEntity ? "Organization" : "Individual contributor"}
                </span>
              </TypeContainer>
              <Widget src={`${ownerId}/widget/Tags`} props={{ tags }} />
            </>
          ),
        }}
      />
      <DescriptionWrapper>
        <Widget
          src={`${ownerId}/widget/DescriptionArea`}
          props={{
            description: state.contributor.resume || state.profile.description,
          }}
        />
      </DescriptionWrapper>
    </Wrapper>
  </Container>
);
