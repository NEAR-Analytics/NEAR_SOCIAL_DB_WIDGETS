const accountId = props.accountId ?? context.accountId;
const NFT_CONTRACT = "v0.humanft.near";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: #08cc86;
  min-height: 100vh;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;

  h1 {
    font-size: 42px;
    font-weight: 500;
    margin-bottom: 24px;
  }
  p {
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 24px;
  }

  * {
    font-family: monospace !important;
  }
`;

const NFTContainer = styled.div`
  width: 360px;
  height: 360px;
  background: #03080a;
  perspective: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 50px;
  border: 2px solid #08cc86;

  img {
    height: 100%;
    width: auto;
    max-width: 100%;
    object-fit: contain;
  }
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  background-color: black;
`;
const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  opacity: 0.1;
  background-image: url(https://media.discordapp.net/attachments/1054482850524704849/1107596064191688725/Achraf_Semi-abstract_digital_art_for_an_NFT_badge_representing__7ad8e9c9-58f0-4c0c-9cf2-44646c5cd3aa.png?width=1372&height=1372);
  background-repeat: no-repeat;
  background-position: top center;
`;

return (
  <>
    <Background />
    <BackgroundImage />
    <Wrapper>
      <div class="row g-5 mb-4">
        <div class="col-lg-7 order-lg-1 order-2 d-flex flex-column justify-content-center">
          <h1>
            Invite your friends! <br />
            Earn NFTs! <br />
            Get on the leaderboard!
          </h1>
          <p>
            Invite your friends to complete I-AM-HUMAN verification and earn
            free NFTs for each friend that completes the process.
          </p>
        </div>
        <div class="col-lg-5 d-flex align-items-center justify-content-center order-lg-2 order-1">
          <NFTContainer>
            <img
              src={
                "https://media.discordapp.net/attachments/1054482850524704849/1107286845743706232/Achraf_Semi-abstract_digital_art_for_an_NFT_badge_representing__2f40206e-ba52-42a0-bb44-06e81dc9def3.png?width=1372&height=1372"
              }
              alt="Human referral NFT"
            />
          </NFTContainer>
        </div>
      </div>
      <div className="w-100 flex-wrap d-flex justify-content-center gap-3">
        <div className="w-100 mb-3">
          <Widget src="sking.near/widget/IAH.Common.InviteBox" />
        </div>
        <Widget
          src="sking.near/widget/IAH.Common.LeaderBoard"
          props={{
            accountId: accountId,
            NFT_CONTRACT: NFT_CONTRACT,
          }}
        />
        <Widget
          src="sking.near/widget/IAH.Common.ReferBox"
          props={{
            accountId: accountId,
            NFT_CONTRACT: NFT_CONTRACT,
          }}
        />
      </div>
    </Wrapper>
  </>
);
