const ownerId = "nearcon23.near";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
  padding: 3.5em 3.5em 4.5em;
  gap: 3em;
  background: #fff;

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 45%;
  gap: 0.5em;
  padding: 0;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  h2 {
    font-family: "FK Grotesk";
    font-style: normal;
    font-weight: 600;
    font-size: 90px;
    line-height: 41px;
    color: #000000;
  }

  p {
    font-family: "Mona Sans";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 170%;
    color: #000000;
  }
`;

const Visual = styled.div`
  width: 55%;
  border-radius: 20px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  img {
    width: 100%;
  }
`;

const visual = "bafkreid2oloda75diveyrpoepd7u6253mnu4x7nowtnlg7ras2s5lhvlim";
const mapImage = (src) => `https://ipfs.near.social/ipfs/${src}`;

return (
  <Container>
    <Text>
      <h2> </h2>
      <h2>50K</h2>
      <p>NFTs minted</p>
      <h2> </h2>
      <h2> </h2>
      <h2> </h2>
      <h2> </h2>
      <h2> </h2>
      <h2> </h2>
      <h2>25+</h2>
      <p>Countries with active creative communities</p>
      <h2> </h2>
      <h2> </h2>
      <h2> </h2>
      <h2> </h2>
      <h2> </h2>
      <h2> </h2>
      <h2>70+</h2>
      <p>DAOs associated with Creatives Constellation worldwide</p>
      <h2> </h2>
      <h2> </h2>
      <h2> </h2>
      <h2> </h2>
      <h2> </h2>
      <h2> </h2>
      <h2>50%</h2>
      <p>of all NEAR's active DAOs come from Creatives Constellation</p>
    </Text>
    <Visual>
      <img
        src={mapImage(visual)}
        alt="NEARCON Day 3 Layer 1 Stage Evolving NEAR Ecosystem Governence"
      />
    </Visual>
  </Container>
);
