// Your styled Button component
const Button = styled.button`
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};
  border: 2px solid palevioletred;
  border-radius: 5px;
  padding: 8px 14px;
  cursor: pointer;
  outline: 0;
  font-weight: 600;
  text-transform: uppercase;
  :hover {
    background: palevioletred;
    color: white;
    opacity: 0.8;
    text-decoration: none;
  }
`;

// Initialize the state
State.init({
  blockHeight: Near.block("final").header.height,
  buttonClickCount: 0,
});

// Get the account ID from the props or the context
const accountId = props.accountId ?? context.accountId;

// Display the login message if the account ID is not available
if (!accountId) {
  return (
    <div>
      <p>Please connect your NEAR wallet or create a new one:</p>
      <a href="https://near.org/signup" target="_blank" rel="noreferrer">
        <button>Create NEAR Account</button>
      </a>
    </div>
  );
}

// Function to retrieve block height and store it in state
const getBlockHeight = () => {
  try {
    const blockData = Near.block("final");
    const blockHeight = blockData.header.height;
    State.update({
      blockHeight,
      buttonClickCount: state.buttonClickCount + 1,
    });
  } catch (error) {
    console.error("Failed to fetch block height:", error);
  }
};

// Define components
const blockHeightForm = (
  <div class="border border-black p-3">
    <Button class="btn btn-primary mt-2" onClick={getBlockHeight}>
      Fetch Block Height
    </Button>
  </div>
);

const notLoggedInWarning = <p>Please login to fetch the block height.</p>;

// Render
return (
  <div class="container border border-info p-3">
    <h3 class="text-center">
      The current block height is:
      <span class="text-decoration-underline"> {state.blockHeight} </span>
    </h3>
    {context.accountId ? blockHeightForm : notLoggedInWarning}
    <p class="text-center py-2">
      You clicked the button {state.buttonClickCount} times.
    </p>
  </div>
);
