const Banner = styled.div`
    width: 100%;
    height: 200px;
    margin-bottom: 100px;
`;

const Logo = styled.img`
  width: 150px;
  position: absolute;
  top: 150px;
  left: 60px;
  z-index: 1;
  border-radius: 50%;
  background: rgba(68, 152, 224, 0.75);
  border: 3px solid white;
`;

const Lines = styled.div`
    position: absolute;
    top:24px;
    left:0;
    width: 100%;
    height: 200px;
    background: url("https://ipfs.near.social/ipfs/bafkreicplzojcvh2u2qqrfv5uevguxmvq6gccp4b3munmd434saqjilopq");
    background-size: contain;
    background-repeat: no-repeat;
`;

return (
  <Banner role="banner">
    <Logo src="https://ipfs.near.social/ipfs/bafkreibb4m4rszlhf46wgob25lhpuxgfbjpc23swd4qne5e6y7eccinkge" />
    <Lines src="https://ipfs.near.social/ipfs/bafkreicplzojcvh2u2qqrfv5uevguxmvq6gccp4b3munmd434saqjilopq" />
  </Banner>
);
