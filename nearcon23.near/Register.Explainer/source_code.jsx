const ownerId = "nearcon23.near";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 3em;

  .red {
    color: #ff7966;
  }

  h2 {
    font-family: "FK Grotesk";
    font-style: normal;
    font-weight: 500;
    font-size: 2em;
    line-height: 1.5em;
    color: #000000;
  }

  ol {
    font-family: "Mona Sans";
    font-style: normal;
    font-weight: 600;
    font-size: 1em;
    line-height: 170%;
    color: #000000;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.5em;
    list-style-position: outside;
    padding-left: 1.25em;
  }

  & > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2em;
    gap: 1em;
    background: #f3f3f2;
    border-radius: 8px;

    & > span {
      font-family: "Mona Sans";
      font-style: normal;
      font-weight: 600;
      font-size: 1em;
      line-height: 150%;
      color: #a1a09a;
    }

    & > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 2em;
      width: 100%;
    }
  }
`;

const mapImage = (src) => `https://ipfs.near.social/ipfs/${src}`;

return (
  <Container>
    <h2>How it works</h2>
    <ol>
      <li>
        Complete the form <span className="red">(All fields required)</span>
      </li>
      <li>
        You will be redirected to complete payment (via crypto or fiat currency)
      </li>
      <li>You will receive your NFT ticket via your wallet</li>
    </ol>
    <div>
      <span>Ticketing fulfillment by</span>
      <div>
        <a href="#">
          <Widget src={`${ownerId}/widget/Register.KeypomLogo`} />
        </a>
        <a href="#">
          <Widget src={`${ownerId}/widget/Register.MintbaseLogo`} />
        </a>
      </div>
    </div>
  </Container>
);
