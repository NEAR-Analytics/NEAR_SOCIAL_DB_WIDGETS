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

const Table = styled.table`
  width: 100%;
  margin-top: 20px;

  th, td {
    border: 1px solid black;
    padding: 10px;
  }

  .sender-row {
    color: green;
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
  background: #ffc0cb;
  color: black; 
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

const PiggyImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 81.9px; /* Add the desired spacing between the images */
`;

const CoverImage = styled.img`
  width: 90%;
  height: auto;
  margin-bottom: 20px;
`;

if (
  state.chainId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}
if (state.chainId !== undefined && state.chainId !== 137) {
  return <p>Switch to Polygon Mainnet</p>;
}

function initPiggyState() {
  return {
    isCrowd: false,
    isVerified: false,
    chainOne: false,
    chainTwo: false,
    chainThree: false,
    tableData: [], // This state will hold the fetched data for the table
  };
}

// DETECT SENDER
if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    const addressWithoutPrefix = accounts[0].substring(2);
    State.update({ sender: addressWithoutPrefix });
    console.log("set sender", addressWithoutPrefix);
  }
}

State.init(initPiggyState());

// Handle the click event for verification
function handleClickVerify() {
  State.update({ isVerified: true });
  alert("You are now verified as a human.");
}

function handleClickCrowd() {
  State.update({ isCrowd: true });

  asyncFetch(
    "https://raw.githubusercontent.com/doulos819/piglet/main/output.json"
  )
    .then((res) => {
      console.log("Fetch response:", res); // log the raw fetch response

      // Parse the response body into an object
      const data = JSON.parse(res.body);
      console.log("Parsed data:", data); // log the parsed data

      let updatedTableData = [];
      data.forEach((item) => {
        item["@data"].events.forEach((event) => {
          // Use BN to handle the large number
          const valueBN = new BN(event.value);
          // Convert from Gwei (base 9 decimals) to Ether (base 18 decimals)
          const valueInEtherBN = valueBN.div(new BN("1000000000000000000"));
          updatedTableData.push({
            address: event.from,
            value: valueInEtherBN.toString(), // convert BN to string for display
          });
        });
      });

      console.log("Updated table data:", updatedTableData); // log the new data array

      State.update({ tableData: updatedTableData });
      console.log("State after update:", State.get()); // log the state after the update
    })
    .catch((error) => {
      console.error("Error fetching data:", error); // log any fetch errors
    });
}

const getSender = () => {
  return state.sender
    ? state.sender.substring(0, 6) +
        "..." +
        state.sender.substring(state.sender.length - 4, state.sender.length)
    : "";
};

getSender();

// Handle the click event for entering the platform
function handleClickEnter() {
  State.update({ isPiggy: true });
  alert("You have successfully entered the crowd funding platform.");
}

// $sDAI?
function handleEnterChainOne() {
  State.update({ chainOne: true });
  alert(
    "You have successfully entered the crowd saving platform on Chain One."
  );
}

// $shETH
function handleEnterChainTwo() {
  State.update({ chainTwo: true });
}

//APECoin
function handleEnterChainThree() {
  State.update({ chainThree: true });
  alert(
    "You have successfully entered the crowd saving platform on Chain Three."
  );
}

return (
  <Container>
    <CoverImage
      src="https://github.com/doulos819/piglet/blob/main/photo_2023-06-25_02-54-33.jpg?raw=true"
      alt="Cover"
    />
    <Header>FAQ:</Header>
    <Header>
      1. The first step with Piglet is to purchase an NFT from Unlock Protocol.
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
      2. Continue collecting NFTs according to your savings goals! If you
      selected the recurring option, the savings will be topped up
      automatically, and if you chose manual, then you will have to come back
      weekly to get a new piggy.
    </Header>
    <Header>
      3. This is the page to see how your saving is going. Records for all user
      savings are saved, aggregated, and then displayed, powered by The Graph
      Substreams!
    </Header>
    <Header>
      4. To interact with Piglet crowd savings voting platform, you will need to
      verify with Sismo Connect (workdcoin/polygon ID). This step is not needed
      to take part in the personal savings flow.
    </Header>
    <PiggyImagesContainer>
      <PiggyImage
        src="https://github.com/doulos819/mjr/blob/main/images/photo_2023-06-23_11-46-49.jpg?raw=true"
        alt="Piggy 1"
      />
      <PiggyImage
        src="https://github.com/doulos819/piglet/blob/main/photo_2023-06-25_04-48-47.jpg?raw=true"
        alt="Piggy 2"
      />
    </PiggyImagesContainer>

    <Title>
      {state.sender ? (
        <>
          Hello {state.sender}! Welcome to Piglet, your community crowd saving
          platform.
        </>
      ) : (
        <>Welcome to Piglet, your community crowd saving platform.</>
      )}
    </Title>

    {state.isLoading ? (
      <div>Loading data...</div>
    ) : (
      <>
        {!state.isVerified && (
          <Button onClick={handleClickVerify}>Verify as a human</Button>
        )}

        {state.isVerified && (
          <>
            <Info>Thank you for verifying your humanity, piglet.</Info>
            <Info>
              You can now deposit into the piggy bank of your choice! No matter
              which piglet you choose, you will still be saving{" "}
            </Info>
            <Button
              onClick={state.chainOne ? undefined : handleEnterChainOne}
              disabled={state.chainOne}
              style={{
                backgroundColor: state.chainOne ? "grey" : "palevioletred",
              }}
            >
              Enter The $sDAI Piggy Bank
            </Button>
            <Button
              onClick={state.chainTwo ? undefined : handleEnterChainTwo}
              disabled={state.chainTwo}
              style={{
                backgroundColor: state.chainTwo ? "grey" : "palevioletred",
              }}
            >
              Enter The $unshETH Piggy Bank
            </Button>
            <Button
              onClick={state.chainThree ? undefined : handleEnterChainThree}
              disabled={state.chainThree}
              style={{
                backgroundColor: state.chainThree ? "grey" : "palevioletred",
              }}
            >
              Enter $APE Piggy Bank
            </Button>
          </>
        )}

        <Button onClick={handleClickCrowd}>
          Check to see if you are a part of the crowd.
        </Button>

        <Info> {state.sender} </Info>

        <Table>
          <thead>
            <tr>
              <th>Address</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {state.tableData.length > 0 ? (
              state.tableData.map((item, index) => (
                <tr
                  key={index}
                  className={item.address === state.sender ? "sender-row" : ""}
                >
                  <td>{item.address}</td>
                  <td>{item.value}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No data to display</td>
              </tr>
            )}
          </tbody>
        </Table>
      </>
    )}
  </Container>
);
