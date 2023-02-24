const accountData = Social.keys("*/profile", "final", {
  return_type: "BlockHeight",
});

const limit = 5;
const totalAccounts = Object.keys(accountData || {}).length;

let accounts = Object.entries(accountData || {})
  .slice(totalAccounts - limit, totalAccounts)
  .map((entry) => {
    return {
      accountId: entry[0],
      blockHeight: entry[1].profile,
    };
  });

accounts.reverse();

const Wrapper = styled.div`
  display: grid;
  gap: 24px;
`;

const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181C;
  margin: 0;
`;

const Items = styled.div`
  display: grid;
  gap: 18px;
`;

const Item = styled.div``;

const ButtonLink = styled.a`
  display: block;
  width: 100%;
  padding: 8px;
  height: 32px;
  background: #FBFCFD;
  border: 1px solid #D7DBDF;
  border-radius: 50px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: #11181C !important;
  margin: 0;

  &:hover,
  &:focus {
    background: #ECEDEE;
    text-decoration: none;
    outline: none;
  }

  span {
    color: #687076 !important;
  }
`;

return (
  <Wrapper>
    <H2>People</H2>

    <Items>
      {accounts.map((account) => (
        <Item key={account.accountId}>
          <Widget
            src="calebjacob.near/widget/AccountProfile"
            props={{
              accountId: account.accountId,
              blockHeight: account.blockHeight,
            }}
          />
        </Item>
      ))}
    </Items>

    <ButtonLink href="/#/calebjacob.near/widget/PeoplePage">
      View All People <span>({totalAccounts})</span>
    </ButtonLink>
  </Wrapper>
);
