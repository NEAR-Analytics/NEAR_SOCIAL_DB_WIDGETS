const Title = styled.h5`
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  text-transform: uppercase;
`;

const Cover = styled.img`
  border-radius: 5px;
  width: 150px;
  height: 150px;
  object-fit: cover;
`;

const Description = styled.p`
  color: #fff;
  font-weight: 300;
`;

const FakeButton = styled.a`
  border-radius: 5px;
  width: auto;
  text-transform: uppercase;
  padding: 8px 14px;
  background: rgba(155, 155, 155, 0.2);
  color: #fff;
  cursor: pointer;
  border: 1px solid #000;
  outline: 0;
  font-weight: 600;
  :hover {
    opacity: 0.8;
    text-decoration: none;
    color: #fff;
  }
`;

const Card = styled.div`
  border-radius: 8px;
  color: #0c0c0c;
  background: #000;
  align-items: center;
  justify-content: center;
  max-width: 210px;
  padding: 25px 32px;
  display: flex;
  flex-direction: column;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  text-align: center;
  justify-content: center;
  padding: 15px;
  background-color: #0c0c1f;
  color: #fff;
`;

const CardList = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: repeat(200px, 1fr);
  gap: 0.5rem;
`;

const WidgetCard = ({ title, coverSrc, description, actionButtons }) => {
  return (
    <Card>
      <Title>{title}</Title>
      <Cover src={coverSrc} alt={title} />
      <Description>{description}</Description>
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-evenly",
        }}
      >
        {actionButtons.map((button, index) => (
          <FakeButton
            key={index}
            onClick={() => handleButtonClick(button.url)}
            href={button.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {button.label}
          </FakeButton>
        ))}
      </div>
    </Card>
  );
};

const WidgetImages = [
  {
    title: "Pixel Pets Image",
    url: "https://pd.marmaj.org/hatch.png",
  },
];

const Mainnet = [
  { title: "{PixelPets}", url: "https://pd.marmaj.org/pixelpets" },
];

const Testnet = [
  {
    title: "PixelPets",
    url: "https://pd-testnet.marmaj.org/pixelpets/testnet.html",
  },
];

const Wiki = [
  {
    title: "PixelPets Wiki",
    url: "https://github.com/MarmaJFoundation/pixelpets-wiki/wiki",
  },
];

const NFT = [
  {
    title: "PixelPets NFT",
    url: "https://www.mintbase.xyz/meta/mjr.mintbase1.near%3A0e1888dca342ee552547f8ef39ad8785",
  },
];
return (
  <div
    style={{
      display: "flex",
      flexFlow: "column",
      alignItems: "space-evenly",
      backgroundColor: "#0e0e1e",
      padding: "20px",
    }}
  >
    <Hero>
      <a
        href={Mainnet.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: "none",
          color: "inherit",
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        <img src={`null`} />
      </a>

      <p
        style={{ marginBottom: "20px", fontSize: "1.3em", fontWeight: "bold" }}
      >
        PixelPets
      </p>
      <p style={{ marginBottom: "20px", width: "100%", textAlign: "justify" }}>
        PixelPets is an NFT game for pet trading and battling. Each token
        represents one of a total of 60 different pet types. Each pet has a
        certain rarity type (common, rare, epic or legendary) which affects
        their strength beneath other stats like quality and level. It combines
        collect to earn/compete to earn concept via the built-in pet marketplace
        and by a few days lasting tournaments with a prizepool for the best
        players running each week.
      </p>
      <div style={{ marginBottom: "20px", width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        ></div>
      </div>
    </Hero>
    <CardList>
      {Mainnet.map((widget, index) => (
        <WidgetCard
          key={index}
          coverSrc={WidgetImages[index].url}
          description=""
          actionButtons={[
            { label: "Play", url: widget.url },
            { label: "Test", url: Testnet[index].url },
            { label: "Wiki", url: Wiki[index].url },
            { label: "NFT", url: NFT[index].url },
          ]}
        />
      ))}
    </CardList>
  </div>
);
