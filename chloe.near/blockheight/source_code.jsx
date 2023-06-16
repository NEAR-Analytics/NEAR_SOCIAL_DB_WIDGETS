// Initialize the state
State.init({
  blockHeight: 0,
});

// Function to retrieve block height and store it in state
const getBlockHeight = () => {
  try {
    const blockData = Near.block("final");
    const blockHeight = blockData.chunks[0].height_included;
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
    <span class="text-decoration-underline">{state.blockHeight}</span>
  </div>
);
