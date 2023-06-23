const Header = styled.div`
    background: linear-gradient(90deg, #9333EA 0%, #4F46E5 100%);
`;

const PrimaryButton = styled.button`
  padding: 8px 20px;
  background: #FFD50D;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  border: 0;
`;

const handleAddKudo = () => {};

return (
  <Header className="d-flex p-3 px-4 align-items-center justify-content-between">
    <Widget
      src="mob.near/widget/Image"
      props={{
        image: {
          url: "https://bafkreicrlj3lgygabo37j6gelyamwvm5qj4vtd3sid62dlbr7s6wi3qjhm.ipfs.nftstorage.link/",
        },
        alt: "kudos",
        style: {
          height: "30px",
          objectFit: "cover",
        },
        fallbackUrl:
          "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
      }}
    />
    <Widget
      src="rubycop.near/widget/NDC.StyledComponents"
      props={{
        Button: {
          text: "Give a Kudo",
          icon: (
            <Widget
              src="mob.near/widget/Image"
              props={{
                image: {
                  url: "https://bafkreieynbjyuycbo7naqp5dtiajcsmpiwyt7n2mk35746463nkcjte2yy.ipfs.nftstorage.link/",
                },
                alt: "kudos",
                style: {
                  height: "20px",
                  objectFit: "cover",
                  margin: "0 0 3px 5px",
                },
                fallbackUrl:
                  "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
              }}
            />
          ),
          onClick: handleAddKudo,
        },
      }}
    />
  </Header>
);
