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
    title: "Chain Team Tactics Image",
    url: "https://pd.marmaj.org/ctt/mint2.png",
  },
];

const Mainnet = [
  { title: "Chain Team Tactics", url: "https://pd.marmaj.org/chainteam" },
];

const Testnet = [
  {
    title: "Chain Team Tactics",
    url: "https://pd-testnet.marmaj.org/chainteam",
  },
];

const Wiki = [
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
        <img
          src={`https://user-images.githubusercontent.com/100770363/241338189-eb7cd1db-00a7-4dd3-ab44-d1ab6f24c2e8.png`}
        />
      </a>

      <p
        style={{ marginBottom: "20px", fontSize: "1.3em", fontWeight: "bold" }}
      >
        Chain Team Tactics
      </p>
      <p style={{ marginBottom: "20px", width: "100%", textAlign: "justify" }}>
        Chain Team Tactics is an nft based pvp battle simulator. Collect a
        minimum of 6 units and start to battle other players! Each battle is
        fought as best of three and the starting player changes each round. To
        make it more spicy, you will battle about your PXT stake (after beta).
        Still don't understand? Take a game like Fire Emblem or Final Fantasy
        Tactics, slap it onto the blockchain, and you're left with this amazing
        game called Chain Team Tactics
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
          ]}
        />
      ))}
    </CardList>
  </div>
);
