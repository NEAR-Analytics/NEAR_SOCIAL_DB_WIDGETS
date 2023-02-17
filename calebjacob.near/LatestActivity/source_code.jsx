const limit = 10;
let items = [];

const followData = Social.index("graph", "follow", {
  subscribe: true,
  limit,
  order: "desc",
});

const pokeData = Social.index("graph", "poke", {
  subscribe: true,
  limit,
  order: "desc",
});

if (pokeData && followData) {
  const data = [];

  pokeData.forEach((poke) => {
    data.push({
      ...poke,
      type: "poke",
    });
  });

  followData.forEach((follow) => {
    data.push({
      ...follow,
      type: "follow",
    });
  });

  data.sort((a, b) => b.blockHeight - a.blockHeight);

  items = data.slice(0, limit);
}

const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181C;
  margin: 0 0 24px;
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 100px;
  gap: 12px;
  align-items: center;
  margin-bottom: 24px;
  width: 300px;
  overflow: hidden;

  > * {
    min-width: 0
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "")};
  white-space: nowrap;
  flex-shrink: 0;
`;

return (
  <>
    <H2>Activity</H2>

    {items.map((item, i) => (
      <Item key={i}>
        <Widget
          src="calebjacob.near/widget/AccountProfileInline"
          props={{ accountId: item.accountId }}
        />

        {item.type === "follow" && <Text>followed</Text>}
        {item.type === "poke" && <Text>poked</Text>}

        <Widget
          src="calebjacob.near/widget/AccountProfileInline"
          props={{ accountId: item.value.accountId }}
        />
      </Item>
    ))}
  </>
);
