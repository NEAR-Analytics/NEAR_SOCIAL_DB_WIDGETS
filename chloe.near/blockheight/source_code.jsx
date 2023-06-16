const StyledFetchButton = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};
  border: 2px solid palevioletred;
  border-radius: 10px;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  cursor: pointer;
  :hover {
    opacity: 0.8;
    background: pink;
  }
`;

const fetchDataAndUpdateState = () => {
  asyncFetch("https://rpc.mainnet.near.org/status").then((res) => {
    const data = res.body;
    if (res.ok) {
      State.update({
        blockHeight: data.sync_info.latest_block_height,
        data: data,
      });
    } else {
      console.error("Error fetching data: ", data.error);
    }
  });
};

return (
  <div>
    <StyledFetchButton onClick={fetchDataAndUpdateState}>
      Fetch Data
    </StyledFetchButton>
    <p>Block Height: {state.blockHeight}</p>
  </div>
);
