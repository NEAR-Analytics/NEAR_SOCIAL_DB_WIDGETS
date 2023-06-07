// {
//   "groups": [
//     {
//       "title": "Councile of Advisors",
//       "src": "https://ipfs.near.social/ipfs/bafkreie4rfa63zedwnpbwm5lglqrwqhahcnf6slllqmq7sh46ngf5y4vsq",
//       "leftVotes": 0,
//       "maxVotes": 10,
//       "submitted": true
//     },
//     {
//       "title": "House of Merit",
//       "src": "https://ipfs.near.social/ipfs/bafkreie4rfa63zedwnpbwm5lglqrwqhahcnf6slllqmq7sh46ngf5y4vsq",
//       "leftVotes": 5,
//       "maxVotes": 10,
//       "submitted": false
//     },
//     {
//       "title": "Transparancy Commision",
//       "src": "https://ipfs.near.social/ipfs/bafkreie4rfa63zedwnpbwm5lglqrwqhahcnf6slllqmq7sh46ngf5y4vsq",
//       "leftVotes": 10,
//       "maxVotes": 10,
//       "submitted": true
//     }
//   ]
// }

const profileImg =
  "https://ipfs.near.social/ipfs/bafkreie4rfa63zedwnpbwm5lglqrwqhahcnf6slllqmq7sh46ngf5y4vsq";

const Small = styled.small`
  font-weight: 400;
`;

const H6 = styled.h6`
  margin-bottom: 0;
  font-weight: 600;
`;

const Img = styled.img`
  border-radius: 50%;
  border: 1px solid black;
  background-size: cover;
  background-repeat: no-repeat;
  margin-right: 20px;
  width: 40px;
  height: 40px;
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
`;

const GroupItem = ({ item }) => (
  <ItemContainer className="d-flex p-3 px-4 bg-light align-items-center rounded mb-3">
    <div className="position-relative">
      {!item.submitted && <WarningCircle />}
      <Img src={item.src} />
    </div>
    <div>
      <h6>{item.title}</h6>
      <Small>
        {item.leftVotes} / {item.maxVotes} votes left
      </Small>
    </div>
  </ItemContainer>
);

return (
  <div>
    {props.groups.map((item) => (
      <GroupItem item={item} />
    ))}
    <ItemContainer className="d-flex p-3 px-4 bg-light align-items-center rounded mb-3">
      <Img src={profileImg} />
      <div>
        <h6>My Profile</h6>
      </div>
    </ItemContainer>
  </div>
);
