const Container = styled.div`
    height: 90vh;
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
`;

const TextBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
    font-family: Inter;
`;

const UserAmount = styled.div`
    font-size: 11vw;
    font-weight: 500;
`;

const TextTop = styled.div`
    font-size: 1.5vw;
    font-weight: 300;
    text-align: right;
`;

const TextBottom = styled.div`
    font-size: 3vw;
    font-weight: 400;
`;

const response = fetch(
  `https://api.pikespeak.ai/network/total-account`,

  {
    headers: {
      "x-api-key": "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5",
    },

    subscribe: true,
  }
);

return (
  <Container>
    {response ? (
      <>
        <TextTop>
          made with <a href="pikespeak.ai">pikespeak.ai</a> API
        </TextTop>
        <TextBlock>
          <UserAmount>
            {(1_000_000_000 - parseInt(response.body))
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
          </UserAmount>
          <TextBottom>
            more users till 1B. Lets work on bringing them to web3!
          </TextBottom>
        </TextBlock>{" "}
      </>
    ) : (
      <h1>Loading...</h1>
    )}
  </Container>
);
