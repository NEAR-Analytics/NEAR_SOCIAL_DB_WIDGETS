const ownerId = "contribut3.near";
const accountId = props.accountId ?? context.accountId;

State.init({
  profile: null,
  profileIsFetched: false,
});

if (!state.profileIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/**`] },
    "final",
    false
  ).then((profile) => State.update({ profile: profile[accountId].profile, profileIsFetched: true }));
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5em;
`;

return (
  <Container>
    <Widget
      src={`${ownerId}/widget/Vendor.Icon`}
      props={{ accountId, size: "8em" }}
    />
    <Details>
      <Widget
        src={`${ownerId}/widget/Inputs.Viewable.NameAndAccount`}
        props={{
          value: state.profile.name,
          id: "name",
          accountId,
          onSave: (name) => {
            const args = { data: {} };
            if (accountId === context.accountId) {
              args.data.profile = { name };
            } else {
              args.data[accountId] = { profile: { name } };
            }
            Near.call({ contractName: "social.near", methodName: "set", args, gas: "1", deposit: "1" });
          }
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Viewable.OneLiner`}
        props={{
          value: state.profile.tagline,
          id: "tagline",
          onSave: (tagline) => {
            const args = { data: {} };
            if (accountId === context.accountId) {
              args.data.profile = { tagline };
            } else {
              args.data[accountId] = { profile: { tagline } };
            }
            Near.call({ contractName: "social.near", methodName: "set", args, gas: "1", deposit: "1" });
          }
        }}
      />
      <Widget
        src={`${ownerId}/widget/BadgeList`}
        props={{
          badges: [
            { value: "Verified" },
          ],
        }}
      />
    </Details>
  </Container>
);
