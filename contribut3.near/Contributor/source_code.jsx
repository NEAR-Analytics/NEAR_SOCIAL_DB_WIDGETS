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

if (!contributor) {
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
                  {state.isEntity ? (
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M23.4 16.1389C23.4 15.6687 23.1997 15.2208 22.8483 14.8928C22.4974 14.5652 22.0241 14.3834 21.5333 14.3834H19.0667L19.0667 13.8049C19.0637 12.9232 18.687 12.0813 18.0238 11.4623C17.361 10.8437 16.4651 10.4972 15.5333 10.4945H13.2333V8.56113H16.2833C16.7741 8.56113 17.2474 8.37929 17.5983 8.05173C17.9497 7.72374 18.15 7.27581 18.15 6.80558V2.91669C18.15 2.44646 17.9497 1.99853 17.5983 1.67053C17.2474 1.34297 16.7741 1.16113 16.2833 1.16113H7.11667C6.62588 1.16113 6.15265 1.34297 5.8017 1.67053C5.45027 1.99853 5.25 2.44646 5.25 2.91669V6.80558C5.25 7.27581 5.45027 7.72374 5.8017 8.05173C6.15265 8.37929 6.62588 8.56113 7.11667 8.56113H11.1667V10.4945L8.86609 10.4945C7.93431 10.4972 7.03899 10.8437 6.37622 11.4623C5.71299 12.0813 5.33627 12.9238 5.33333 13.8056V14.3834H2.86667C2.37588 14.3834 1.90265 14.5652 1.55169 14.8928C1.20027 15.2208 1 15.6687 1 16.1389L1 20.8056C1 21.2758 1.20027 21.7237 1.55169 22.0517C1.90265 22.3793 2.37588 22.5611 2.86667 22.5611H9.86667C10.3575 22.5611 10.8307 22.3793 11.1816 22.0517C11.5331 21.7237 11.7333 21.2758 11.7333 20.8056V16.1389C11.7333 15.6687 11.5331 15.2208 11.1816 14.8928C10.8307 14.5652 10.3575 14.3834 9.86667 14.3834H7.4V13.8056C7.4 13.4507 7.55093 13.1073 7.82462 12.8518C8.09878 12.596 8.4734 12.45 8.86667 12.45L15.5333 12.45C15.9266 12.45 16.3012 12.596 16.5754 12.8518C16.8491 13.1073 17 13.4507 17 13.8056V14.3834H14.5333C14.0425 14.3834 13.5693 14.5652 13.2184 14.8928C12.8669 15.2208 12.6667 15.6687 12.6667 16.1389V20.8056C12.6667 21.2758 12.8669 21.7237 13.2184 22.0517C13.5693 22.3793 14.0425 22.5611 14.5333 22.5611H21.5333C22.0241 22.5611 22.4974 22.3793 22.8483 22.0517C23.1997 21.7237 23.4 21.2758 23.4 20.8056V16.1389ZM14.7333 16.3389H21.3333V20.6056H14.7333V16.3389ZM7.31667 3.11669L16.0833 3.11669V6.60558H7.31667V3.11669ZM3.06667 16.3389H9.66667L9.66667 20.6056H3.06667L3.06667 16.3389Z"
                        fill="#667085"
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
