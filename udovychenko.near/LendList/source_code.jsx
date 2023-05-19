const ownerId = "udovychenko.near";
const PEMB_ROCK_CONTRACT_ID = "v1.pembrock.near";
const accountId = props.accountId;

State.init({
  balance: null,
  tokens: null,
  token_price: null,
  token_metadata: [],
});

const getBalance = (tokenId) => {
  return Near.view(
    tokenId,
    "ft_balance_of",
    { account_id: accountId },
    "final",
    false
  );
};

const getTokenPriceList = () => {
  return fetch("https://indexer.ref.finance/list-token-price", {
    method: "GET",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
};

const getTokens = () => {
  return Near.asyncView(
    PEMB_ROCK_CONTRACT_ID,
    "get_tokens",
    { from_index: 0, limit: 100 },
    "final",
    false
  );
};

const getTokenMetadata = (tokenId) => {
  return Near.view(tokenId, "ft_metadata", {}, "final", false);
};

getTokens().then((tokenList) => {
  const tokenMetadata = Object.keys(tokenList).map((tokenId) =>
    getTokenMetadata(tokenId)
  );

  const walletBalance = Object.keys(tokenList).map((tokenId) => {
    return getBalance(tokenId);
  });

  const tokenPriceList = getTokenPriceList();

  State.update({
    balance: walletBalance,
    tokens: tokenList,
    token_price: JSON.parse(tokenPriceList.body),
    token_metadata: tokenMetadata,
  });
});

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 12px;
  margin-bottom: 10px;
  padding: 18px 24px;
  border-radius: 24px;
  font-weight: 600;
  background-color: #161617;
  box-shadow: inset 0 2px 2px #1b1e25;
  color: #eaecef;
`;

const ContainerLeftBlock = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
`;

const NameCoint = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.125em;
`;

const Button = styled.div`
  padding: 6px 14px;
  font-weight: 600;
  font-size: 14px;
  color: #eaecef;
  border: 1px solid #fa6600;
  border-radius: 12px;
  background-color: #fa6600;
  cursor: pointer;
`;

return (
  <>
    {state.token_metadata !== [] ? (
      state.token_metadata.map((token) => {
        return (
          <Container>
            <ContainerLeftBlock>
              <Widget
                src={`${ownerId}/widget/Icon`}
                props={{ size: "32px", image: token.icon }}
              />
              <NameCoint>{token.symbol}</NameCoint>
            </ContainerLeftBlock>

            <Button onClick={() => {}}>Deposit</Button>
          </Container>
        );
      })
    ) : (
      <div>Loading</div>
    )}
  </>
);
