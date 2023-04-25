const ownerId = "contribut3.near";
const accountId = props.accountId ?? context.accountId;

State.init({
  founders: null,
  foundersIsFetched: false,
  team: null,
  teamIsFetched: false,
});

if (!state.foundersIsFetched) {
  Near.asyncView(
    ownerId,
    "get_founders",
    { account_id: accountId },
    "final",
    false
  ).then((founders) => State.update({ founders, foundersIsFetched: true }));
}

if (!state.teamIsFetched) {
  Near.asyncView(
    ownerId,
    "get_team",
    { account_id: accountId },
    "final",
    false
  ).then((team) => State.update({ team, teamIsFetched: true }));
}

if (!state.foundersIsFetched || !state.teamIsFetched) {
  return <>Loading...</>;
}

if (!state.namesIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [...state.founders, ...state.team].map((key) => `${key}/profile/name`) },
    "final",
    false
  ).then((names) => {
    State.update({ names: new Map(Object.keys(names).map((account) => [account, names[account].profile.name])), namesIsFetched: true })
  });
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 0;
  margin: 0;
  list-style: none;
  width: 100%;
`;

const Item = styled.li`
  display: flex;
  flex-direction: row;
  gap: 1em;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const Heading = styled.h3`
  font-style: normal;
  font-weight: 700;
  font-size: 1.125em;
  line-height: 1.5em;

  color: #000000;
`;

return <>
  <Heading>Founders</Heading>
  <List>{state.founders.map((founder) => <Item>
    <Widget src={`${ownerId}/widget/Vendor.Icon`} props={{ accountId: founder, size: "2em" }} />
    <Widget src={`${ownerId}/widget/NameAndAccount`} props={{ accountId: founder, name: state.names.get(founder), nameSize: ".9em" }} />
  </Item>)}</List>
  <Heading>Team</Heading>
</>;
