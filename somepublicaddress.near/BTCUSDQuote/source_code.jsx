const Wrapper = styled.div`
    font-size: 70px;
    font-weight: 600;
    background-image: linear-gradient(to left, #553c9a, #b393d3);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
`;

const bitcoinPriceCall = () => {
  const thisURL = "https://api.coinbase.com/v2/prices/BTC-USD/buy";
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return asyncFetch(thisURL, params);
};

const getBitcoinPrice = () => {
  bitcoinPriceCall().then((resp) => {
    console.log(`resp: ${JSON.stringify(resp)}`);
    State.update({ price: resp.body.data.amount });
  });
};

const showButton = true;

return (
  <Wrapper>
    {state.price}
    {showButton && (
      <button type="button" onClick={getBitcoinPrice}>
        Get BTC USD Quote
      </button>
    )}
  </Wrapper>
);
