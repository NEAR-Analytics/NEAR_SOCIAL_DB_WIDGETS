const logoUrl = "";

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
        image: { url: logoUrl },
        alt: "kudos",
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
    <Widget
      src="rubycop.near/widget/NDC.StyledComponents"
      props={{
        PrimaryButton: {
          text: "Give a Kudo",
          icon: <i className="bi bi-plus" />,
          onClick: handleAddKudo,
        },
      }}
    />
  </Header>
);
