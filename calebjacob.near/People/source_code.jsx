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

const Person = styled.div`
  display: flex;
  gap: 12px;
`;

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
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

return (
  <>
    <H2>People</H2>

    {accounts.map((account) => (
      <Person key={account.accountId}>
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
            <Text bold>{account.profile.name}</Text>

            <Text small>
              Joined{" "}
              <Widget
                src="mob.near/widget/TimeAgo"
                props={{ blockHeight: account.blockHeight }}
              />{" "}
              ago
            </Text>
          </Name>

          <Text>{account.accountId}</Text>
        </div>
      </Person>
    ))}

    <div>Total {totalAccounts} profiles</div>
  </>
);
