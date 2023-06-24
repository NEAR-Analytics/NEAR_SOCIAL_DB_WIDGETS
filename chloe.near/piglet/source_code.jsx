const accountId = props.accountId || context.accountId;

State.init({
  isVerified: false,
  chainOne: false,
  chainTwo: false,
  chainThree: false,
});

// Styling components
const Button = styled.button`
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

const Header = styled.p`
  text-align: left;
  font-size: 0.8em;
  margin-top: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #ffc0cb; /* Update background color to a lighter pink */
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

const PiggyImage = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 20px;
`;

// Handle the click event for verification
const handleClickVerify = async () => {
  State.update({ isVerified: true });
  alert("You are now verified as a human.");
};

// Handle the click event for entering the platform
const handleClickEnter = async () => {
  State.update({ isPiggy: true });
  alert("You have successfully entered the crowd funding platform.");
};

const handleEnterChainOne = () => {
  State.update({ chainOne: true });
  alert(
    "You have successfully entered the crowd saving platform on Chain One."
  );
};

const handleEnterChainTwo = () => {
  State.update({ chainTwo: true });
  alert(
    "You have successfully entered the crowd saving platform on Chain Two."
  );
};

const handleEnterChainThree = () => {
  State.update({ chainThree: true });
  alert(
    "You have successfully entered the crowd saving platform on Chain Three."
  );
};

return (
  <Container>
    <Header>FAQ:</Header>
    <Header>
      1. The first step with Piglet is to purchace an NFT from Unlock Protocol.
      If you do not yet have an NFT, you can get one at
      <a
        href="https://app.unlock-protocol.com/checkout?id=39b62ad3-07f2-442d-b2ef-d136d6a83374"
        target="_blank"
        rel="noopener noreferrer"
      >
        Unlock Protocol Checkout
      </a>
    </Header>

    <Header>
      2. To interact with Piglet, you will need to verify with Sismo Connect
      (workdcoin/polygon ID)
    </Header>
    <Header>
      2. Once logged in, verify your account to enter the Piglet crowd savings
      pool.
    </Header>
    <Header>
      3. Once verified, you can enter the pool and start interacting with NFTs
      to support your saving goals.
    </Header>
    <PiggyImage
      src="https://github.com/doulos819/mjr/blob/main/images/photo_2023-06-23_11-46-49.jpg?raw=true"
      alt="Piggy"
    />
    <Title>
      {accountId ? (
        <>
          Hello {accountId}! Welcome to Piglet, your community crowd saving
          platform.
        </>
      ) : (
        <>Welcome to Piglet, your community crowd saving platform.</>
      )}
    </Title>

    {state.isVerified ? (
      <>
        <Info>Thank you for verifying your humanity, piglet.</Info>
        <Info>
          You can now deposit into the piggy bank of your choice{" "}
          {accountId ? `, ${accountId}` : ""}!
        </Info>
        <Button
          onClick={state.chainOne ? undefined : handleEnterChainOne}
          disabled={state.chainOne}
          style={{ backgroundColor: state.chainOne ? "grey" : "palevioletred" }}
        >
          Enter Piggy Bank 1
        </Button>
        <Button
          onClick={state.chainTwo ? undefined : handleEnterChainTwo}
          disabled={state.chainTwo}
          style={{ backgroundColor: state.chainTwo ? "grey" : "palevioletred" }}
        >
          Enter Piggy Bank 2
        </Button>
        <Button
          onClick={state.chainThree ? undefined : handleEnterChainThree}
          disabled={state.chainThree}
          style={{
            backgroundColor: state.chainThree ? "grey" : "palevioletred",
          }}
        >
          Enter Piggy Bank 3
        </Button>
      </>
    ) : (
      <Button onClick={handleClickVerify}>Verify Your Humanity</Button>
    )}
  </Container>
);
