const { selectedItem, handleSelect } = props;

const items = {
  Trending: {
    title: "Trending Kudos",
    src: "https://bafkreidoyevrc2jtisbvh5ii4l4siiflwr7d42vgj52tknwcnpjcjt72sa.ipfs.nftstorage.link",
    srcSelected:
      "https://bafkreieeoqtjoyp64oxwvzu2qtjdxzapbpug5l6kgwfsnb7y43mpjhm52e.ipfs.nftstorage.link",
  },
  My: {
    title: "My Kudos",
    src: "https://bafkreihtxbozr3tpmzyijzvgmnzjhfnvfudu5twxi5e736omfor6rrbcde.ipfs.nftstorage.link",
    srcSelected:
      "https://bafkreibchxu3obfelbn3dhwpucfvc4yqopodp2khlcnzyw2mcr7zpg2mpi.ipfs.nftstorage.link",
  },
};

const Title = styled.h6`
  margin-bottom: 0;
`;

const ImgContainer = styled.div`
  margin-right: 20px;
`;

const ItemContainer = styled.div`
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  border: 1px solid;
  background: ${(props) =>
    props.selected
      ? "linear-gradient(90deg, #9333EA 0%, #4F46E5 100%)"
      : "#FFFFFF"};
  border-color: ${(props) => (props.selected ? "#4F46E5" : "#ffffff")};
  color: ${(props) => (props.selected ? "white" : "inherit")};

  &:hover {
    border: 1px solid #4F46E5;
    background: ${(props) =>
      props.selected
        ? "linear-gradient(90deg, #9333EA 0%, #4F46E5 100%)"
        : "linear-gradient(90deg, rgba(147, 51, 234, 0.08) 0%, rgba(79, 70, 229, 0.08) 100%)"};
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
  }
`;

const GroupItem = ({ itemType }) => (
  <ItemContainer
    role="button"
    className="d-flex w-100 p-3 px-4 align-items-center justify-content-between mb-2"
    onClick={() => handleSelect(itemType)}
    selected={selectedItem === itemType}
  >
    <div className="d-flex align-items-center">
      <ImgContainer>
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: {
              url:
                selectedItem === itemType
                  ? items[itemType].srcSelected
                  : items[itemType].src,
            },
            style: {
              height: "24px",
            },
            alt: items[itemType].title,
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
          }}
        />
      </ImgContainer>
      <Title>{items[itemType].title}</Title>
    </div>
  </ItemContainer>
);

return (
  <>
    <div className="d-sm-block d-flex gap-3 justify-content-between">
      <GroupItem itemType={"Trending"} />
      <GroupItem itemType={"My"} />
    </div>
  </>
);
