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
    color: #fff
  }
`;

const Card = styled.div`
  border-radius: 8px;
  color: #0c0c0c;
  background: #000;
  align-items: center;
  justify-content: center;
  max-width: 210px;
  margin: 10px auto;
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
  grid-template-columns: auto auto auto;
  gap: 20px;
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
      <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
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

const handlePlayButtonClick = (url) => {
  if (url) {
    window.open(url, "_blank");
  }
};

return (
  <div
    style={{
      display: "flex",
      flexFlow: "row wrap",
      justifyContent: "center",
      backgroundColor: "#0e0e1e",
      padding: "20px",
    }}
  >
    <Hero>
      <h1 style={{ marginBottom: "10px", textAlign: "center" }}>
        <a
          href="https://marmaj.org/gaming/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Marma J Gaming
        </a>
      </h1>
      <p
        style={{ marginBottom: "20px", fontSize: "1.3em", fontWeight: "bold" }}
      >
        EARN TO PLAY GAMES
      </p>
      <p style={{ marginBottom: "20px", width: "100%", textAlign: "justify" }}>
        Explore the crypto-based gaming world of Marma J Gaming where you can
        collaborate artistically with friends, gather your pets for a battle,
        outfit your hero to explore dungeons and take part in raids, and gather
        an army to position yourself as the master tactician.
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
          title={widget.title}
          coverSrc={WidgetImages[index].url}
          description=""
          actionButtons={[
            { label: "Play", url: widget.url },
            { label: "Test", url: Testnet[index].url },
            { label: "Wiki", url: Wiki[index].url },
          ]}
        />
      ))}
    </CardList>
  </div>
);
