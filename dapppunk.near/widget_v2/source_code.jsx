const receiver = "altanboost.near";

const NEAR_TO_YOCTONEAR_FACTOR = Big("1000000000000000000000000"); // 1e24
let nearAmount = Big(Math.floor(0.05 * 1e2)); // Convert NEAR to a smaller unit that can be handled as an integer
let yoctoNearAmount = nearAmount * NEAR_TO_YOCTONEAR_FACTOR;

let TG_TO_YOCTONEAR_FACTOR = Big("1000000000000"); // 1e12
let TGAmount = Big(300);
let _yoctoNearAmount = TGAmount * TG_TO_YOCTONEAR_FACTOR;

console.log("I am here");
State.init({
  currentDonations: 0,
  totalDonations: 100,
});

const header = props.header ?? <></>;
const body = props.body ?? <></>;
const footer = props.footer ?? <></>;
var currentDonations = state.currentDonations ?? 0;
var totalDonations = state.totalDonations ?? 0;

// CSS for the card
const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
  flex-shrink: 0;
  width: 60%;
  height: 65vh;  // adjust this to your liking

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 50%;  // changed this to 50%
    background-image: url(${(props) => props.bgImage});
    background-size: cover;
    background-position: center;
    border-radius: 8px 8px 0 0;
  }
`;

const CardHeader = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5em 0;
  gap: 0.675em;
  background: #fff9ed;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1.5em 1.5em 1em;
  gap: 0.675em;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 1;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 1.5em;
  gap: 1em;
  border-top: 1px solid #eceef0;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 1;
`;

// CSS for the component
const ProgressBarContainer = styled.div`
  height: 20px;
  width: 80%;
  background-color: #e0e0e0;
  border-radius: 50px;
  margin: 0px 10%;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: #4caf50;
  border-radius: inherit;
  text-align: right;
`;

// Adding styled components for title, description and progress label
const ProgressBarTitle = styled.h2`
  text-align: center;
`;

const ProgressBarDescription = styled.p`
  text-align: center;
`;

const ProgressBarLabel = styled.span`
  text-align: center;
  display: block;
  margin-top: 10px;
`;

// Donate Input and Button
const DonateInput = styled.input`
  border: 1px solid #eceef0;
  padding: 10px;
  border-radius: 8px;
  flex-grow: 1;
  margin-right: 10px;
`;

const DonateButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
`;

const handleButtonClick = () => {
  Near.call([
    {
      contractName: "donation-near-social.near",
      methodName: "donate",
      args: {
        beneficiary: receiver,
      },
      deposit: "100000000000000000000000",
      gas: "200000000000000",
    },
  ]);
};

return (
  <CardContainer bgImage="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80">
    <CardHeader show={!!props.header}>{header}</CardHeader>
    <CardBody>{body}</CardBody>
    <ProgressBarTitle>Donation Progress</ProgressBarTitle>
    <ProgressBarDescription>
      Help us reach our donation goal!
    </ProgressBarDescription>
    <ProgressBarContainer>
      <ProgressBar
        width={(currentDonations / totalDonations) * 100}
      ></ProgressBar>
    </ProgressBarContainer>
    <ProgressBarLabel>
      {currentDonations} / {totalDonations} donated
    </ProgressBarLabel>
    <CardFooter>
      <DonateInput
        id="donateInput"
        type="number"
        placeholder="Enter amount in $NEAR"
      />
      <DonateButton id="donateButton">
        <button
          onClick={handleButtonClick}
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          Donate
        </button>
      </DonateButton>
      {footer}
    </CardFooter>
  </CardContainer>
);
