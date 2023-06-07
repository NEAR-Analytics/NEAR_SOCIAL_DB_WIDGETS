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
  font-weight: 500;
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

const WidgetCard = (props) => {
  const { title, coverSrc, description, actionButtons } = props;

  const handleButtonClick = (url) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

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
    title: "Pixel Party Image",
    url: "https://pd.marmaj.org/pixelparty2.jpg",
  },
  {
    title: "Pixel Pets Image",
    url: "https://pd.marmaj.org/hatch.png",
  },
  {
    title: "Crypto Heroes Image",
    url: "https://github.com/Dark-St-r/mjg-widget-data/assets/93423666/8d7eab5a-f278-43f5-a2da-88a323ce9da9",
  },
  {
    title: "Chain Team Tactics Image",
    url: "https://pd.marmaj.org/ctt/mint2.png",
  },
];

const Mainnet = [
  { title: "Pixel Party", url: "https://pixelparty.marmaj.org/" },
  { title: "Pixel Pets", url: "https://pd.marmaj.org/pixelpets" },
  { title: "Crypto Heroes", url: "https://pd.marmaj.org/cryptoheroes" },
  { title: "Chain Team Tactics", url: "https://pd.marmaj.org/chainteam" },
];

const Testnet = [
  { title: "Pixel Party", url: "https://testnet.pixelparty.marmaj.org/" },
  { title: "Pixel Pets", url: "https://pd-testnet.marmaj.org/pixelpets" },
  { title: "Crypto Heroes", url: "https://pd-testnet.marmaj.org/cryptoheroes" },
  {
    title: "Chain Team Tactics",
    url: "https://pd-testnet.marmaj.org/chainteam",
  },
];

const Wiki = [
  {
    title: "Pixel Party Wiki",
    url: "https://github.com/MarmaJFoundation/pixelparty-wiki/wiki",
  },
  {
    title: "Pixel Pets Wiki",
    url: "https://github.com/MarmaJFoundation/pixelpets-wiki/wiki",
  },
  {
    title: "Crypto Heroes Wiki",
    url: "https://github.com/MarmaJFoundation/cryptoheroes-wiki/wiki",
  },
  {
    title: "Chain Team Tactics Wiki",
    url: "https://github.com/MarmaJFoundation/chainteamtactics-wiki/wiki",
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
      <Cover
        src={WidgetImages[0].url}
        alt={WidgetImages[0].title}
        style={{ width: "100%" }}
      />
      <h1 style={{ marginBottom: "10px", textAlign: "center" }}>
        <a
          href="https://pixelparty.marmaj.org/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          PIXEL PARTY
        </a>
      </h1>
      <p
        style={{ marginBottom: "20px", fontSize: "1.3em", fontWeight: "bold" }}
      >
        NFT FRAME SHOWCASE
      </p>

      <Description
        style={{ marginBottom: "20px", width: "100%", textAlign: "justify" }}
      >
        PixelParty, a groundbreaking and innovative NFT Frame showcase
        meticulously constructed on the NEAR Protocol, embodies the fusion of
        cutting-edge technology and artistic brilliance, boasting a truly
        remarkable total supply of 600 tokens that serve as a testament to its
        exceptional rarity and exclusivity.
      </Description>
      <div style={{ marginBottom: "20px", width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        ></div>
      </div>
      <FakeButton
        href={Mainnet[0].url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {" "}
        Play{" "}
      </FakeButton>
      <FakeButton
        href={Testnet[0].url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {" "}
        Test{" "}
      </FakeButton>
      <FakeButton href={Wiki[0].url} target="_blank" rel="noopener noreferrer">
        {" "}
        Wiki{" "}
      </FakeButton>
    </Hero>
  </div>
);
