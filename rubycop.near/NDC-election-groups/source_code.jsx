const profileImg =
  "https://ipfs.near.social/ipfs/bafkreie4rfa63zedwnpbwm5lglqrwqhahcnf6slllqmq7sh46ngf5y4vsq";

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

const WarningCircle = styled.div`
  position: absolute;
  right: 15px;
  top: -3px;
  border-radius: 50%;
  border: 3px solid rgba(var(--bs-light-rgb), var(--bs-bg-opacity));
  background: red;
  z-index: 100;
  width: 17px;
  height: 17px;
`;

const ItemContainer = styled.div`
  border: 1px solid #e3e3e3;

  &:hover {
    border: 1px solid gray;
    cursor: pointer;
  }
`;

const GroupItem = ({ item }) => (
  <ItemContainer className="d-flex p-3 px-4 bg-light align-items-center rounded mb-3">
    <div className="position-relative">
      {!item.submitted && <WarningCircle />}
      <ImgContainer>
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: { url: item.src },
            alt: item.title,
            style: {
              height: "40px",
              objectFit: "cover",
              maxHeight: "40px",
              borderRadius: "50%",
            },
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
          }}
        />
      </ImgContainer>
    </div>
    <div>
      <h6>{item.title}</h6>
      <Small>
        {item.leftVotes} / {item.maxVotes} votes left
      </Small>
    </div>
  </ItemContainer>
);

const ProfileItem = () => (
  <ItemContainer className="d-flex p-3 px-4 bg-light align-items-center rounded mb-3">
    <ImgContainer>
      <Widget src="mob.near/widget/ProfileImage" />
    </ImgContainer>
    <div>
      <h6>My Profile</h6>
    </div>
  </ItemContainer>
);

return (
  <div className="w-100">
    {props.groups.map((item) => (
      <GroupItem item={item} />
    ))}
    <ProfileItem />
  </div>
);
