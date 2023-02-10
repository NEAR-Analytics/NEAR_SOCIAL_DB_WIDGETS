const accountData = Social.keys("*/profile", "final", {
  return_type: "BlockHeight",
});

const limit = 8;
const totalAccounts = Object.keys(accountData || {}).length;

let accounts = Object.entries(accountData || {})
  .slice(totalAccounts - limit, totalAccounts)
  .map((entry) => {
    return {
      accountId: entry[0],
      blockHeight: entry[1].profile,
      profile: {},
    };
  });

accounts.reverse();

const keys = accounts.map((account) => `${account.accountId}/profile/**`);
const profileData = Social.get(keys, "final");

if (profileData) {
  accounts = accounts.map((account) => {
    return {
      ...account,
      profile: profileData[account.accountId].profile,
    };
  });
}

console.log(accounts);

const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181C;
  margin: 0 0 25px;
`;

const Person = styled.a`
  display: grid;
  gap: 12px;
  grid-template-columns: auto 1fr;
  text-decoration: none !important;
  cursor: pointer;
  margin-bottom: 24px;

  > * {
    min-width: 0;
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "unset")};
  white-space: nowrap;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;

  img {
    object-fit: cover;
    border-radius: 40px;
    width: 100%;
    height: 100%;
  }
`;

const Name = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonLink = styled.a`
  display: block;
  width: 100%;
  padding: 8px;
  height: 32px;
  background: #FBFCFD;
  border: 1px solid #D7DBDF;
  border-radius: 6px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: #11181C !important;

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
  <>
    <H2>People</H2>

    {accounts.map((account) => (
      <Person
        key={account.accountId}
        href={`/#/mob.near/widget/ProfilePage?accountId=${account.accountId}`}
      >
        <Avatar>
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: account.profile.image,
              alt: account.profile.name,
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
            }}
          />
        </Avatar>

        <div>
          <Name>
            <Text ellipsis bold>
              {account.profile.name}
            </Text>

            <Text small>
              Joined{" "}
              <Widget
                src="mob.near/widget/TimeAgo"
                props={{ blockHeight: account.blockHeight }}
              />{" "}
              ago
            </Text>
          </Name>

          <Text ellipsis>{account.accountId}</Text>
        </div>
      </Person>
    ))}

    <ButtonLink href="/#/mob.near/widget/People">
      View All <span>({totalAccounts})</span>
    </ButtonLink>
  </>
);
