const Wrapper = styled.div`
margin: 48px 12px;
color: #08cc86;
font-family: monospace;

.row {
    padding: 36px;
    border-radius: 20px;
    background: #03080a;
    border: 2px solid #08cc86;
  }
  h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 28px;
  }
`;

return (
  <Wrapper>
    <h2>How to Refer your Friends</h2>
    <div className="row">
      <div className="col-xs-12 col-sm-6 col-md-4">
        <h3>Step 1</h3>
        <p>Share your referral link with your friends.</p>
      </div>
      <div className="col-xs-12 col-sm-6 col-md-4">
        <h3>Step 2</h3>
        <p>Invite your friends to complete I-Am-Human signup.</p>
      </div>
      <div className="col-xs-12 col-sm-6 col-md-4">
        <h3>Step 3</h3>
        <p>
          Your friend will receive <b>1 human NFT</b> and you will receive 1
          <b>referral NFT</b>.
        </p>
      </div>
    </div>
  </Wrapper>
);
