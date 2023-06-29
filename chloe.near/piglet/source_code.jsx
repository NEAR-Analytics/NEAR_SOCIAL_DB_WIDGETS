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

const accountId = props.accountId || context.accountId;

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
          updatedTableData.push({
            address: event.from,
            value: event.value,
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
    {state.isLoading ? (
      <div>Loading data...</div>
    ) : state.isVerified ? (
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
      <Button onClick={handleClickCrowd}>
        Check to see if you are a part of the crowd.
      </Button>
    )}
    {state.isCrowd && (
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
              <tr key={index}>
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
    )}
  </Container>
);
