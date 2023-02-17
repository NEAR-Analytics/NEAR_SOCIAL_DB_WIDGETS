const limit = 5;
let items = [];

const followData = Social.index("graph", "follow", {
  limit,
  order: "desc",
});

const pokeData = Social.index("graph", "poke", {
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

const Wrapper = styled.div`
  display: grid;
  gap: 12px;
`;

const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181C;
  margin: 0 0 12px;
`;

const Item = styled.div`
  display: grid;
  gap: 1px;
`;

const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  gap: 12px;
  align-items: center;
  width: 100%;
  overflow: hidden;

  > * {
    min-width: 0
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 18px;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "")};
  white-space: nowrap;
  flex-shrink: 0;

  .bi-hand-index-thumb {
    display: inline-block;
    transform: rotate(90deg);
    margin-left: 4px;
  }

  .bi-clock {
    margin: 0;
  }
`;

return (
  <Wrapper>
    <H2>Activity</H2>

    {items.map((item, i) => (
      <Item key={i}>
        <ItemRow>
          <Widget
            src="calebjacob.near/widget/AccountProfileInline"
            props={{ accountId: item.accountId }}
          />

          {item.type === "follow" && <Text small>followed</Text>}
          {item.type === "poke" && <Text small>poked</Text>}

          <Widget
            src="calebjacob.near/widget/AccountProfileInline"
            props={{ accountId: item.value.accountId }}
          />
        </ItemRow>

        <ItemRow>
          <Text small>
            <Widget
              src="mob.near/widget/TimeAgo"
              props={{ blockHeight: item.blockHeight }}
            />{" "}
            ago
          </Text>
        </ItemRow>
      </Item>
    ))}
  </Wrapper>
);
