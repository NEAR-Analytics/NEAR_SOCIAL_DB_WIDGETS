const { accountId } = context;
if (!accountId) {
  return "You need to login with your Near wallet first!";
}

const contractId = "app.chess-game.near";
const buttonWidget = "chess-game.near/widget/ChessGameButton";

const Challenge = styled.div`
  display: flex;
  font-size: 1.2rem;
  flex-wrap: wrap;
  gap: 0.2rem;
  border-radius: 0.4rem;
  border: 1px solid black;
  padding: 0.3rem;

  > *:first-child {
    flex: 1 0 100%;
  }
`;
const GameSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;

  > * {
    margin: 1rem;
  }
`;
const GameCreator = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > *:not(h2) {
    margin: 0.2rem 0;
  }

  h2, h3, h4 {
    align-self: center;
  }
`;

const challenges0 = Near.view(contractId, "get_challenges", {
  account_id: accountId,
  is_challenger: true,
});
const challenges1 = Near.view(contractId, "get_challenges", {
  account_id: accountId,
  is_challenger: false,
});
const openChallenges = [
  ...challenges0.map((id) => ({
    challenge_id: id,
    is_challenger: true,
  })),
  ...challenges1.map((id) => ({
    challenge_id: id,
    is_challenger: false,
  })),
];

State.init({
  challenged_id: "",
});

const updateChallengedId = ({ target }) => {
  State.update({ challenged_id: target.value });
};
const challenge = () => {
  Near.call(contractId, "challenge", {
    challenged_id: state.challenged_id,
  });
};
const acceptChallenge = (challenge_id) => () => {
  Near.call(contractId, "accept_challenge", {
    challenge_id,
  });
};
const rejectChallenge = (challenge_id, is_challenger) => () => {
  Near.call(contractId, "reject_challenge", {
    challenge_id,
    is_challenger,
  });
};

const renderOpenChallenges = (challenges) => {
  return (
    <GameSelector>
      {challenges.map(({ challenge_id, is_challenger }) => {
        return (
          <Challenge>
            <span>{challenge_id.split("-vs-").join(" vs ")}</span>
            {!is_challenger && (
              <Widget
                src={buttonWidget}
                props={{
                  onClick: acceptChallenge(challenge_id),
                  content: "Accept",
                }}
              />
            )}
            <Widget
              src={buttonWidget}
              props={{
                onClick: rejectChallenge(challenge_id, is_challenger),
                content: "Reject",
              }}
            />
          </Challenge>
        );
      })}
    </GameSelector>
  );
};

return (
  <GameCreator>
    <h2>PvP:</h2>
    <h3>Open challenges:</h3>
    {openChallenges.length === 0 ? (
      <span>
        No open challenges found.
        <br />
        Challenge your first opponent now below!
      </span>
    ) : (
      renderOpenChallenges(openChallenges)
    )}
    <span>Account ID:</span>
    <input onChange={updateChallengedId} value={state.challenged_id} />
    <Widget
      src={buttonWidget}
      props={{
        onClick: challenge,
        fontSize: "1.4rem",
        content: "Challenge!",
      }}
    />
  </GameCreator>
);
