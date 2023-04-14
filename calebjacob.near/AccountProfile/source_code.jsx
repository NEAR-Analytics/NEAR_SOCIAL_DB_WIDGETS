const accountId = props.accountId ?? context.accountId;
const profile = Social.get(`${accountId}/profile/**`, "final");

const Wrapper = styled.a`
  display: grid;
  align-items: center;
  gap: 12px;
  grid-template-columns: auto 1fr;
  cursor: pointer;
  margin-bottom: 24px;
  color: #687076 !important;
  outline: none;
  text-decoration: none !important;

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

return (
  <Wrapper href={`/#/mob.near/widget/ProfilePage?accountId=${accountId}`}>
    <Avatar>
      <Widget
        src="mob.near/widget/Image"
        props={{
          image: profile.image,
          alt: profile.name,
          fallbackUrl:
            "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
        }}
      />
    </Avatar>

    <div>
      <Name>
        <Text ellipsis bold>
          {profile.name}
        </Text>

        {props.blockHeight && (
          <Text small>
            Joined{" "}
            <Widget
              src="mob.near/widget/TimeAgo"
              props={{ blockHeight: props.blockHeight }}
            />{" "}
            ago
          </Text>
        )}
      </Name>

      <Text ellipsis>@{accountId}</Text>
    </div>
  </Wrapper>
);
