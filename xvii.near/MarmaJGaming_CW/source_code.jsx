const Container = styled.div`
  background-color: #000;
  color: #fff;
  padding: 20px;
`;

const Title = styled.h1`
  color: #fff;
  font-weight: 700;
  font-size: 2em;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const Description = styled.p`
  color: #fff;
  font-weight: 300;
  text-align: center;
  margin-bottom: 20px;
`;

return (
  <Container>
    <Title>Marma J Gaming</Title>
    <Description>
      Explore the crypto-based gaming world of Marma J Gaming where you can
      collaborate artistically with friends, gather your pets for a battle,
      outfit your hero to explore dungeons and take part in raids, and gather an
      army to position yourself as the master tactician.
    </Description>
    <Widget src={"shemar268abel.near/widget/PixelParty"} />
    <Widget src={"ihyshan.near/widget/MJG-Widget"} />
    <Widget src={"jay100.near/widget/MJG-Widget"} />
    <Widget src={"quan15.near/widget/MJG-Widget"} />
  </Container>
);
