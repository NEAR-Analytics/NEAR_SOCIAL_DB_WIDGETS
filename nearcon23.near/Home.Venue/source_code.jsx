const ownerId = "nearcon23.near";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
  padding: 3.5em 3.5em 4.5em;
  gap: 3em;
  background: #f2f1ea;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 33%;
  gap: 2em;
  padding: 0;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  h2 {
    font-family: "FK Grotesk";
    font-style: normal;
    font-weight: 500;
    font-size: 1.625em;
    line-height: 1.5em;
    color: #000000;
  }

  p {
    font-family: "FK Grotesk";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #000000;
  }
`;

const Visual = styled.div`
  width: 33%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2em;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  img {
    width: 100%;
  }

  b {
    font-family: "Mona Sans";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 170%;
    color: #000000;
  }

  p {
    font-family: "Mona Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 170%;
    color: #000000;
  }
`;

const palace = "bafkreia2u26264amx5spk5ftcyyjxv7huxzdljbvuvpyae6rbt6tk5dffu";
const haven = "bafkreiaajatqfh2vm6jidi2kr24ierbzk6ubr76tcx5haptru73aic3baa";
const mapImage = (src) => `https://ipfs.near.social/ipfs/${src}`;

return (
  <Container>
    <Text>
      <h2>Dual Venues</h2>
      <p>
        Two beautiful venues just down the street from each other will offer a
        unique and focused experience.
      </p>
      <b>
        Join the official telegram channel, and drop into the spirit before the
        event.
      </b>
      <Widget
        src={`${ownerId}/widget/Home.TelegramButton`}
        props={{
          href: "https://t.me/nearcon",
          text: "Nearcon Telegram",
        }}
      />
    </Text>
    <Visual>
      <img src={mapImage(palace)} alt="NEARCON Palace" />
      <p>
        <b>Nearcon HQ:</b>
        <br />
        Convento Do Beato
        <br />
        Alameda do Beato 40, 1950-042
        <br />
        Lisboa, Portugal
      </p>
    </Visual>
    <Visual>
      <img src={mapImage(haven)} alt="NEARCON Haven" />
      <p>
        <b>Hacker HQ:</b>
        <br />
        Armazem 16
        <br />
        R. Pereira Henriques {"nº1"}, 1950-242
        <br />
        Lisboa, Portugal
      </p>
    </Visual>
  </Container>
);
