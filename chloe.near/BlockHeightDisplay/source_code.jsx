// Initialize the state
State.init({
  blockHeight: Storage.get("blockHeight") ?? 0,
});

// Function to retrieve block height and store it in state and local storage
const getBlockHeight = async () => {
  try {
    const blockHeight = await Storage.get("blockHeight");
    // Store the block height in the state
    State.update({ blockHeight: blockHeight });
  } catch (error) {
    console.log("Failed to fetch block height:", error);
  }
};

// Fetch block height initially
getBlockHeight();

// Return block height
return (
  <div>
    <span className="text-decoration-underline">{state.blockHeight}</span>
  </div>
);
