const { referrerId, tokens, NFT_CONTRACT, accountId, GD_CONTRACT } = props;

const isVerified = tokens.some((token) => token[0] === GD_CONTRACT);
console.log(tokens, isVerified);
const onClaim = () => {
  // Call NFT contract to mint the badge for the user and his referrer
  Near.call(
    NFT_CONTRACT,
    "nft_mint",
    {
      receiver_id: accountId,
      referrer_id: referrerId,
    },
    undefined,
    "10000000000000000000000" // 0.01 NEAR
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: #08cc86;
  font-family: monospace;

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
`;

const Button = styled.a`
  display: block;
  padding: 12px 36px;
  border-radius: 20px;
  background: none;
  border: 2px solid #08cc86;
  color: #08cc86;
  font-size: 14px;
  font-weight: 500;
  transition: 0.2s ease;
  cursor: pointer;
  text-align: center;
  margin-right: auto;

  &:hover {
    text-decoration: none;
    background: #08cc86;
    color: #03080a;
    transform: translateY(-2px);
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
  background-image: url(https://media.discordapp.net/attachments/1054482850524704849/1107584142008385566/Achraf_green_fingerprint_circle_black_background_275af2c9-f0b6-49b3-bf3b-67b402612df6.png?width=1372&height=1372);
  background-repeat: no-repeat;
  background-position: top center;
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
  border-radius: 100px;
  border: 2px solid #08cc86;

  img {
    height: 100%;
    width: auto;
    max-width: 100%;
    object-fit: contain;
    animation: rotate 15s ease infinite;
    transform-style: preserve-3d;
    @keyframes rotate {
      0% {
        transform: rotateY(0deg) rotateX(0deg) scale(0.9);
        opacity: 0.8;
      }
      20% {
        transform: rotateY(10deg) rotateX(10deg) scale(1);
        opacity: 0.9;
      }
      40% {
        transform: rotateY(-5deg) rotateX(-20deg) scale(0.9);
        opacity: 0.8;
      }
      60% {
        transform: rotateY(15deg) rotateX(-15deg) scale(1.1);
        opacity: 1;
      }
      80% {
        transform: rotateY(-15deg) rotateX(15deg) scale(1);
        opacity: 0.9;
      }
      100% {
        transform: rotateY(5deg) rotateX(-10deg) scale(0.9);
        opacity: 0.8;
      }
    }
  }
`;

return (
  <>
    <Background />
    <BackgroundImage />
    <Wrapper>
      <NFTContainer>
        <img
          src="https://media.discordapp.net/attachments/1054482850524704849/1107288672904163388/Achraf_Semi-abstract_digital_art_for_an_NFT_badge_representing__4303ca07-6941-49d8-8a7c-3b50da440453.png?width=1372&height=1372"
          width="360px"
          height="360px"
        />
      </NFTContainer>
      <h1 className="text-center">You have been invited!</h1>
      <p className="text-center">
        You have been invited by <b>{referrerId}</b> to join the I Am Human
        community on NEAR and claim your free human NFT.
      </p>
      <div>
        {!isVerified && (
          <Button
            href="https://i-am-human.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Verify Now
          </Button>
        )}
        {isVerified && <Button href="#how-to-verify">Claim NFT</Button>}
      </div>

      <Widget src="sking.near/widget/IAH.Common.WhatIs" />
      <Widget
        src="sking.near/widget/IAH.Common.HowToVerify"
        props={{
          isVerified,
          onClaim,
        }}
      />
    </Wrapper>
  </>
);
