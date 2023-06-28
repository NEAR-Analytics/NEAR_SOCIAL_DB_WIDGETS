const title = props.title ?? "Title of Card";
const subtitle = props.subtitle ?? "subtitle of card";
const imgSrc = props.imgSrc;
const link = props.link ?? "https://neardc.org";

const Small = styled.small`
  font-weight: 400;
`;

const H6 = styled.h6`
  margin-bottom: 0;
  font-weight: 600;
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

const GroupItem = ({}) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <ItemContainer
      role="button"
      className="d-flex p-3 px-4 align-items-center mb-3 justify-content-between"
    >
      <div className="d-flex align-items-center">
        <ImgContainer>
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: { imageSrc },
              alt: {},
              style: {
                height: "40px",
                objectFit: "cover",
                maxHeight: "40px",
                borderRadius: "50%",
              },
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreihc2obisowsndbttytkwc2sdzq4m7viljnq3tpl63zqfcvgdn2ovy",
            }}
          />
        </ImgContainer>
        <div>
          <h6>{title}</h6>
          <Small>{subtitle}</Small>
        </div>
      </div>
    </ItemContainer>
  </a>
);

return (
  <div>
    <GroupItem />
  </div>
);
