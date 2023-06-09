const ownerId =
  "3f165cfc842dd839a00c78d2e7470857ae98e640dc303f0070b3b3d606bd9e4b";
// credit Id - credits of ownerId
const creditId = `credits.${ownerId}`;
let accountId =
  props.accountId ||
  "3f165cfc842dd839a00c78d2e7470857ae98e640dc303f0070b3b3d606bd9e4b";
let profile = socialGetr(`${accountId}/profile`);
const contracts = [
  "dev-1680714992236-65898712788505",
  "dev-1643583533233-86904103016460",
];
// Initialize credit state
State.init({
  credits: 0,
  creditsIsFetched: true,
});

if (!state.creditsIsFetched) {
  Near.asyncView(
    creditId,
    "ft_balance_of",
    { account_id: context.accountId },
    "final",
    false
  ).then((credits) => State.update({ credits, creditsIsFetched: true }));
}

// Initialize user accounts state
State.init({
  accounts: 0,
  accountsIsFetched: true,
});

if (!state.accountsIsFetched) {
  Near.asyncView(
    accountsId,
    "get_user",
    { account_id: context.accountId },
    // maybe remove "final"
    "final",
    false
  ).then((accounts) => State.update({ accounts, accountsIsFetched: true }));
}

const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-bottom: 1px solid #eceef0;
  padding: 0.75em 0;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  position: sticky;
  top: 0;
  margin-bottom: 1.5em;
  transform: translateY(-1em);
`;

const BodyArea = styled.div`
  background: #333333;
`;

const LogoArea = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 0.7em;
  font-style: normal;
  font-weight: 700;
  font-size: 1.2em;
  line-height: 1.5em;
  color: #11181c;

  &:hover {
    text-decoration: none;
    color: #11181c;
  }
`;

const ActionArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 0px;
  gap: 1em;
`;

const logo = (
  <LogoArea
    href={`/#/${ownerId}/widget/moonbase-auth`}
    onClick={() => props.update({})}
  >
    <></>MoonBase AA Widget
  </LogoArea>
);

const Credits = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.55em;
  gap: 1em;
  background: #eceef0;
  border-radius: 100px;
  flex: none;
  order: 0;
  flex-grow: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  color: #11181c;
`;

const Signups = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.55em;
  gap: 1em;
  background: #eceef0;
  border-radius: 100px;
  flex: none;
  order: 0;
  flex-grow: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  color: #11181c;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5em;
  padding: 0.5em 0.2em;
`;

const Heading = styled.div`
  padding-bottom: 0.5em;
  border-bottom: 1px solid #eceef0;
  font-style: normal;
  font-weight: 600;
  font-size: 1em;
  line-height: 1.4em;
  color: #000;
  width: 100%;
`;

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 0.5em;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
`;

const stats = (
  <Stats>
    <span>Sign-Ups:</span>

    <Credits>{state.credits}</Credits>
  </Stats>
);

const actions = (
  <ActionArea>
    <button>Sign Up</button>
  </ActionArea>
);

const usersarea = (
  <Container>
    <Heading>Users Signed Up So Far..</Heading>
    <img src={profile.image.url} />
    <span>{profile.name}</span>
    <span>(@{accountId})</span>
  </Container>
);

return (
  <Navbar>
    {logo}
    {actions}
    {stats}
    {usersarea}
  </Navbar>
);
