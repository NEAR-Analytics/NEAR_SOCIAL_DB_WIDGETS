const [accountId, widget, widgetName] = props.src.split("/");
const metadata = Social.get(
  `${accountId}/widget/${widgetName}/metadata/**`,
  "final"
);

const Wrapper = styled.a`
  display: grid;
  align-items: center;
  gap: 12px;
  grid-template-columns: auto 1fr;
  cursor: pointer;
  margin: 0;
  color: #687076 !important;
  outline: none;
  text-decoration: none !important;

  > * {
    min-width: 0;
  }

  &:hover,
  &:focus {
      div:first-child {
          border-color: #D0D5DD;
      }
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

const Thumbnail = styled.div`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border: 1px solid #ECEEF0;
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 200ms;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

return (
  <Wrapper href={`/#/calebjacob.near/widget/AppDetailsPage?src=${props.src}`}>
    <Thumbnail>
      <Widget
        src="mob.near/widget/Image"
        props={{
          image: metadata.image,
          fallbackUrl:
            "https://ipfs.near.social/ipfs/bafkreido7gsk4dlb63z3s5yirkkgrjs2nmyar5bxyet66chakt2h5jve6e",
          alt: metadata.name,
        }}
      />
    </Thumbnail>

    <div>
      <Text ellipsis bold>
        {metadata.name || widgetName}
      </Text>

      <Text ellipsis>{props.src}</Text>
    </div>
  </Wrapper>
);
