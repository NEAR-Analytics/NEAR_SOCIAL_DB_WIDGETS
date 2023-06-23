const accountId = props.accountId || context.accountId;

const GameButton = styled.button`
  background: palevioletred;
  color: white;
  font-size: 1em;
  margin: 10px;
  padding: 0.5em 1em;
  border: 2px solid palevioletred;
  border-radius: 10px;
  &:hover {
    background: white;
    color: palevioletred;
  }
`;

if (!accountId) {
  return (
    <div>
      <p>Please connect your NEAR wallet or create a new one:</p>
      <a href="https://near.org/signup" target="_blank" rel="noreferrer">
        <GameButton>Create NEAR Wallet</GameButton>
      </a>
    </div>
  );
}

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #282c34;
  color: white;
  font-size: calc(10px + 2vmin);
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-weight: bold;
  margin-top: 20px;
`;

const Info = styled.p`
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const PigButton = styled(GameButton)`
  background: #ffbd2a;
  border-color: #ffbd2a;
`;

const VerifyButton = styled(GameButton)`
  background: #60b347;
  border-color: #60b347;
`;

const handleClickVerify = () => {
  alert("You are now verified as a human.");
};

const handleClickEnter = () => {
  alert("You have successfully entered the crowd funding platform.");
};

return (
  <GameContainer>
    <Title>
      Hello {accountId}! Welcome to Piglet, your community crowd funding
      platform.
    </Title>
    <ButtonContainer>
      <PigButton onClick={handleClickEnter}>Enter the Platform</PigButton>
      <VerifyButton onClick={handleClickVerify}>
        Verify Your Humanity
      </VerifyButton>
    </ButtonContainer>
  </GameContainer>
);
